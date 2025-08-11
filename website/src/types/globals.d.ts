export {};

// Create a type for the roles
export type Roles = "admin" | "moderator" | "editor" | "viewer";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
