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

export const DashboardNewsCreateDialogContent = ({
  modalType,
  closeModal,
  handleCreate,
}: {
  modalType: string | null;
  closeModal: () => void;
  handleCreate: (
    data: supabaseDatabaseType.public.tables.news.insert
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
          id: z.string().uuid(),
          name: z.string().min(2).max(100),
        })
      )
      .min(1, "著者は1人以上必要です。")
      .optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      public: false,
      type: "notice",
      title: "無題のニュース",
      excerpt: undefined,
      content: undefined,
      image: undefined,
      authors: undefined,
      created_at: undefined,
      updated_at: undefined,
    },
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

        // 不要なプロパティを削除
        const cleanedData =
          removeFalsyFromObject<supabaseDatabaseType.public.tables.news.insert>(
            data
          );

        // 実際の送信処理を実行
        await handleCreate(cleanedData);

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
        loading: "新規記事を作成中...",
        success: "新規記事の作成が完了しました。",
        error: "新規記事の作成に失敗しました。",
      });

      // Await the actual promise to control form state
      await submission;
    } finally {
      form.reset();
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  });

  // submit の中断とエラーメッセージ設定
  const preventDuplicatedSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    toast.warning("すでに送信中のため送信処理を実行しませんでした。");
  };

  return (
    <Sheet open={modalType === "create"} onOpenChange={closeModal}>
      <SheetContent side="right" className="w-full sm:max-w-xl h-full p-0">
        <Form {...form}>
          <form
            onSubmit={
              formState.isSubmitting ? preventDuplicatedSubmit : handleSubmit
            }
            className="flex flex-col w-full h-full sm:px-3 md:px-5 mx-auto"
          >
            <SheetHeader className="flex-none border-b">
              <SheetTitle>新規作成</SheetTitle>
              <SheetDescription>
                ニュース記事を新規作成します。
              </SheetDescription>
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
                    <AccordionContent>
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
                                    // disabled={(date) =>
                                    //   date > new Date() || date < new Date("1900-01-01")
                                    // }
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
                {formState.isSubmitting ? "送信中..." : "送信する"}
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
