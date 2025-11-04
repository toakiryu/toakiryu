// Type definitions for translation JSON files
// This prevents TypeScript errors when .translations directory doesn't exist yet

declare module "../../.translations/*.json" {
  const value: Record<string, any>;
  export default value;
}
