"use client";

import React from "react";
import { User } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./_actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/shadcn/table";
import { Badge } from "@/src/components/ui/shadcn/badge";
import { CodeBlock } from "@/src/components/custom/code-block";
import { isAnArray } from "@/src/utils/typecheck";

export default function Client({ user }: { user: User }) {
  return (
    <div key={user.id} className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Key</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">id</TableCell>
            <TableCell className="text-right">{user.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">firstName</TableCell>
            <TableCell className="text-right">{user.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">lastName</TableCell>
            <TableCell className="text-right">{user.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">email</TableCell>
            <TableCell className="text-right">
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress!
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">role</TableCell>
            <TableCell className="text-right">
              {isAnArray(user.publicMetadata.roles) &&
                user.publicMetadata.roles?.map((role, index) => {
                  return (
                    <Badge key={index} variant="outline">
                      {String(role)}
                    </Badge>
                  );
                })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div>
        
      </div>

      <form action={setRole}>
        <input type="hidden" value={user.id} name="id" />
        <input type="hidden" value="admin" name="role" />
        <button type="submit">Make Admin</button>
      </form>

      <form action={setRole}>
        <input type="hidden" value={user.id} name="id" />
        <input type="hidden" value="moderator" name="role" />
        <button type="submit">Make Moderator</button>
      </form>

      <form action={removeRole}>
        <input type="hidden" value={user.id} name="id" />
        <button type="submit">Remove Role</button>
      </form>

      <CodeBlock language="json" code={JSON.stringify(user, null, 2)} />
    </div>
  );
}
