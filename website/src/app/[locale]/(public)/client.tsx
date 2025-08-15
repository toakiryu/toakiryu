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
        <PaperContainer id="head">
          <PageHomeHeadContent
            isAnimateArea={isAnimateArea(0, currentPageIndex, 1)}
          />
        </PaperContainer>
        <PaperContainer id="news">
          <PageHomeNewsContent />
        </PaperContainer>
        <PaperContainer id="certifications" rotate={1}>
          <PageHomeCertificationsContent />
        </PaperContainer>
        <PaperContainer id="works" rotate={-1}>
          <PageHomeWorksContent
            isAnimateArea={isAnimateArea(3, currentPageIndex, 1)}
          />
        </PaperContainer>
        <PaperContainer id="tech-stack" rotate={1}>
          <PageHomeTechStackContent />
        </PaperContainer>
        <PaperContainer id="timeline">
          <PageHomeTimeLineContent />
        </PaperContainer>
      </StackedScrollReveal>
      <PaperContainer id="contact-form">
        <PageHomeContactFormContent />
      </PaperContainer>
    </>
  );
}
