"use client";

import React from "react";
import {
  IconCalendar,
  IconEdit,
  IconEye,
  IconLoader2,
  IconPlus,
  IconSearch,
  IconTag,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import {
  SupabaseActionTableNewsQueries_delete,
  SupabaseActionTableNewsQueries_get,
  SupabaseActionTableNewsQueries_insert,
  SupabaseActionTableNewsQueries_update,
} from "@/src/lib/supabase/news/queries";
import { supabaseDatabaseType } from "@/src/utils/supabase/table";
import { Button } from "@/src/components/ui/shadcn/button";
import { DatabaseNewsTable } from "@/src/utils/supabase/table/news";
import { DashboardNewsCreateDialogContent } from "./dialog/create";
import { useFormatter } from "next-intl";
import { DashboardNewsEditDialogContent } from "./dialog/edit";
import { Badge } from "@/src/components/ui/shadcn/badge";
import { DashboardNewsDeleteDialogContent } from "./dialog/delete";

export default function ClientContent() {
  const format = useFormatter();

  const [news, setNews] = React.useState<
    supabaseDatabaseType.public.tables.news.req.def[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedNews, setSelectedNews] =
    React.useState<supabaseDatabaseType.public.tables.news.req.def | null>(
      null
    );
  const [modalType, setModalType] = React.useState<string | null>(null); // 'create', 'edit', 'delete', 'view'
  const [statusFilter, setStatusFilter] = React.useState("all");

  const itemsPerPage = 10;

  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error, count } = await SupabaseActionTableNewsQueries_get<
        supabaseDatabaseType.public.tables.news.req.def[]
      >({ page: 1 });
      console.log("Fetched news:", data, "Count:", count);
      if (error) {
        console.error("Error fetching news:", error);
      } else {
        setNews(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // 検索・フィルタリング機能
  const filteredNews = React.useMemo(() => {
    return news.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.excerpt &&
          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus =
        statusFilter === "all" || String(item.public) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [news, searchTerm, statusFilter]);

  // ページネーション
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // モーダル管理
  const openModal = (
    type: any,
    newsItem: supabaseDatabaseType.public.tables.news.req.def | null = null
  ) => {
    setModalType(type);
    setSelectedNews(newsItem);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedNews(null);
  };

  // CRUD操作
  const handleCreate = async (
    newsData: supabaseDatabaseType.public.tables.news.insert
  ) => {
    const newRow = DatabaseNewsTable.handleCreate(newsData);
    const { error } = await SupabaseActionTableNewsQueries_insert(newRow);
    if (error) {
      throw new Error("Error creating news:", error);
    } else {
      setNews((prev) => [newRow, ...prev]);
    }
  };

  const handleUpdate = async (
    pre: supabaseDatabaseType.public.tables.news.req.def,
    updatedNews: supabaseDatabaseType.public.tables.news.update
  ) => {
    const newRow = DatabaseNewsTable.update(pre, updatedNews);
    const { data, error } = await SupabaseActionTableNewsQueries_update(
      newRow.id,
      newRow
    );
    if (error) {
      throw new Error("Error updating news:", error);
    } else {
      setNews((prev) =>
        prev.map((item) => (item.id === newRow.id ? data : item))
      );
    }
  };

  const handleDelete = async (
    id: supabaseDatabaseType.public.tables.news.types.id
  ) => {
    const { error } = await SupabaseActionTableNewsQueries_delete(id);
    if (error) {
      throw new Error("Error deleting news:", error);
    } else {
      setNews((prev) => prev.filter((item) => item.id !== id));
      closeModal();
    }
  };

  const getStatusBadge = (val: boolean) => {
    const styles = {
      public: "bg-green-900 text-green-200",
      private: "bg-yellow-900 text-yellow-200",
    };
    const labels = {
      public: "公開中",
      private: "非公開",
    };
    return (
      <Badge className={`${val ? styles.public : styles.private}`}>
        {val ? labels.public : labels.private}
      </Badge>
    );
  };

  console.debug("Filtered news:", filteredNews);
  console.debug("Current news:", currentNews);

  function ContentNewsList() {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-12 opacity-50">
          <IconLoader2 className="h-12 w-12 animate-spin" />
        </div>
      );
    }

    {
      /* ニュースがない場合のメッセージ */
    }
    if (currentNews.length === 0) {
      return (
        <div className="p-12 text-center opacity-50">
          <div className="mb-4">
            <IconSearch className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium mb-2">記事が見つかりません</h3>
          <p>検索条件を変更するか、新しい記事を作成してください。</p>
        </div>
      );
    }

    return (
      <>
        {/* テーブルヘッダー */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium">
          <div className="col-span-5">タイトル</div>
          <div className="col-span-2">ステータス</div>
          <div className="col-span-2">作成者</div>
          <div className="col-span-2">作成日</div>
          <div className="col-span-1">操作</div>
        </div>

        {/* ニュース項目 */}
        <div className="divide-y">
          {currentNews.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 p-4 transition-colors"
            >
              <div className="col-span-5">
                <div className="flex items-start gap-3">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.title}
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">{item.title}</h3>
                    <p className="text-sm mt-1 line-clamp-2">{item.excerpt}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <IconTag className="h-3 w-3" />
                      {item.type}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 flex items-center">
                {getStatusBadge(item.public)}
              </div>

              <div className="col-span-2 flex items-center text-sm text-gray-600">
                <IconUser className="h-4 w-4 mr-1" />
              </div>

              <div className="col-span-2 flex items-center text-sm text-gray-600">
                <IconCalendar className="h-4 w-4 mr-1" />
                {format.dateTime(new Date(item.created_at), {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>

              <div className="col-span-1 flex items-center">
                <div className="flex gap-1">
                  <button
                    onClick={() => openModal("view", item)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="詳細表示"
                  >
                    <IconEye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal("edit", item)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="編集"
                  >
                    <IconEdit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openModal("delete", item)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="削除"
                  >
                    <IconTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-4">
      {/* 検索・フィルター・新規作成 */}
      <div className="rounded-lg shadow-sm border mb-6 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 gap-4 items-center">
            {/* 検索バー */}
            <div className="relative flex-1 max-w-md">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-4 w-4" />
              <input
                type="text"
                placeholder="記事を検索..."
                className="pl-10 pr-4 py-2 w-full border border-secondary rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* ステータスフィルター */}
            <select
              className="px-4 py-2 border border-secondary rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">すべて</option>
              <option value="true">公開中</option>
              <option value="false">非公開</option>
            </select>
          </div>

          {/* 新規作成ボタン */}
          <Button onClick={() => openModal("create")}>
            <IconPlus className="h-4 w-4" />
            新規作成
          </Button>
        </div>
        {/* 統計情報 */}
        <div className="flex gap-6 mt-4 pt-4 border-t">
          <div className="text-sm opacity-80">
            総記事数: <span className="font-semibold">{news.length}</span>
          </div>
          <div className="text-sm opacity-80">
            検索結果:{" "}
            <span className="font-semibold">{filteredNews.length}</span>
          </div>
        </div>
      </div>
      {/* ニュース一覧 */}
      <div className="rounded-lg shadow-sm border">
        <ContentNewsList />
        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-gray-700">
              {filteredNews.length} 件中 {(currentPage - 1) * itemsPerPage + 1}{" "}
              - {Math.min(currentPage * itemsPerPage, filteredNews.length)}{" "}
              件を表示
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                前へ
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm border rounded ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                次へ
              </button>
            </div>
          </div>
        )}
      </div>

      {/* モーダル */}
      <DashboardNewsCreateDialogContent
        modalType={modalType}
        closeModal={closeModal}
        handleCreate={handleCreate}
      />
      <DashboardNewsEditDialogContent
        modalType={modalType}
        closeModal={closeModal}
        selectedNews={selectedNews}
        handleUpdate={handleUpdate}
      />
      <DashboardNewsDeleteDialogContent
        modalType={modalType}
        closeModal={closeModal}
        selectedNews={selectedNews}
        handleDelete={handleDelete}
      />
    </div>
  );
}
