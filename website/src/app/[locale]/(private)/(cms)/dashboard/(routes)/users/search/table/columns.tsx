"use client";

import { type User } from "@clerk/nextjs/server";
import { ColumnDef } from "@tanstack/react-table";
import { IconArrowsDownUp } from "@tabler/icons-react";
import { Button } from "@/src/components/ui/shadcn/button";
import { Checkbox } from "@/src/components/ui/shadcn/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/shadcn/avatar";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: "User",
    accessorFn: (row) => {
      const { firstName, lastName, emailAddresses, primaryEmailAddressId } =
        row;
      const primaryEmail = emailAddresses.find(
        (email: any) => email.id === primaryEmailAddressId
      )?.emailAddress;
      const email = primaryEmail ?? "N/A";

      return `${firstName} ${lastName} ${email}`;
    },
    cell: ({ row }) => {
      const {
        username,
        firstName,
        lastName,
        emailAddresses,
        primaryEmailAddressId,
        imageUrl,
      } = row.original;
      const primaryEmail = emailAddresses.find(
        (email: any) => email.id === primaryEmailAddressId
      )?.emailAddress;

      const email = primaryEmail ?? "N/A";

      return (
        <div className="flex items-center">
          <Avatar className="mr-1">
            <AvatarImage src={imageUrl} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>
              {firstName} {lastName}
            </span>
            <span className="text-foreground/80">{email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "Last sign In",
    header: "Last sign In",
    accessorFn: (row) => {
      const { lastSignInAt } = row;
      if (lastSignInAt) {
        const date = new Date(lastSignInAt);
        return date.toLocaleString("ja-JP");
      } else {
        return "N/A";
      }
    },
    cell: ({ row }) => {
      const { lastSignInAt } = row.original;
      if (lastSignInAt) {
        const date = new Date(lastSignInAt);
        return date.toLocaleString("ja-JP");
      } else {
        return "N/A";
      }
    },
  },
  {
    accessorKey: "created at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <IconArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) => {
      const { createdAt } = row;
      if (createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleString("ja-JP");
      } else {
        return "N/A";
      }
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const date = new Date(createdAt);
      return date.toLocaleString("ja-JP");
    },
  },
];
