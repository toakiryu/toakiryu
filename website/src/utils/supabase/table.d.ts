export type Json =
  | 1
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type newsType =
  | "notice" // お知らせ
  | "event" // イベント
  | "other"; // その他

export type author = {
  name: string;
  url: string;
};
export type authors = author[];

export namespace supabaseDatabaseType {
  export namespace public {
    export namespace tables {
      export namespace health {
        export type all = {
          id: string;
          created_at: string;
          requested_at: string;
        };
        export type insert = {
          requested_at: string;
        };
        export type update = {
          requested_at?: string;
        };
        export namespace req {
          export type def = {
            id: string;
            created_at: string;
            requested_at: string;
          };
        }
      }
      export namespace news {
        /**
         * ニュース記事の型定義
         */
        export namespace types {
          export type id = string;
          export type public = boolean;
          export type type = newsType;
          export type title = string;
          export type excerpt = string | null;
          export type content = string | null;
          export type image = string | null;
          export type authors = authors | null;
          export type created_at = string;
          export type updated_at = string;
        }
        export type all = {
          /**
           * @required
           */
          id: string; // 自動生成
          /**
           * @required
           * @default false
           */
          public: boolean;
          /**
           * タイプ
           * @default notice
           */
          type: newsType;
          /**
           * @required
           */
          title: string; // 必須
          /**
           * @default null
           */
          excerpt: string | null; // 推奨
          /**
           * @default null
           * ```md
           * # News Title
           *
           * example news content.
           * ```
           */
          content: string | null; // 推奨
          /**
           * @default null
           */
          image: string | null; // メイン画像
          /**
           * @default null
           * ```json
           * [
           *    {
           *       "name": "Admin",
           *       "url": "https://example.com"
           *    }
           * ]
           * ```
           */
          authors: authors | null; // 推奨
          /**
           * @required
           */
          created_at: string; // 自動生成
          /**
           * @required
           */
          updated_at: string; // デフォルト：自動生成 / 更新時に最新日時（timestamptz）を渡す。
        };
        export type insert = {
          id?: string;
          public?: boolean;
          type?: newsType;
          title: string;
          excerpt?: string | null;
          content?: string | null;
          image?: string | null;
          authors?: authors | null;
          created_at?: string;
          updated_at?: string;
        };
        export type update = {
          id?: string;
          public?: boolean;
          type?: newsType;
          title?: string;
          excerpt?: string | null;
          content?: string | null;
          image?: string | null;
          authors?: authors | null;
          created_at?: string;
          updated_at: string;
        };
        export namespace req {
          export type def = {
            id: string;
            public: boolean;
            type: newsType;
            title: string;
            excerpt: string | null;
            content: string | null;
            image: string | null;
            authors: authors | null;
            created_at: string;
            updated_at: string;
          };
          export type iptdacu = {
            id: string;
            public: boolean;
            type: newsType;
            title: string;
            excerpt: string | null;
            image: string | null;
            authors: authors | null;
            created_at: string;
            updated_at: string;
          };
        }
      }
    }
  }
}
