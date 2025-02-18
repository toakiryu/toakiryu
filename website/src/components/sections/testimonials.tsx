"use client";

import React, { useState } from "react";

import Image from "../custom/image";

import { FlickeringGrid } from "../magicui/flickering-grid";

export type testimonialType = {
  name: string;
  role: string;
  description: string;
  avatar?: string;
};

function SectionTestimonials({
  testimonials,
}: {
  testimonials: testimonialType[];
}) {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section id="testimonials">
      <div className="relative container max-w-5xl px-4">
        <div className="z-0 text-center relative mx-auto border-x border-t overflow-hidden p-2 py-8 md:p-12">
          <h2 className="text-sm text-muted-foreground text-balance font-semibold tracking-tight uppercase">
            Testimonials
          </h2>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full bg-gradient-to-t from-background dark:from-background -z-10 from-50%" />
          <FlickeringGrid
            className="w-full h-full -z-20 absolute inset-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        </div>
        <div className="border-t">
          <div
            className="bg-grid-1 sm:bg-grid-2 lg:bg-grid-3 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px)] columns-1 sm:columns-2 lg:columns-3 gap-0 lg:bg-grid-3 border-r pb-24 sm:bg-grid-2 relative bg-grid-1"
            style={{ "--tw-bg-size": "100% 100%" } as React.CSSProperties}
          >
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-2/6 w-[calc(100%-2px)] overflow-hidden bg-gradient-to-t from-background to-transparent" />
            {visibleCount < testimonials.length && (
              <button
                className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground py-2 absolute bottom-12 left-1/2 -translate-x-1/2 border h-10 w-fit px-5 flex items-center justify-center z-10"
                onClick={handleSeeMore}
              >
                See more
              </button>
            )}
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`flex-col border-b break-inside-avoid border-l transition-colors hover:bg-secondary/20 opacity-100 will-change-auto ${
                  index >= visibleCount ? "hidden" : "flex"
                }`}
              >
                <div className="px-4 py-5 sm:p-6 flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={
                        testimonial.avatar ||
                        "/wp-content/uploads/user-avatar.png"
                      }
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="border"
                      rounded="999px"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-foreground">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="truncate">{testimonial.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionTestimonials;
