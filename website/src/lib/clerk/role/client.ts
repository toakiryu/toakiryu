export type Role = "admin" | "moderator" | "editor" | "user";

export interface UserMetadata {
  roles?: Role[];
  permissions?: string[];
  organizationId?: string;
}

export interface ClerkJWT {
  sub: string;
  metadata: UserMetadata;
  user_id: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}
export const ROLES = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  EDITOR: "editor",
  USER: "user",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

export const PERMISSIONS = {
  READ_ALL_POSTS: "read:all_posts",
  WRITE_POST: "write:post",
  DELETE_POST: "delete:post",
  MANAGE_USERS: "manage:users",
  MODERATE_CONTENT: "moderate:content",
} as const;

// ロールチェック関数（配列対応）
export function hasRole(userRoles: Role[] = [], requiredRole: Role): boolean {
  return userRoles.includes(requiredRole);
}

// 複数ロールのいずれかを持っているかチェック
export function hasAnyRole(
  userRoles: Role[] = [],
  requiredRoles: Role[]
): boolean {
  return requiredRoles.some((role) => userRoles.includes(role));
}

// 全てのロールを持っているかチェック
export function hasAllRoles(
  userRoles: Role[] = [],
  requiredRoles: Role[]
): boolean {
  return requiredRoles.every((role) => userRoles.includes(role));
}

// 階層的ロールチェック（従来の機能も残す）
export function hasRoleLevel(
  userRoles: Role[] = [],
  requiredRole: Role
): boolean {
  const roleHierarchy: Role[] = [
    ROLES.USER,
    ROLES.EDITOR,
    ROLES.MODERATOR,
    ROLES.ADMIN,
  ];
  const userHighestLevel = Math.max(
    ...userRoles
      .map((role) => roleHierarchy.indexOf(role))
      .filter((level) => level !== -1)
  );
  const requiredLevel = roleHierarchy.indexOf(requiredRole);

  return userHighestLevel >= requiredLevel;
}

// 権限チェック関数
export function hasPermission(
  userPermissions: string[] = [],
  requiredPermission: string
): boolean {
  return userPermissions.includes(requiredPermission);
}
