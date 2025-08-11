"use server";

import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { checkRole } from "@/src/utils/roles";
import { SearchUsers } from "./search";
import Client from "./client";

export default async function DashboardUsersSearchPage(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  await client.users.getCount()

  const users = query ? (await client.users.getUserList({ query })).data : [];

  return (
    <div className="relative w-full">
      <SearchUsers />

      {users.map((user, index) => {
        const plainUser = JSON.parse(JSON.stringify(user));
        return <Client key={index} user={plainUser} />;
      })}
    </div>
  );
}