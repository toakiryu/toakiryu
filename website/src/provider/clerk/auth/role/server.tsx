"use server";

import { currentUser } from "@clerk/nextjs/server";
import { type Role, roles } from "./shared";

// ロール名を返す
export async function getCurrentUserRole(): Promise<Role | null> {
  const user = await currentUser();
  const role = user?.privateMetadata?.role;
  return role && typeof role === "string" && role in roles
    ? (role as Role)
    : null;
}

// 現在のユーザーが指定されたすべての権限を持つかどうかを判定する
export async function hasPrivilege(required: string[]): Promise<boolean> {
  const user = await currentUser();
  const roleValue = user?.privateMetadata?.role;

  // role は string または string[] として受け取る
  const rolesArray: string[] = Array.isArray(roleValue)
    ? roleValue
    : typeof roleValue === "string"
    ? [roleValue]
    : [];

  if (rolesArray.length === 0) {
    return false;
  }

  // すべてのロールから privilege を集約し、string[] に変換
  const privileges = rolesArray
    .flatMap((r) => {
      if ((Object.keys(roles) as string[]).includes(r)) {
        return roles[r as keyof typeof roles].privilege;
      }
      return [];
    })
    .slice();

  // "all" があればすべて許可
  if (privileges.includes("all")) {
    return true;
  }

  // すべての required を満たしているか
  return required.every((r) => privileges.includes(r));
}
