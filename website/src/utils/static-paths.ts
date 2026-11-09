type StaticPath = {
  params: Record<string, string | number | undefined>;
  props?: Record<string, unknown>;
};

type Merge<Left, Right> = Omit<Left, keyof Right> & Right;

type MergePath<Left extends StaticPath, Right extends StaticPath> = {
  params: Merge<Left['params'], Right['params']>;
} & (Left extends { props: infer LeftProps }
  ? Right extends { props: infer RightProps }
    ? { props: Merge<LeftProps, RightProps> }
    : { props: LeftProps }
  : Right extends { props: infer RightProps }
    ? { props: RightProps }
    : {});

type MergedPaths<
  Paths extends readonly (readonly StaticPath[])[],
  Result extends StaticPath = { params: {} },
> = Paths extends readonly [
  infer First extends readonly StaticPath[],
  ...infer Rest extends readonly (readonly StaticPath[])[],
]
  ? MergedPaths<Rest, MergePath<Result, First[number]>>
  : Result;

/**
 * 各 static paths の直積を返す getStaticPaths 関数を作成する。
 * params と props の同名キーは、後ろの配列の値で上書きする。
 * 空の配列を含む場合、または引数がない場合は空配列を返す。
 *
 * @example
 * export const getStaticPaths = MergeStaticPaths(
 *   [{ params: { lang: 'ja' } }, { params: { lang: 'en' } }],
 *   [{ params: { latestId: '1' } }],
 * );
 */
export function MergeStaticPaths<
  const Paths extends readonly (readonly StaticPath[])[],
>(...paths: Paths): () => MergedPaths<Paths>[] {
  return () => {
    if (paths.length === 0) return [];

    let result: StaticPath[] = [{ params: {} }];

    for (const group of paths) {
      result = result.flatMap((left) =>
        group.map((right) => ({
          params: { ...left.params, ...right.params },
          ...(left.props !== undefined || right.props !== undefined
            ? { props: { ...left.props, ...right.props } }
            : {}),
        })),
      );
    }

    return result as MergedPaths<Paths>[];
  };
}
