"use client";

import React from "react";
import { PaperContainer } from "@/src/components/custom/paper-container";
import {
  isAnimateArea,
  StackedScrollReveal,
} from "@/src/components/custom/scroll-reveal-stack";
import PageHomeHeadContent from "./(page)/head-content";
import PageHomeNewsContent from "./(page)/news-content";
import PageHomeCertificationsContent from "./(page)/certifications-content";
import PageHomeWorksContent from "./(page)/works-content";
import PageHomeTechStackContent from "./(page)/tech-stack";
import PageHomeTimeLineContent from "./(page)/timeline-content";
import PageHomeContactFormContent from "./(page)/contact-form";

export default function PageHomeClient() {
  const [currentPageIndex, setCurrentPageIndex] = React.useState<number>(0);

  return (
    <>
      <StackedScrollReveal onVisibleIndexChange={setCurrentPageIndex}>
        <PaperContainer>
          <PageHomeHeadContent
            isAnimateArea={isAnimateArea(0, currentPageIndex, 1)}
          />
        </PaperContainer>
        <PaperContainer>
          <PageHomeNewsContent />
        </PaperContainer>
        <PaperContainer rotate={1}>
          <PageHomeCertificationsContent />
        </PaperContainer>
        <PaperContainer rotate={-1}>
          <PageHomeWorksContent
            isAnimateArea={isAnimateArea(3, currentPageIndex, 1)}
          />
        </PaperContainer>
        <PaperContainer rotate={1}>
          <PageHomeTechStackContent />
        </PaperContainer>
        <PaperContainer>
          <PageHomeTimeLineContent />
        </PaperContainer>
      </StackedScrollReveal>
      <PaperContainer>
        <PageHomeContactFormContent />
      </PaperContainer>
    </>
  );
}
