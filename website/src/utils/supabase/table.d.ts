export type Uuid = `${string}-${string}-${string}-${string}`;

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

export namespace supabaseDatabaseType {
  export namespace public {
    export namespace tables {
      export namespace health {
        export type all = {
          id: Uuid;
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
            id: Uuid;
            created_at: string;
            requested_at: string;
          };
        }
      }
      export namespace news {
        export type all = {
          /**
           * @required
           */
          id: Uuid; // 自動生成
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
          description: string | null; // 推奨
          /**
           * @default null
           */
          image: string | null; // メイン画像
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
           * ```json
           * {
           *    "admin": {
           *        "name": "Admin",
           *        "url": "https://example.com"
           *    }
           * }
           * ```
           */
          authors: Json | null; // 推奨
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
          public?: boolean;
          type?: newsType;
          title: string;
          description?: string | null;
          image?: string | null;
          content?: string | null;
          authors?: Json | null;
          updated_at: string;
        };
        export type update = {
          public?: boolean;
          type?: newsType;
          title?: string;
          description?: string | null;
          image?: string | null;
          content?: string | null;
          authors?: Json | null;
          updated_at?: string;
        };
        export namespace req {
          export type def = {
            id: Uuid;
            public: boolean;
            type: newsType;
            title: string;
            description: string | null;
            image: string | null;
            content: string | null;
            authors: Json | null;
            created_at: string;
            updated_at: string;
          };
          export type iptdacu = {
            id: Uuid;
            public: boolean;
            type: newsType;
            title: string;
            description: string | null;
            image: string | null;
            authors: Json | null;
            created_at: string;
            updated_at: string;
          };
        }
      }
      export namespace projects {
        export type all = {
          id: Uuid;
          public: boolean;
          title: string;
          description: string;
          image: string | null;
          avatar: string | null;
          content: string | null;
          created_at: string;
          updated_at: string;
        };
        export type insert = {
          public: boolean;
          title: string;
          description: string;
          image?: string | null;
          avatar?: string | null;
          content?: string | null;
          created_at: string;
          updated_at: string;
        };
        export type update = {
          public?: boolean;
          title?: string;
          description?: string;
          image?: string | null;
          avatar?: string | null;
          content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        export namespace req {
          export type def = {
            id: Uuid;
            public: boolean;
            title: string;
            description: string;
            image: string | null;
            avatar: string | null;
            content: string | null;
            created_at: string;
            updated_at: string;
          };
        }
      }
    }
  }
}
