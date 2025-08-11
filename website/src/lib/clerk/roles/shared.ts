export const roles: Record<string, { privilege: string[] }> = {
  admin: { privilege: ["all"] },
  editor: { privilege: ["editor", "viewer"] },
  viewer: { privilege: ["viewer"] },
} as const;

export type Role = keyof typeof roles;