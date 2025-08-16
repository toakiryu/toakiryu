"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { Role, UserMetadata } from "./client";

// ユーザーにロールを設定（複数可能）
export async function setUserRoles(
  userId: string,
  roles: Role[],
  permissions: string[] = []
) {
  const client = await clerkClient();

  await client.users.updateUser(userId, {
    publicMetadata: {
      roles,
      permissions,
    },
  });
}

// 単一ロール追加
export async function addUserRole(userId: string, role: Role) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const currentRoles = (user.publicMetadata as UserMetadata)?.roles || [];

  if (!currentRoles.includes(role)) {
    await setUserRoles(userId, [...currentRoles, role]);
  }
}

// ロール削除
export async function removeUserRole(userId: string, role: Role) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const currentRoles = (user.publicMetadata as UserMetadata)?.roles || [];

  await setUserRoles(
    userId,
    currentRoles.filter((r) => r !== role)
  );
}

// 現在のユーザーのロールを取得
export async function getCurrentUserRoles(): Promise<UserMetadata | null> {
  const user = await currentUser();
  if (!user) return null;

  return user.publicMetadata as UserMetadata;
}