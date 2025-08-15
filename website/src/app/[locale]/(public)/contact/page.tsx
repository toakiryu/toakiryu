import React from "react";
import PageHomeContactFormContent from "../(page)/contact-form";
import { PaperContainer } from "@/src/components/custom/paper-container";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <PaperContainer>
        <PageHomeContactFormContent />
      </PaperContainer>
    </div>
  );
}
