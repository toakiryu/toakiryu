"use client";

import {
  hasRole,
  hasAnyRole,
  hasPermission,
  ROLES,
  type UserMetadata,
  type Role,
} from "@/src/lib/clerk/role/client";
import { useContext } from "react";
import { ServerUserContext } from "@/src/provider/clerk/user/client-wrapper";

interface RoleBasedComponentProps {
  children: React.ReactNode;
  requiredRole?: Role;
  requiredRoles?: Role[]; // 型安全な配列
  requireAllRoles?: boolean; // true: 全て必要, false: いずれかが必要
  requiredPermission?: string;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
}

export default function RoleBasedComponent({
  children,
  requiredRole,
  requiredRoles,
  requireAllRoles = false,
  requiredPermission,
  fallback = <div>Access denied</div>,
  loading = <div>Loading...</div>,
}: RoleBasedComponentProps) {
  const { user, isLoaded } = useContext(ServerUserContext);

  if (!isLoaded) return loading;
  if (!user) return fallback;

  const metadata = user.publicMetadata as UserMetadata;
  const userRoles = metadata.roles || [];

  // 単一ロールチェック
  if (requiredRole && !hasRole(userRoles, requiredRole)) {
    return <>{fallback}</>;
  }

  // 複数ロールチェック
  if (requiredRoles) {
    if (
      requireAllRoles &&
      !requiredRoles.every((role) => hasRole(userRoles, role))
    ) {
      return <>{fallback}</>;
    }
    if (!requireAllRoles && !hasAnyRole(userRoles, requiredRoles)) {
      return <>{fallback}</>;
    }
  }

  // 権限チェック
  if (
    requiredPermission &&
    !hasPermission(metadata.permissions, requiredPermission)
  ) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// 使用例の更新
export function AdminPanel() {
  return (
    <RoleBasedComponent requiredRole={ROLES.ADMIN}>
      <div>
        <h2>管理者パネル</h2>
        <button>ユーザー管理</button>
      </div>
    </RoleBasedComponent>
  );
}

// 複数ロールの例
export function AdminOrModeratorPanel() {
  return (
    <RoleBasedComponent
      requiredRoles={[ROLES.ADMIN, ROLES.MODERATOR]}
      requireAllRoles={false} // どちらか一つでOK
    >
      <div>
        <h2>管理・モデレーターパネル</h2>
        <button>コンテンツ管理</button>
      </div>
    </RoleBasedComponent>
  );
}

// 複数ロール必須の例
export function SuperAdminPanel() {
  return (
    <RoleBasedComponent
      requiredRoles={[ROLES.ADMIN]}
      requireAllRoles={true} // 両方必要
    >
      <div>
        <h2>スーパー管理者パネル</h2>
        <button>システム設定</button>
      </div>
    </RoleBasedComponent>
  );
}
