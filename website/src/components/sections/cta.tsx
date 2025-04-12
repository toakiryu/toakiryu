import React from "react";

import Link from "../custom/link";

function SectionCta() {
  return (
    <section id="cta">
      <div className="relative container max-w-5xl px-4">
        <div className="border overflow-hidden relative text-center py-16 mx-auto">
          <p className="max-w-3xl text-foreground mb-6 text-balance mx-auto font-medium text-3xl">
            是非ポートフォリオをご覧ください。
          </p>
          <div className="flex justify-center">
            <Link
              href="https://foriio.com/toakiryu"
              className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex items-center gap-2"
            >
              サイトを訪れる
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionCta;
