import { v4 as uuidv4 } from "uuid";
import { getTimestamptz } from "../database";
import { supabaseDatabaseType } from "../table";

export const DatabaseNewsTable = {
  handleCreate: (
    newContent: supabaseDatabaseType.public.tables.news.insert
  ): supabaseDatabaseType.public.tables.news.all => {
    const times = {
      created_at: newContent.created_at
        ? getTimestamptz(newContent.created_at)
        : getTimestamptz(),
      updated_at: newContent.updated_at
        ? getTimestamptz(newContent.updated_at)
        : getTimestamptz(),
    };
    const newRow: supabaseDatabaseType.public.tables.news.all = {
      id: uuidv4(),
      public: false,
      type: "notice",
      excerpt: null,
      content: null,
      image: null,
      authors: null,
      ...newContent,
      ...times,
    };
    return newRow;
  },
  insert: () => {},
  update: (
    pre: supabaseDatabaseType.public.tables.news.req.def,
    updated: supabaseDatabaseType.public.tables.news.update
  ) => {
    const times = {
      created_at: getTimestamptz(updated.created_at),
      updated_at: updated.updated_at
        ? getTimestamptz(updated.updated_at)
        : getTimestamptz(),
    };
    const newRow: supabaseDatabaseType.public.tables.news.all = {
      ...pre,
      ...updated,
      ...times,
    };
    return newRow;
  },
  delete: () => {},
  select: () => {},
};
