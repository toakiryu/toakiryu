import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";

// 基本的なSupabaseクライアント（認証なし用途）
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const useSupabaseWithRBAC = () => {
  const { getToken } = useAuth();

  const getSupabaseClient = async () => {
    const token = await getToken();

    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      }
    );
  };

  return { getSupabaseClient };
};
