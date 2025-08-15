"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { RoughNotation } from "react-rough-notation";
import { toast } from "sonner";
import { cn } from "@/src/lib/utils";
import { GFromQuickSubmitFormPOST } from "@/src/utils/gform-quick-submit";
import { useDetectVisibleAssets } from "@/src/hooks/useDetectVisibleAssets";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/shadcn/form";
import { Input } from "@/src/components/ui/shadcn/input";
import { Textarea } from "@/src/components/ui/shadcn/textarea";
import { Button } from "@/src/components/ui/shadcn/button";
import { Checkbox } from "@/src/components/ui/shadcn/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/shadcn/accordion";
import { LinkText } from "@/src/components/custom/link-text";

export default function PageHomeContactFormContent({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  const { ref, isVisible } = useDetectVisibleAssets<HTMLDivElement>({
    delayPlus: -500,
    inViewOptions: { once: true, margin: "0px 0px -100px 0px" },
  });

  return (
    <div
      ref={ref}
      className={cn("flex flex-col px-5 py-10 mt-20 bg-background", className)}
      {...props}
    >
      <div className="w-full max-w-5xl mx-auto mb-10 px-5">
        <div className="w-fit mx-auto">
          <RoughNotation
            type="underline"
            show={isVisible}
            animationDuration={1500}
            color="color-mix(in oklab, var(--accent) 80%, transparent)"
            strokeWidth={5}
          >
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-shadow-md/10 text-center uppercase">
              Contact
            </h1>
          </RoughNotation>
        </div>
      </div>
      <InputForm />
    </div>
  );
}

function InputForm() {
  const [formState, setFormState] = React.useState<{
    isSubmitting: boolean;
  }>({
    isSubmitting: false,
  });

  const FormSchema = z.object({
    company: z.string().optional(),
    name: z.string().min(2, {
      message: "名前は２文字以上でなければなりません。",
    }),
    email: z.email("メールアドレスが無効です。"),
    message: z
      .string()
      .min(10, {
        message: "メッセージは10文字以上でなければなりません。",
      })
      .max(500, {
        message: "メッセージは500文字以下でなければなりません。",
      }),
    consent: z.literal(true, {
      message: "同意できない場合は送信できません。",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company: "",
      name: "",
      email: "",
      message: "",
    },
  });

  // submit の処理
  const handleSubmit = form.handleSubmit(async (data) => {
    setFormState((prev) => ({ ...prev, isSubmitting: true }));
    try {
      // Build the actual submission promise
      const submission = (async () => {
        // optional delay to show the loading state
        await new Promise((r) => setTimeout(r, 10));
        return GFromQuickSubmitFormPOST({
          data: [
            { key: "1037971436", value: data.company },
            { key: "64248411", value: data.name },
            { key: "1959211618", value: data.email },
            { key: "272465746", value: data.message },
          ],
        });
      })();

      // Drive the toast UI with the same promise (do not await this call)
      toast.promise(submission, {
        loading: "送信中...",
        success: "送信が完了しました。",
        error: "送信に失敗しました。",
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
    <Form {...form}>
      <form
        onSubmit={
          formState.isSubmitting ? preventDuplicatedSubmit : handleSubmit
        }
        className="w-full md:w-[60%] space-y-6 mx-auto"
      >
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>会社 / Company</FormLabel>
              <FormControl>
                <Input
                  className="border-sidebar rounded-none"
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>
                  名前 / Name
                  <span className="text-red-500 pl-1">*</span>
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border-sidebar rounded-none"
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>
                  メールアドレス / Email
                  <span className="text-red-500 pl-1">*</span>
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border-sidebar rounded-none"
                  placeholder="mail@example.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>
                  メッセージ / Message
                  <span className="text-red-500 pl-1">*</span>
                </span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="border-sidebar rounded-none"
                  placeholder="メッセージを入力してください"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  className="border-foreground/50 mr-0! rounded-none"
                  defaultChecked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <span>
                  上記の内容を確認し、
                  <LinkText href="https://policies.google.com/terms">
                    Googleの利用規約
                  </LinkText>
                  と
                  <LinkText href="https://policies.google.com/privacy">
                    プライバシーポリシー
                  </LinkText>
                  に同意します。
                </span>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full rounded-none"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "送信中..." : "送信する"}
        </Button>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="bg-sidebar px-3">
              <AccordionTrigger className="text-lg py-3">
                このフォームについて
              </AccordionTrigger>
              <AccordionContent className="font-sans-serif">
                <p className="text-sm mb-1">
                  本フォームは
                  <LinkText href="https://workspace.google.com/intl/ja/products/forms/">
                    Googleフォーム
                  </LinkText>
                  をバックエンドとして利用しています。入力ページの構造を解析し、送信先URLと項目キーを特定してAPI経由で送信します。実際の処理・保存はGoogleのサーバー上で行われます。
                </p>
                <p className="text-sm mb-1">
                  この仕組みは、過去に自分が作成したライブラリ
                  <LinkText href="https://github.com/toakiryu/gform-quick-submit">
                    gform-quick-submit
                  </LinkText>
                  を用いて実装しています。技術的な詳細はリポジトリをご参照ください。
                </p>
                <p className="text-sm mb-2">
                  本フォームの利用により、Googleの
                  <LinkText href="https://policies.google.com/terms">
                    利用規約
                  </LinkText>
                  および
                  <LinkText href="https://policies.google.com/privacy">
                    プライバシーポリシー
                  </LinkText>
                  に同意いただいたものとみなします。送信データはGoogleにより保管・管理されます。
                </p>
                <p className="text-xs">
                  ※注意：Google側の仕様変更やアクセス制限により、予告なく利用できなくなる場合があります。本サイトは送信内容の完全性・可用性・安全性を保証しません。機密情報の送信は控え、通信が
                  https で暗号化されていることをご確認ください。
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </form>
    </Form>
  );
}
