"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/shadcn/form";
import { Button } from "@/src/components/ui/shadcn/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/shadcn/sheet";
import { Switch } from "@/src/components/ui/shadcn/switch";
import { supabaseDatabaseType } from "@/src/utils/supabase/table";

export const DashboardNewsDeleteDialogContent = ({
  modalType,
  closeModal,
  selectedNews,
  handleDelete,
}: {
  modalType: string | null;
  closeModal: () => void;
  selectedNews: supabaseDatabaseType.public.tables.news.req.def | null;
  handleDelete: (
    id: supabaseDatabaseType.public.tables.news.types.id
  ) => Promise<void>;
}) => {
  const [selectedNewsCache, setSelectedNewsCache] =
    React.useState<supabaseDatabaseType.public.tables.news.req.def | null>(
      null
    );

  const [formContent, setFormContent] = React.useState<React.ReactNode | null>(
    null
  );

  React.useEffect(() => {
    setFormContent(null);
    if (selectedNewsCache === selectedNews) {
      setSelectedNewsCache(null);
    }
    if (selectedNews) {
      setFormContent(
        <FormRender
          modalType={modalType}
          closeModal={closeModal}
          selectedNews={selectedNews}
          handleDelete={handleDelete}
        />
      );
    }
    setSelectedNewsCache(selectedNews);
  }, [selectedNews]);

  return formContent;
};

const FormRender = ({
  modalType,
  closeModal,
  selectedNews,
  handleDelete,
}: {
  modalType: string | null;
  closeModal: () => void;
  selectedNews: supabaseDatabaseType.public.tables.news.req.def;
  handleDelete: (
    id: supabaseDatabaseType.public.tables.news.types.id
  ) => Promise<void>;
}) => {
  const [formState, setFormState] = React.useState<{
    isSubmitting: boolean;
  }>({
    isSubmitting: false,
  });

  const FormSchema = z.object({
    confirmation: z.literal(true, {
      message: "同意できない場合は削除はできません。",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  // submit の処理
  const handleSubmit = form.handleSubmit(async (data) => {
    setFormState((prev) => ({ ...prev, isSubmitting: true }));
    try {
      // Build the actual submission promise
      const submission = (async () => {
        // optional delay to show the loading state

        // 10ms の遅延
        await new Promise((r) => setTimeout(r, 10));

        // 実際の送信処理を実行
        await handleDelete(selectedNews.id);

        toast("You submitted the following values", {
          description: (
            <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        return {};
      })();

      // Drive the toast UI with the same promise (do not await this call)
      toast.promise(submission, {
        loading: "選択した記事を削除中...",
        success: "選択した記事の削除が完了しました。",
        error: "選択した記事の削除に失敗しました。",
      });

      // Await the actual promise to control form state
      await submission;
    } finally {
      form.reset();
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
      closeModal();
    }
  });

  // submit の中断とエラーメッセージ設定
  const preventDuplicatedSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    toast.warning("すでに実行中のため送信処理を実行しませんでした。");
  };

  return (
    <Sheet open={modalType === "delete"} onOpenChange={closeModal}>
      <SheetContent side="right" className="w-full sm:max-w-xl h-full p-0">
        <Form {...form}>
          <form
            id="dashboard-news-delete-form"
            onSubmit={
              formState.isSubmitting ? preventDuplicatedSubmit : handleSubmit
            }
            className="flex flex-col w-full h-full sm:px-3 md:px-5 mx-auto"
          >
            <SheetHeader className="flex-none border-b">
              <SheetTitle>記事の削除</SheetTitle>
              <SheetDescription>ニュース記事を削除します。</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 p-4">
                <FormField
                  control={form.control}
                  name="confirmation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg p-3">
                      <div className="space-y-0.5">
                        <FormLabel>削除確認 / Delete Confirmation</FormLabel>
                        <FormDescription>
                          この操作は取り消しできません。削除する記事を確認してください。
                        </FormDescription>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <SheetFooter className="flex-none border-t">
              <Button
                type="submit"
                className="w-full"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? "削除中..." : "削除する"}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" onClick={() => closeModal()}>
                  閉じる
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
