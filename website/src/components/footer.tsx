import React from "react";

import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";

import Link from "./custom/link";

function Footer() {
  return (
    <footer className="flex flex-col gap-y-5 rounded-lg container max-w-5xl px-7 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
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
            className="h-5 w-5"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1={12} x2={20} y1={19} y2={19} />
          </svg>
          <h2 className="text-lg font-bold text-foreground">Toa Kiryu</h2>
        </div>
        <div className="flex gap-x-2">
          <Link
            href="https://l.toakiryu.com/github"
            className="flex h-5 w-5 items-center justify-center text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
          >
            <IconBrandGithub size={23} />
          </Link>
          <Link
            href="https://l.toakiryu.com/x"
            className="flex h-5 w-5 items-center justify-center text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
          >
            <IconBrandTwitter size={23} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul className="flex flex-col gap-x-5 gap-y-2 text-muted-foreground md:flex-row md:items-center">
          <li className="text-[15px]/normal font-medium text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4">
            <Link
              href="/contact"
              target="_blank"
              className="text-muted-foreground"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex items-center justify-between text-sm font-medium tracking-tight text-muted-foreground">
          <p>All rights reserved.</p>
        </div>
      </div>
      <div className="flex items-center justify-center" />
    </footer>
  );
}

export default Footer;
