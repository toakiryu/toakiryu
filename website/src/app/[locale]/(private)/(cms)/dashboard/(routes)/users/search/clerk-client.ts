"use server";

import { clerkClient, User } from "@clerk/nextjs/server";
import { PaginatedResourceResponse } from "./type";

export async function getClerkClientUsersList(): Promise<
  PaginatedResourceResponse<User[]>
> {
  const client = await clerkClient();
  return JSON.parse(JSON.stringify(await client.users.getUserList()));
}
