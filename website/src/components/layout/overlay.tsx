import CircularText from "@/components/ui/bits/CircularText";
import { mergeDeep } from "@/lib/utils";

const colorClass = "background";

/**
 * ja: PageFullOverlayのプロパティ。
 * en: Properties for PageFullOverlay.
 */
export interface PageFullOverlayProps {
  // 厳格検証モード。true の場合、不整合があれば例外を投げる。
  strictValidation?: boolean;
  // カスタムクラス名
  classNames?: {
    topBar?: string;
    leftBar?: string;
    rightBar?: string;
    cornerDecorations?: string;
    bottomLeftDecoration?: string;
  };
  // レイアウトの設定
  layout?: {
    // ボーダーの設定
    border?: {
      // 指定可能な位置
      put?: Array<"top" | "left" | "right" | "bottom">;
    };
    // コーナー装飾の設定
    cornerDecorations?: {
      // 指定可能な位置
      put?: Array<"top-left" | "top-right" | "bottom-left" | "bottom-right">;
    };
    // アクションボタンの設定
    actionBtn?: {
      // 指定可能な位置
      put?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
      // クリック時の処理
      onClick?: () => void;
    };
  };
}

/**
 * ja: PageFullOverlayのデフォルトプロパティ。
 * en: Default properties for PageFullOverlay.
 */
const defaultProps: PageFullOverlayProps = {
  layout: {
    border: {
      put: ["top", "left", "right"],
    },
    cornerDecorations: {
      put: ["top-left", "top-right"],
    },
    actionBtn: {
      put: "top-left",
      onClick: undefined,
    },
  },
};

function RenderCornerSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip_e62cf581-66d3-474e-96e0-1166c3935b29)">
        <path d="M50 0H0V50C0 13.431 13.431 0 50 0Z" fill="currentColor" />
      </g>
    </svg>
  );
}

/**
 * ja: 指定位置のボーダーをレンダリングします。
 *     - position: ボーダーの位置 (top/left/right/bottom)
 *     - active: 指定位置が有効ならば要素を出力します。
 * en: Render a border at the given position.
 *     - position: position of the border (top/left/right/bottom)
 *     - active: if true, the border element will be rendered.
 * @param position - ボーダーの位置 / border position
 * @param active - 出力するかどうか / whether to render
 * @returns JSX.Element | null
 */
function renderBorder(
  position: "top" | "left" | "right" | "bottom",
  active: boolean
) {
  // アクティブでない場合は何も表示しない
  if (!active) return null;

  // 指定された位置に応じてボーダーをレンダリング
  switch (position) {
    case "top":
      return (
        <div
          className={`bg-${colorClass} fixed top-0 left-0 z-100 w-full h-[2vw] lg:h-[1.5vw]`}
        />
      );
    case "left":
      return (
        <div
          className={`bg-${colorClass} fixed top-0 left-0 z-100 w-[2vw] lg:w-[1.5vw] h-dvh`}
        />
      );
    case "right":
      return (
        <div
          className={`bg-${colorClass} fixed top-0 right-0 z-100 w-[2vw] lg:w-[1.5vw] h-dvh`}
        />
      );
    case "bottom":
      return (
        <div
          className={`bg-${colorClass} fixed bottom-0 left-0 z-100 w-full h-[2vw] lg:h-[1.5vw]`}
        />
      );
  }
}

/**
 * ja: ボーダーのコーナー装飾をレンダリングします。
 *     - この関数は PageFullOverlay 内に実装されており、マージ後のプロパティ
 *       を参照してボーダーとの相対位置を計算します。
 * en: Render corner decorations for borders.
 *     - Implemented inside PageFullOverlay so it can observe merged props/state
 *       and compute placement relative to borders.
 * @param position - コーナーの位置 (top-left / top-right / bottom-left / bottom-right)
 * @param active - 表示するかどうか / whether to render
 * @returns JSX.Element | null
 */
// NOTE: renderBorderCornerDecoration is intentionally implemented inside
// PageFullOverlay so that it can observe merged props/state and compute
// corner placement relative to borders. See implementation below.

/**
 * ja: PageFullOverlayコンポーネント。
 * en: PageFullOverlay component.
 * @param props
 * @returns
 */
export function PageFullOverlay(props?: PageFullOverlayProps) {
  // Merge default props with provided props using shared util
  const _props = mergeDeep(defaultProps, props);

  // --- validation: detect corner enabled but required border side missing ---
  const cornerPut = new Set<
    "top-left" | "top-right" | "bottom-left" | "bottom-right"
  >(
    (_props.layout?.cornerDecorations?.put ?? []) as Array<
      "top-left" | "top-right" | "bottom-left" | "bottom-right"
    >
  );
  const borderPut = new Set<"top" | "left" | "right" | "bottom">(
    (_props.layout?.border?.put ?? []) as Array<
      "top" | "left" | "right" | "bottom"
    >
  );

  const requiredMap: Record<
    "top-left" | "top-right" | "bottom-left" | "bottom-right",
    Array<"top" | "left" | "right" | "bottom">
  > = {
    "top-left": ["top", "left"],
    "top-right": ["top", "right"],
    "bottom-left": ["bottom", "left"],
    "bottom-right": ["bottom", "right"],
  };

  const mismatches: Array<{
    corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    missing: Array<"top" | "left" | "right" | "bottom">;
  }> = [];

  const corners = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ] as const;
  for (const corner of corners) {
    if (!cornerPut.has(corner)) continue;
    const required = requiredMap[corner];
    const missing = required.filter((s) => !borderPut.has(s));
    if (missing.length) mismatches.push({ corner, missing });
  }

  const isProd = process.env.NODE_ENV === "production";
  let correctionsApplied = false;
  const correctedSides = new Set<string>();
  if (mismatches.length > 0) {
    const details = mismatches
      .map((m) => `${m.corner} missing: ${m.missing.join(",")}`)
      .join("; ");
    const msg = `[PageFullOverlay] border/corner mismatch: ${details}`;

    if (_props.strictValidation) {
      throw new Error(msg);
    }

    if (!isProd) {
      // development: warn so developer notices
      // eslint-disable-next-line no-console
      console.warn(msg);
    } else {
      // production: auto-correct by zeroing offsets for missing sides
      correctionsApplied = true;
      for (const m of mismatches) {
        for (const s of m.missing) correctedSides.add(s);
      }
    }
  }

  // Compute corner position classes based on whether borders exist.
  /**
   * ja: コーナー装飾のための CSS クラス文字列を生成します。
   *     - position によりトップ/ボトムと左右のクラスを決定します。
   *     - 必要に応じて auto-correct による補正が反映されます。
   * en: Build the CSS class string for a corner decoration.
   *     - Determines top/bottom and left/right classes based on position.
   *     - Accounts for any auto-corrections applied to missing borders.
   * @param position - corner position key
   * @returns string - CSS classes for the corner element
   */
  function getCornerClass(
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ) {
    const hasTop = _props.layout?.border?.put?.includes("top");
    const hasLeft = _props.layout?.border?.put?.includes("left");
    const hasRight = _props.layout?.border?.put?.includes("right");
    const hasBottom = _props.layout?.border?.put?.includes("bottom");

    const topClass = correctedSides.has("top")
      ? "top-0"
      : hasTop
      ? "top-[2vw] lg:top-[1.5vw]"
      : "top-0";
    const leftClass = correctedSides.has("left")
      ? "left-0"
      : hasLeft
      ? "left-[2vw] lg:left-[1.5vw]"
      : "left-0";
    const rightClass = correctedSides.has("right")
      ? "right-0"
      : hasRight
      ? "right-[2vw] lg:right-[1.5vw]"
      : "right-0";
    const bottomClass = correctedSides.has("bottom")
      ? "bottom-0"
      : hasBottom
      ? "bottom-[2vw] lg:bottom-[1.5vw]"
      : "bottom-0";

    switch (position) {
      case "top-left":
        return `text-${colorClass} fixed ${topClass} ${leftClass} z-100`;
      case "top-right":
        return `text-${colorClass} fixed ${topClass} ${rightClass} z-100 rotate-90`;
      case "bottom-left":
        return `text-${colorClass} fixed ${bottomClass} ${leftClass} z-100 rotate-270`;
      case "bottom-right":
        return `text-${colorClass} fixed ${bottomClass} ${rightClass} z-100 rotate-180`;
    }
  }

  function renderCornerDecoration(
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    active: boolean
  ) {
    if (!active) return null;

    const cls = getCornerClass(position);

    return <RenderCornerSVG className={cls} />;
  }

  // ボーダーコンテンツをレンダリング
  function renderBorderContents() {
    return (
      <>
        {renderBorder(
          "top",
          _props.layout?.border?.put?.includes("top") || false
        )}
        {renderBorder(
          "left",
          _props.layout?.border?.put?.includes("left") || false
        )}
        {renderBorder(
          "right",
          _props.layout?.border?.put?.includes("right") || false
        )}
        {renderBorder(
          "bottom",
          _props.layout?.border?.put?.includes("bottom") || false
        )}
      </>
    );
  }

  // コーナー装飾コンテンツをレンダリング
  function renderBorderCornerDecorationContents() {
    return (
      <>
        {renderCornerDecoration(
          "top-left",
          _props.layout?.cornerDecorations?.put?.includes("top-left") || false
        )}
        {renderCornerDecoration(
          "top-right",
          _props.layout?.cornerDecorations?.put?.includes("top-right") || false
        )}
        {renderCornerDecoration(
          "bottom-left",
          _props.layout?.cornerDecorations?.put?.includes("bottom-left") ||
            false
        )}
        {renderCornerDecoration(
          "bottom-right",
          _props.layout?.cornerDecorations?.put?.includes("bottom-right") ||
            false
        )}
      </>
    );
  }

  // --- action container placement (configurable) ---
  const actionPos = (_props.layout?.actionBtn?.put ?? "top-left") as
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

  const actionClass = (() => {
    const base = `bg-${colorClass} fixed z-100 flex justify-center items-center w-[85px] h-[85px] md:w-[10vw] md:h-[10vw] lg:w-[8vw] lg:h-[8vw] xl:w-[6vw] xl:h-[6vw]`;
    switch (actionPos) {
      case "top-left":
        return `${base} top-0 left-0 rounded-br-[30px]`;
      case "top-right":
        return `${base} top-0 right-0 rounded-bl-[30px]`;
      case "bottom-left":
        return `${base} bottom-0 left-0 rounded-tr-[30px]`;
      case "bottom-right":
        return `${base} bottom-0 right-0 rounded-tl-[30px]`;
    }
  })();

  // Render small corner decorations that accompany the action button so the
  // action feels integrated with surrounding border/corner decorations.
  /**
   * ja: アクションボタンの隣に表示する小さな角装飾をレンダリングします。
   *     - pos に応じて適切な位置と回転を与えた SVG を 2 つ出力します。
   * en: Render two small corner SVG decorations adjacent to the action button.
   *     - Outputs two appropriately positioned/rotated SVGs based on `pos`.
   * @param pos - action button placement (corner)
   * @returns JSX.Element
   */
  function renderActionAdjacents(
    pos: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ) {
    switch (pos) {
      case "top-left":
        return (
          <>
            <RenderCornerSVG
              className={`text-${colorClass} fixed top-[2vw] lg:top-[1.5vw] left-[85px] md:left-[calc(10vw)] lg:left-[calc(8vw)] xl:left-[calc(6vw)] z-100`}
            />
            <RenderCornerSVG
              className={`text-${colorClass} fixed top-[85px] md:top-[10vw] lg:top-[8vw] xl:top-[6vw] left-[2vw] lg:left-[1.5vw] z-100`}
            />
          </>
        );
      case "top-right":
        return (
          <>
            <RenderCornerSVG
              className={`text-${colorClass} fixed top-[2vw] lg:top-[1.5vw] right-[85px] md:right-[calc(10vw)] lg:right-[calc(8vw)] xl:right-[calc(6vw)] z-100 rotate-90`}
            />
            <RenderCornerSVG
              className={`text-${colorClass} fixed top-[85px] md:top-[10vw] lg:top-[8vw] xl:top-[6vw] right-[2vw] lg:right-[1.5vw] z-100 rotate-90`}
            />
          </>
        );
      case "bottom-left":
        return (
          <>
            <RenderCornerSVG
              className={`text-${colorClass} fixed bottom-[2vw] lg:bottom-[1.5vw] left-[85px] md:left-[calc(10vw)] lg:left-[calc(8vw)] xl:left-[calc(6vw)] z-100 rotate-270`}
            />

            <RenderCornerSVG
              className={`text-${colorClass} fixed bottom-[85px] md:bottom-[10vw] lg:bottom-[8vw] xl:bottom-[6vw] left-[2vw] lg:left-[1.5vw] z-100 rotate-270`}
            />
          </>
        );
      case "bottom-right":
        return (
          <>
            <RenderCornerSVG
              className={`text-${colorClass} fixed bottom-[2vw] lg:bottom-[1.5vw] right-[85px] md:right-[calc(10vw)] lg:right-[calc(8vw)] xl:right-[calc(6vw)] z-100 rotate-180`}
            />

            <RenderCornerSVG
              className={`text-${colorClass} fixed bottom-[85px] md:bottom-[10vw] lg:bottom-[8vw] xl:bottom-[6vw] right-[2vw] lg:right-[1.5vw] z-100 rotate-180`}
            />
          </>
        );
    }
  }

  return (
    <div className="absolute">
      {/* Clip paths for corner decorations */}
      <svg>
        <defs>
          <clipPath id="clip_e62cf581-66d3-474e-96e0-1166c3935b29">
            <rect width="50" height="50" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
      {/* Border contents */}
      {renderBorderContents()}
      {/* Corner decorations */}
      {renderBorderCornerDecorationContents()}

      {/* Action button / decorative square — position configurable via layout.actionBtn.put */}
      {/* Adjacent small corner decorations for the action button */}
      {renderActionAdjacents(actionPos)}
      <div className={actionClass}>
        <div className="cursor-target relative w-[70%] h-[70%] flex justify-center items-center">
          <CircularText
            text="TOAKIRYU*WEBSITE*"
            onHover="pause"
            spinDuration={20}
            className="absolute! scale-[30%] md:scale-[35%] lg:scale-[40%] xl:scale-[45%] text-foreground select-none"
            // scale-[30%] md:scale-[35%] lg:scale-[40%] xl:scale-[45%]
          />
        </div>
      </div>
    </div>
  );
}
