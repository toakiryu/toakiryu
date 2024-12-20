"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { useTranslations } from "next-intl";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSubmit } from "./form";
import {
  CustomFormDt,
  CustomFormErrorMessage,
  CustomFormInput,
  CustomFormLabel,
  CustomFormTextarea,
} from "./formcontent";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

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
        className="text-2xl sm:!text-4xl md:!text-5xl lg:!text-6xl text-center font-bold uppercase bg-clip-text text-transparent bg-gradient-to-b from-[#071827] to-[#1464ae]"
      >
        {t("metadata.title")}
      </motion.h1>
    </div>
  );
}

export function ContactPageFormContent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormState, setIsFormState] = useState<boolean>(false);

  const t = useTranslations("pages.contact");

  const contactSchema = z.object({
    company: z.string().optional(),
    name: z.string().min(1, t("form.errors.nameRequired")),
    email: z.string().email(t("form.errors.emailInvalid")),
    message: z.string().min(1, t("form.errors.messageRequired")),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    const promise = contactFormSubmit(data);
    toaster.promise(promise, {
      success: {
        title: t("form.success.title"),
        description: t("form.success.description"),
      },
      error: {
        title: t("form.error.title"),
        description: t("form.error.description"),
      },
      loading: {
        title: t("form.loading.title"),
        description: t("form.loading.description"),
      },
    });
    if (!!promise) {
      setIsFormState(true);
      setIsLoading(false);
      reset();
    }
  };

  if (isFormState) {
    return (
      <div>
        <div
          id="form-input-contents"
          className="flex flex-col pt-[5.20833vw] px-[2.60417vw] pb-[10.41667vw] lg:!pt-[40px] lg:!px-[120px] lg:!pb-[80px] mt-[7.8125vw] lg:!mt-[40px] bg-white shadow-[0_16px_32px_rgba(207,221,234,.34)]"
        >
          <h1 className="font-bold text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl text-[#071828] text-center mb-10">
            {t("form.submittedMessage")}
          </h1>
          <Button
            className="font-bold text-[3.90625vw] lg:!text-xl text-[#071828] text-center uppercase leading-[4.81771vw] lg:!leading-[24px] tracking-[.04em] w-[62.5vw] lg:!w-[480px] h-[13.54167vw] lg:!h-[80px] mx-auto bg-white border border-[#071828] rounded-full hover:!bg-[#071828] hover:!text-white active:!scale-95 transition-all duration-300 ease-in-out"
            onClick={() => setIsFormState(false)}
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
        className="pt-[5.20833vw] px-[2.60417vw] pb-[10.41667vw] lg:!pt-[40px] lg:!px-[120px] lg:!pb-[80px] mt-[7.8125vw] lg:!mt-[40px] bg-white shadow-[0_16px_32px_rgba(207,221,234,.34)]"
      >
        <div className="mt-[5.20833vw] lg:!mt-[40px] border-t border-[#dbe9f5]">
          <dl>
            <CustomFormLabel htmlFor="company">
              <CustomFormDt>{t("form.fields.company")}</CustomFormDt>
              <dd className="grow">
                <span className="relative">
                  <CustomFormInput
                    id="company"
                    type="text"
                    {...register("company")}
                  />
                </span>
              </dd>
            </CustomFormLabel>
          </dl>
          <dl>
            <CustomFormLabel htmlFor="name">
              <CustomFormDt>{t("form.fields.name")}*</CustomFormDt>
              <dd className="grow">
                <span className="relative">
                  <CustomFormInput
                    id="name"
                    type="text"
                    {...register("name")}
                  />
                  {errors.name && (
                    <CustomFormErrorMessage>
                      {errors.name.message}
                    </CustomFormErrorMessage>
                  )}
                </span>
              </dd>
            </CustomFormLabel>
          </dl>
          <dl>
            <CustomFormLabel htmlFor="email">
              <CustomFormDt>{t("form.fields.email")}*</CustomFormDt>
              <dd className="grow">
                <span className="relative">
                  <CustomFormInput
                    id="email"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <CustomFormErrorMessage>
                      {errors.email.message}
                    </CustomFormErrorMessage>
                  )}
                </span>
              </dd>
            </CustomFormLabel>
          </dl>
          <dl>
            <CustomFormLabel htmlFor="message">
              <CustomFormDt>{t("form.fields.message")}*</CustomFormDt>
              <dd className="grow">
                <span className="relative">
                  <CustomFormTextarea
                    id="message"
                    type="text"
                    className="resize-y h-full min-h-[15vw] max-h-[50vw] field-sizing-content"
                    {...register("message")}
                  />
                  {errors.message && (
                    <CustomFormErrorMessage>
                      {errors.message.message}
                    </CustomFormErrorMessage>
                  )}
                </span>
              </dd>
            </CustomFormLabel>
          </dl>
        </div>
      </div>
      <div className="flex mt-[7.8125vw] lg:!mt-[60px] mb-10">
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="font-bold text-[3.90625vw] lg:!text-xl text-[#071828] text-center uppercase leading-[4.81771vw] lg:!leading-[24px] tracking-[.04em] w-[62.5vw] lg:!w-[480px] h-[13.54167vw] lg:!h-[80px] mx-auto bg-white border border-[#071828] rounded-full hover:!bg-[#071828] hover:!text-white active:!scale-95 transition-all duration-300 ease-in-out"
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
        <span className="relative bg-clip-text text-transparent bg-gradient-to-b from-[#071827] to-[#1464ae]">
          {t("attention.title")}
          <span className="absolute -bottom-[.65104vw] lg:!bottom-0 -left-[.78125vw] lg:!-left-[13px] right-0 w-[calc(100%+.39062vw)] lg:!w-[calc(100%+26px)] h-[1px] bg-[#7a98c9] before:absolute before:-top-[6px] before:-left-[13px] before:w-[13px] before:h-[13px] before:bg-[url(/wp-content/themes/images/common/icon_kira.svg)] before:bg-center before:bg-contain before:bg-no-repeat after:absolute after:-top-[6px] after:-right-[13px] after:w-[13px] after:h-[13px] after:bg-[url(/wp-content/themes/images/common/icon_kira.svg)] after:bg-center after:bg-contain after:bg-no-repeat" />
        </span>
      </h2>
      <div className="relative z-10 pt-[12.5vw] px-[9.11458vw] pb-[7.8125vw] lg:!pt-[72px] lg:!px-0 lg:!pb-[44px] -mt-[4.94792vw] lg:!-mt-[30px] bg-[#eef7ff] before:hidden before:lg:!block before:absolute before:top-0 before:right-[20px] before:w-[8px] before:h-full before:bg-white after:hidden after:lg:!block after:absolute after:top-0 after:left-[20px] after:w-[8px] after:h-full after:bg-white">
        <ul className="w-full lg:!w-[clamp(100px,84%,860px)] mx-auto">
          {listItems.map((item, index) => {
            return (
              <li
                key={index}
                className="relative flex items-center font-medium text-[3.125vw] lg:!text-base text-[#2c3d4e] leading-[1.5] lg:!leading-[2] tracking-[.04rem] pl-[5.20833vw] lg:!pl-[28px]"
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
