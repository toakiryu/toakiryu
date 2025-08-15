"use client";

import { useContext } from "react";
import { ServerUserContext } from "../../../provider/clerk/user/client-wrapper";
import { roles } from "./shared";

// ロール名を返す
export function GetCurrentUserRoles(): string[] {
  const user = useContext(ServerUserContext);
  const _roles = user?.privateMetadata?.roles;

  // role は string または string[] として受け取る
  const roles: string[] = Array.isArray(_roles)
    ? _roles
    : typeof _roles === "string"
    ? [_roles]
    : [];

  if (roles.length === 0) {
    return [];
  }

  return roles;
}

// 現在のユーザーが指定されたすべての権限を持つかどうかを判定する
export function HasPrivilege(required: string[]): boolean {
  const user = useContext(ServerUserContext);

  console.debug("user:", user);

  const rolesArray = GetCurrentUserRoles();

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
