import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

import { lazyImport } from "@/components/lazyImport";
const ContactPageContainer = lazyImport(() => import("./contact"))

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale();
  const t = await getTranslations({
    locale,
    namespace: "pages.contact.metadata",
  });
  return {
    title: t("title"),
  };
}

export default function ContactPage() {
  return (
    <>
<ContactPageContainer/>
    </>
  );
}
