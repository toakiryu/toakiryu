"use server";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/src/utils/supabase/client";
import { getTimestamptz } from "@/src/utils/supabase/database";

const test = [
  {
    id: "8412-45710-418204-5915",
    public: true,
    type: "notice",
    title: "News Title 1",
    description: "news description 2",
    authors: [
      {
        name: "桐生トア",
        url: "https://toakiryu.com",
        image: "https://github.com/toakiryu.png",
      },
    ],
    created_at: "2025-07-08T08:24:32.470Z",
    updated_at: "2025-07-08T08:24:32.470Z",
  },
  {
    id: "8412-45710-9852-5245",
    public: true,
    type: "notice",
    title: "News Title 2",
    description: "news description 2",
    authors: [
      {
        name: "桐生トア",
        url: "https://toakiryu.com",
        image: "https://github.com/toakiryu.png",
      },
    ],
    created_at: "2025-07-09T08:24:32.470Z",
    updated_at: "2025-07-09T08:24:32.470Z",
  },
  {
    id: "8412-45710-9852-1245",
    public: true,
    type: "notice",
    title: "News Title 3",
    description: "news description 3",
    authors: [
      {
        name: "桐生トア",
        url: "https://toakiryu.com",
        image: "https://github.com/toakiryu.png",
      },
    ],
    created_at: "2025-07-09T08:24:32.470Z",
    updated_at: "2025-07-09T08:24:32.470Z",
  },
  {
    id: "1242-45710-9852-1245",
    public: true,
    type: "notice",
    title: "News Title 4",
    description: "news description 4",
    authors: [
      {
        name: "桐生トア",
        url: "https://toakiryu.com",
        image: "https://github.com/toakiryu.png",
      },
    ],
    created_at: "2025-07-09T08:24:32.470Z",
    updated_at: "2025-07-09T08:24:32.470Z",
  },
];

const test_data_full = {
  id: "8412-45710-418204-5915",
  public: true,
  type: "notice",
  title: "News Title 1",
  description: "news description 2",
  content: "# h1\n## h2\n### h3\n#### h4\n##### h5\np\n`highlight`",
  authors: [
    {
      name: "桐生トア",
      url: "https://toakiryu.com",
      image: "https://github.com/toakiryu.png",
    },
  ],
  created_at: "2025-07-08T08:24:32.470Z",
  updated_at: "2025-07-08T08:24:32.470Z",
};

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const searchParams = req.nextUrl.searchParams;
  const select =
    searchParams.get("req.select") ||
    "id, public, title, description, authors, created_at, updated_at";
  const id = searchParams.get("id");
  if (id) {
    return NextResponse.json(test_data_full, {
      status: 200,
    });
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          error: error,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(data, {
      status: 200,
    });
  } else {
    const { data, error } = await supabase.from("news").select(select);
    console.log("GET /api/news | data:",data, "error:", error)

    if (error) {
      return NextResponse.json(
        {
          error: error,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(test, {
      status: 200,
    });
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  const { error } = await supabase
    .from("news")
    .update({
      ...req.body,
      updated_at: getTimestamptz(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
}
