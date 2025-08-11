import { supabaseDatabaseType } from "./table";

export const getTimestamptz = (date?: Date | string) => {
  if (date) {
    return new Date(date).toISOString();
  } else {
    return new Date().toISOString();
  }
};

export interface Database {
  public: {
    Tables: {
      health: {
        Row: supabaseDatabaseType.public.tables.health.all;
        Insert: supabaseDatabaseType.public.tables.health.insert;
        Update: supabaseDatabaseType.public.tables.health.update;
      };
      news: {
        Row: supabaseDatabaseType.public.tables.news.all;
        Insert: supabaseDatabaseType.public.tables.news.insert;
        Update: supabaseDatabaseType.public.tables.news.update;
      };
    };
  };
}
