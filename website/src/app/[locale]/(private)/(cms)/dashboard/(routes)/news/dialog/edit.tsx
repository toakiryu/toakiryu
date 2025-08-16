"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useFormatter } from "next-intl";
import { cn } from "@/src/lib/utils";
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
import { Input } from "@/src/components/ui/shadcn/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/shadcn/select";
import { Textarea } from "@/src/components/ui/shadcn/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/shadcn/popover";
import { IconCalendar } from "@tabler/icons-react";
import { Calendar } from "@/src/components/ui/shadcn/calendar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/shadcn/sheet";
import { Label } from "@/src/components/custom/form/label";
import { Switch } from "@/src/components/ui/shadcn/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/shadcn/accordion";
import { supabaseDatabaseType } from "@/src/utils/supabase/table";
import { removeFalsyFromObject } from "@/src/utils/val";

export const DashboardNewsEditDialogContent = ({
  modalType,
  closeModal,
  selectedNews,
  handleUpdate,
}: {
  modalType: string | null;
  closeModal: () => void;
  selectedNews: supabaseDatabaseType.public.tables.news.req.def | null;
  handleUpdate: (
    pre: supabaseDatabaseType.public.tables.news.req.def,
    data: supabaseDatabaseType.public.tables.news.update
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
          handleUpdate={handleUpdate}
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
  handleUpdate,
}: {
  modalType: string | null;
  closeModal: () => void;
  selectedNews: supabaseDatabaseType.public.tables.news.req.def;
  handleUpdate: (
    pre: supabaseDatabaseType.public.tables.news.req.def,
    data: supabaseDatabaseType.public.tables.news.update
  ) => Promise<void>;
}) => {
  const format = useFormatter();

  const [formState, setFormState] = React.useState<{
    isSubmitting: boolean;
  }>({
    isSubmitting: false,
  });

  const FormSchema = z.object({
    public: z.boolean().optional(),
    type: z.enum(["notice", "event", "other"]).optional(),
    title: z
      .string()
      .min(2, "タイトルは2文字以上で入力してください。")
      .max(100, "タイトルは100文字以内で入力してください。"),
    excerpt: z
      .string()
      .max(200, "抜粋は200文字以内で入力してください。")
      .optional(),
    content: z.string().optional(),
    image: z.url().optional(),
    authors: z
      .array(
        z.object({
          name: z.string().min(1).max(50),
          url: z.url().min(2).max(100),
        })
      )
      // .min(1, "著者は1人以上必要です。")
      .optional(),
    created_at: z.string().optional(),
    updated_at: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      public: selectedNews.public,
      type: selectedNews.type,
      title: selectedNews.title,
      excerpt: selectedNews.excerpt ?? undefined,
      content: selectedNews.content ?? undefined,
      image: selectedNews.image ?? undefined,
      authors: selectedNews.authors ?? [],
      created_at: selectedNews.created_at,
      updated_at: selectedNews.updated_at,
    },
  });

  // submit の処理
  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("Submitted data:", data);
    setFormState((prev) => ({ ...prev, isSubmitting: true }));
    try {
      // Build the actual submission promise
      const submission = (async () => {
        // optional delay to show the loading state

        // 10ms の遅延
        await new Promise((r) => setTimeout(r, 10));

        // 不要なプロパティを削除
        const cleanedData = removeFalsyFromObject<
          supabaseDatabaseType.public.tables.news.update & {
            updated_at?: string;
          }
        >(data);

        // 実際の送信処理を実行
        await handleUpdate(selectedNews, cleanedData);

        toast("You submitted the following values", {
          description: (
            <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
              <code className="text-white">
                {JSON.stringify(cleanedData, null, 2)}
              </code>
            </pre>
          ),
        });
        return {};
      })();

      // Drive the toast UI with the same promise (do not await this call)
      toast.promise(submission, {
        loading: "編集した記事を保存中...",
        success: "編集した記事の保存が完了しました。",
        error: "編集した記事の保存に失敗しました。",
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
    toast.warning("すでに送信中のため送信処理を実行しませんでした。");
  };

  return (
    <Sheet open={modalType === "edit"} onOpenChange={closeModal}>
      <SheetContent side="right" className="w-full sm:max-w-xl h-full p-0">
        <Form {...form}>
          <form
            id="dashboard-news-edit-form"
            onSubmit={
              formState.isSubmitting ? preventDuplicatedSubmit : handleSubmit
            }
            className="flex flex-col w-full h-full sm:px-3 md:px-5 mx-auto"
          >
            <SheetHeader className="flex-none border-b">
              <SheetTitle>記事の編集</SheetTitle>
              <SheetDescription>ニュース記事を編集します。</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 p-4">
                <FormField
                  control={form.control}
                  name="public"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>公開設定 / Public</FormLabel>
                        <FormDescription>
                          ニュースの公開設定です。チェックすると公開されます。
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-0.5">
                        <FormLabel>
                          <Label required>タイプ / Type</Label>
                        </FormLabel>
                        <FormDescription>
                          ニュースのタイプを選択してください。
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="タイプを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>タイプ</SelectLabel>
                              <SelectItem value="notice">お知らせ</SelectItem>
                              <SelectItem value="event">イベント</SelectItem>
                              <SelectItem value="other">その他</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label required>タイトル / Title</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border-sidebar"
                          placeholder="記事のタイトルを入力してください。"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>抜粋 / Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          className="border-sidebar"
                          placeholder="記事の抜粋を入力してください。"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>コンテンツ / Content</FormLabel>
                      <FormControl>
                        <Textarea
                          className="border-sidebar"
                          placeholder="記事のコンテンツを入力してください。"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-0.5">
                        <FormLabel>画像 / Image</FormLabel>
                        <FormDescription>
                          記事の画像URLを入力してください。
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input
                          className="border-sidebar"
                          placeholder="https://****.webp"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>高度なオプション</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="created_at"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>作成日 / Created At</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format.dateTime(new Date(field.value))
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? new Date(field.value)
                                        : new Date()
                                    }
                                    onSelect={(val) =>
                                      field.onChange(String(val))
                                    }
                                    captionLayout="dropdown"
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormDescription>
                              記事の作成日を入力してください。
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="updated_at"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>更新日 / Updated At</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format.dateTime(new Date(field.value))
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? new Date(field.value)
                                        : new Date()
                                    }
                                    onSelect={(val) =>
                                      field.onChange(String(val))
                                    }
                                    captionLayout="dropdown"
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormDescription>
                              記事の更新日を入力してください。
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <SheetFooter className="flex-none border-t">
              <Button
                type="submit"
                className="w-full"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? "保存中..." : "保存する"}
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
