import { v4 as uuidv4 } from 'uuid';
import { getTimestamptz } from "../database";
import { supabaseDatabaseType } from "../table";

export const DatabaseNewsTable = {
  handleCreate: (
    newContent: supabaseDatabaseType.public.tables.news.insert
  ): supabaseDatabaseType.public.tables.news.all => {
    const newRow: supabaseDatabaseType.public.tables.news.all = {
      id: uuidv4(),
      public: false,
      type: "notice",
      excerpt: null,
      content: null,
      image: null,
      authors: null,
      created_at: getTimestamptz(),
      updated_at: getTimestamptz(),
      ...newContent,
    };
    return newRow;
  },
  insert: () => {},
  update: () => {},
  delete: () => {},
  select: () => {},
};
