"use server";

import { supabaseDatabaseType } from "@/src/utils/supabase/table";
import { createSupabaseServerClientWithRBAC } from "../client/rbac/server";

export const SupabaseActionTableNewsQueries_get = async <T>({
  offset = 0,
  limit = 10,
  select = "*",
  page = 0,
}) => {
  const supabase = await createSupabaseServerClientWithRBAC();
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
};

export const SupabaseActionTableNewsQueries_insert = async (
  newsData: supabaseDatabaseType.public.tables.news.insert
) => {
  const supabase = await createSupabaseServerClientWithRBAC();
  const { error } = await supabase.from("news").insert([newsData]);
  return {error };
};

export const SupabaseActionTableNewsQueries_update = async (
  id: string,
  updates: supabaseDatabaseType.public.tables.news.update
) => {
  const supabase = await createSupabaseServerClientWithRBAC();
  const { data, error } = await supabase
    .from("news")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const SupabaseActionTableNewsQueries_delete = async (id: string) => {
  const supabase = await createSupabaseServerClientWithRBAC();
  const { error } = await supabase.from("news").delete().eq("id", id);
  return { error };
};
