"use client";

import React from "react";
import { User } from "@clerk/nextjs/server";
import { Row } from "@tanstack/react-table";
import { Button } from "@/src/components/ui/shadcn/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/shadcn/dialog";
import { CodeBlock } from "@/src/components/custom/code-block";

export default function UserInfoCard({
  children,
  row,
}: {
  children: React.ReactNode;
  row: Row<any>;
}) {
  const user: User = row.original;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[90%] max-h-[90%] overflow-hidden">
        <div className="relative flex flex-col w-full h-full">
          <div className="flex-1 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            {/* <div className="w-full h-full overflow-auto">
          <CodeBlock language="json" code={JSON.stringify(user, null, 2)} />
        </div> */}
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
            <h1 className="text-5xl">Hello World</h1>
          </div>
          {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
