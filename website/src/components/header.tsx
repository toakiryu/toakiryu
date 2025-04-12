import React from "react";

import Link from "./custom/link";
import { ColorModeToggle } from "./ui/color-mode-toggle.tsx";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full h-14 p-0 bg-background/60 backdrop-blur-sm">
      <div className="flex justify-between items-center container max-w-5xl mx-auto p-2">
        <Link
          title="brand-logo"
          className="relative text-black dark:text-white mr-6 flex items-center space-x-2"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-auto"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1={12} x2={20} y1={19} y2={19} />
          </svg>
          <span className="font-semibold text-lg">Toa Kiryu</span>
        </Link>
        <div className="flex items-center">
          <ColorModeToggle />
        </div>
      </div>
      <hr className="absolute w-full bottom-0" />
    </header>
  );
}

export default Header;
