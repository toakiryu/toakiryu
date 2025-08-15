"use client";

import React from "react";
import { IconBuildings } from "@tabler/icons-react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function AdminHeader() {
  return (
    <header className="sticky flex items-center w-full h-auto px-1 py-2 border-b bg-background/50 backdrop-blur-2xl">
      <OrganizationSwitcher>
        {/* You can pass the content as a component */}
        <OrganizationSwitcher.OrganizationProfilePage
          label="Custom Page"
          url="custom"
          labelIcon={<IconBuildings />}
        >
          <div>Hello</div>
        </OrganizationSwitcher.OrganizationProfilePage>

        {/* You can also pass the content as direct children */}
        <OrganizationSwitcher.OrganizationProfilePage
          label="Terms"
          labelIcon={<IconBuildings />}
          url="terms"
        >
          <div>
            <h1>Custom Terms Page</h1>
            <p>This is the content of the custom terms page.</p>
          </div>
        </OrganizationSwitcher.OrganizationProfilePage>
      </OrganizationSwitcher>
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
