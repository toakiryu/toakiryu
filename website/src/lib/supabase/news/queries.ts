import { createClient } from "@/src/utils/supabase/client";
import { supabaseDatabaseType } from "@/src/utils/supabase/table";

const supabase = createClient();

export const newsQueries = {
  async getNews<T>({ offset = 0, limit = 10, select = "*", page = 0 }) {
    const query = supabase
      .from("news")
      .select(select, { count: "exact" })
      .order("created_at", { ascending: false });

    const { data, error, count } = await query.range(
      page > 0 ? (page - 1) * limit : offset,
      page > 0 ? page * limit - 1 : offset + limit - 1
    );

    const result = data as T;

    return { data: result, error, count };
  },

  async createNews(newsData: supabaseDatabaseType.public.tables.news.insert) {
    const { data, error } = await supabase
      .from("news")
      .insert([newsData])
      .select()
      .single();
    return { data, error };
  },

  async updateNews(
    id: string,
    updates: supabaseDatabaseType.public.tables.news.update
  ) {
    const { data, error } = await supabase
      .from("news")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    return { data, error };
  },

  async deleteNews(id: string) {
    const { error } = await supabase.from("news").delete().eq("id", id);
    return { error };
  },
};
