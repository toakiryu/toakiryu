import { NextResponse } from "next/server";
import { createClient } from "@/src/utils/supabase/client";
import { getTimestamptz } from "@/src/utils/supabase/database";

export async function GET() {
  const supabase = createClient();
  const reqdate = getTimestamptz();

  const { error } = await supabase
    .from("health")
    .insert({ requested_at: reqdate });
  if (error) {
    console.error(error);
    return NextResponse.json(
      {
        date: reqdate,
        error: error,
      },
      {
        status: 500,
      }
    );
  } else {
    const { error: del_error } = await supabase
      .from("health")
      .delete()
      .lte("requested_at", reqdate);
    if (del_error) {
      console.error(del_error);
      return NextResponse.json(
        {
          date: reqdate,
          error: del_error,
        },
        {
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        {
          date: reqdate,
        },
        {
          status: 200,
        }
      );
    }
  }
}
