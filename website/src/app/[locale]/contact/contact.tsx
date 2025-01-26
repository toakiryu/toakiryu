"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Circle } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { GFromQuickSubmitFormPOST } from "gform-quick-submit";

import { Button, Select, SelectItem } from "@heroui/react";
import {
  CustomFormDt,
  CustomFormInput,
  CustomFormLabel,
  CustomFormTextarea,
} from "./formcontent";
import { useSearchParams } from "next/navigation";

export default function ContactPageContainer() {
  return (
    <>
      <ContactPageTopTitle />
      <ContactPageContent />
    </>
  );
}

export function ContactPageTopTitle() {
  const t = useTranslations("pages.contact");
  return (
    <div className="pt-[134px]">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 1,
        }}
        className="text-2xl sm:!text-4xl md:!text-5xl lg:!text-6xl text-center font-bold uppercase bg-clip-text text-transparent bg-gradient-to-b bg-black to-neutral-700/50 dark:from-white dark:to-neutral-300/50"
      >
        {t("metadata.title")}
      </motion.h1>
    </div>
  );
}

export function ContactPageFormContent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormState, setIsFormState] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const t = useTranslations("pages.contact");

  const contactSchema = z.object({
    company: z.string().max(50, t("form.errors.max", { length: "50" })),
    name: z
      .string()
      .min(1, t("form.errors.nameRequired"))
      .max(50, t("form.errors.max", { length: "50" })),
    email: z
      .string()
      .email(t("form.errors.emailInvalid"))
      .max(50, t("form.errors.max", { length: "50" })),
    subject: z
      .string()
      .min(1, t("form.errors.subjectRequired"))
      .max(50, t("form.errors.max", { length: "50" })),
    message: z
      .string()
      .min(1, t("form.errors.messageRequired"))
      .max(500, t("form.errors.max", { length: "500" })),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    const promise = toast.loading(t("form.loading.title"));
    const res = await GFromQuickSubmitFormPOST({
      data: [
        {
          key: "1037971436",
          value: data.company,
        },
        {
          key: "64248411",
          value: data.name,
        },
        {
          key: "1959211618",
          value: data.email,
        },
        {
          key: "1975770837",
          value: data.subject,
        },
        {
          key: "272465746",
          value: data.message,
        },
      ],
    });

    if (res.success) {
      toast.success(t("form.success.title"), { id: promise });
      setIsFormState(true);
      reset();
    } else {
      toast.error(t("form.error.title"), { id: promise });
      console.log(res.error);
    }
    setIsLoading(false);
  };

  if (isFormState) {
    return (
      <div>
        <div
          id="form-input-contents"
          className="flex flex-col pt-[5.20833vw] px-[2.60417vw] pb-[10.41667vw] lg:!pt-[40px] lg:!px-[120px] lg:!pb-[80px] mt-[7.8125vw] lg:!mt-[40px] shadow-[0_16px_32px_rgba(207,221,234,.34)]"
        >
          <h1 className="font-bold text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl text-center mb-10">
            {t("form.submittedMessage")}
          </h1>
          <Button
            className="font-bold text-[3.90625vw] lg:!text-xl text-center uppercase leading-[4.81771vw] lg:!leading-[24px] tracking-[.04em] w-[62.5vw] lg:!w-[480px] h-[13.54167vw] lg:!h-[80px] mx-auto bg-white dark:!bg-black border rounded-full hover:!bg-black dark:hover:!bg-white hover:!text-white dark:hover:!text-black active:!scale-95 transition-all duration-300 ease-in-out"
            onPress={() => setIsFormState(false)}
          >
            {t("form.newFormButton")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        id="form-input-contents"
        className="pt-[5.20833vw] px-[2.60417vw] pb-[10.41667vw] lg:!pt-[40px] lg:!px-[120px] lg:!pb-[80px] mt-[7.8125vw] lg:!mt-[40px] bg-white dark:bg-black shadow-[0_16px_32px_rgba(207,221,234,.34)]"
      >
        <div className="mt-[5.20833vw] lg:!mt-[40px] border-t">
          <div>
            <CustomFormLabel htmlFor="company">
              <CustomFormDt>{t("form.fields.company")}</CustomFormDt>
              <div className="grow">
                <span className="relative">
                  <CustomFormInput
                    id="company"
                    type="text"
                    defaultValue={searchParams.get("company") || undefined}
                    errorMessage={errors.company?.message}
                    {...register("company")}
                  />
                </span>
              </div>
            </CustomFormLabel>
          </div>
          <div>
            <CustomFormLabel htmlFor="name">
              <CustomFormDt>{t("form.fields.name")}*</CustomFormDt>
              <div className="grow">
                <span className="relative">
                  <CustomFormInput
                    id="name"
                    type="text"
                    defaultValue={searchParams.get("name") || undefined}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    {...register("name", { required: true })}
                  />
                </span>
              </div>
            </CustomFormLabel>
          </div>
          <div>
            <CustomFormLabel htmlFor="email">
              <CustomFormDt>{t("form.fields.email")}*</CustomFormDt>
              <div className="grow">
                <span className="relative">
                  <CustomFormInput
                    id="email"
                    type="email"
                    defaultValue={searchParams.get("email") || undefined}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    {...register("email")}
                  />
                </span>
              </div>
            </CustomFormLabel>
          </div>
          <div>
            <CustomFormLabel htmlFor="subject">
              <CustomFormDt>{t("form.fields.subject")}*</CustomFormDt>
              <div className="grow">
                <span className="relative">
                  <Select
                    id="subject"
                    aria-label="subject a select"
                    defaultSelectedKeys={
                      searchParams.get("subject")
                        ? [`${searchParams.get("subject")}`]
                        : []
                    }
                    isInvalid={!!errors.subject}
                    errorMessage={errors.subject?.message}
                    className="text-[3.38542vw] lg:!text-base w-full h-fit py-[1.5625vw] px-[2.34375vw] lg:!py-[18px] lg:!px-[15px] rounded-[1.30208vw] lg:!rounded-[10px]"
                    {...register("subject")}
                  >
                    <SelectItem
                      key={t("form.fields.subject-lists.1")}
                      value={t("form.fields.subject-lists.1")}
                    >
                      {t("form.fields.subject-lists.1")}
                    </SelectItem>
                    <SelectItem
                      key={t("form.fields.subject-lists.2")}
                      value={t("form.fields.subject-lists.2")}
                    >
                      {t("form.fields.subject-lists.2")}
                    </SelectItem>
                    <SelectItem
                      key={t("form.fields.subject-lists.3")}
                      value={t("form.fields.subject-lists.3")}
                    >
                      {t("form.fields.subject-lists.3")}
                    </SelectItem>
                    <SelectItem
                      key={t("form.fields.subject-lists.4")}
                      value={t("form.fields.subject-lists.4")}
                    >
                      {t("form.fields.subject-lists.4")}
                    </SelectItem>
                    <SelectItem
                      key={t("form.fields.subject-lists.5")}
                      value={t("form.fields.subject-lists.5")}
                    >
                      {t("form.fields.subject-lists.5")}
                    </SelectItem>
                    <SelectItem
                      key={t("form.fields.subject-lists.6")}
                      value={t("form.fields.subject-lists.6")}
                    >
                      {t("form.fields.subject-lists.6")}
                    </SelectItem>
                  </Select>
                </span>
              </div>
            </CustomFormLabel>
          </div>
          <div>
            <CustomFormLabel htmlFor="message">
              <CustomFormDt>{t("form.fields.message")}*</CustomFormDt>
              <div className="grow">
                <span className="relative">
                  <CustomFormTextarea
                    id="message"
                    type="text"
                    disableAnimation
                    disableAutosize
                    defaultValue={searchParams.get("message") || undefined}
                    isInvalid={!!errors.message}
                    errorMessage={errors.message?.message}
                    classNames={{
                      base: "w-full",
                      input: "resize-y min-h-[40px] max-h-[50vw]",
                    }}
                    {...register("message")}
                  />
                </span>
              </div>
            </CustomFormLabel>
          </div>
        </div>
      </div>
      <div className="flex mt-[7.8125vw] lg:!mt-[60px] mb-10">
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="font-bold text-[3.90625vw] lg:!text-xl text-center uppercase leading-[4.81771vw] lg:!leading-[24px] tracking-[.04em] w-[62.5vw] lg:!w-[480px] h-[13.54167vw] lg:!h-[80px] mx-auto bg-white dark:!bg-black border rounded-full hover:!bg-black dark:hover:!bg-white hover:!text-white dark:hover:!text-black active:!scale-95 transition-all duration-300 ease-in-out"
        >
          {isSubmitting ? t("form.loadingButton") : t("form.submitButton")}
        </Button>
      </div>
    </form>
  );
}

export function ContactPageContent() {
  const t = useTranslations("pages.contact");

  const listItems = ["1", "2", "3"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.8,
        duration: 1,
      }}
      className="w-[92.1875vw] lg:!w-[clamp(100px,90%,1200px)] mt-[9.375vw] lg:!mt-[138px] mx-auto"
    >
      <h2 className="relative z-[20] font-bold text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl text-center uppercase pb-[4px]">
        <span className="relative bg-clip-text text-transparent bg-gradient-to-b bg-black to-neutral-700/50 dark:from-white dark:to-neutral-300/50">
          {t("attention.title")}
          <span className="absolute -bottom-[.65104vw] lg:!bottom-0 -left-[.78125vw] lg:!-left-[13px] right-0 w-[calc(100%+.39062vw)] lg:!w-[calc(100%+26px)] h-[1px] bg-[#7a98c9] before:absolute before:-top-[6px] before:-left-[13px] before:w-[13px] before:h-[13px] before:bg-[url(/wp-content/themes/images/common/icon_kira.svg)] before:bg-center before:bg-contain before:bg-no-repeat after:absolute after:-top-[6px] after:-right-[13px] after:w-[13px] after:h-[13px] after:bg-[url(/wp-content/themes/images/common/icon_kira.svg)] after:bg-center after:bg-contain after:bg-no-repeat" />
        </span>
      </h2>
      <div className="relative z-10 pt-[12.5vw] px-[9.11458vw] pb-[7.8125vw] lg:!pt-[72px] lg:!px-0 lg:!pb-[44px] -mt-[4.94792vw] lg:!-mt-[30px] bg-neutral-100 dark:bg-neutral-900 before:hidden before:lg:!block before:absolute before:top-0 before:right-[20px] before:w-[8px] before:h-full before:bg-neutral-300 dark:before:bg-neutral-700 after:hidden after:lg:!block after:absolute after:top-0 after:left-[20px] after:w-[8px] after:h-full after:bg-neutral-300 dark:after:bg-neutral-700">
        <ul className="w-full lg:!w-[clamp(100px,84%,860px)] mx-auto">
          {listItems.map((item, index) => {
            return (
              <li
                key={index}
                className="relative flex items-center font-medium text-[3.125vw] lg:!text-base leading-[1.5] lg:!leading-[2] tracking-[.04rem] pl-[5.20833vw] lg:!pl-[28px]"
              >
                <Circle className="absolute top-[1.69271vw] lg:!top-[5px] left-0 w-[2.34375vw] lg:!w-[14px]" />
                {t(`attention.listItems.${item}`)}
              </li>
            );
          })}
        </ul>
      </div>
      <ContactPageFormContent />
    </motion.div>
  );
}
