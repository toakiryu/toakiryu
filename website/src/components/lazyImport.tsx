import React, { ComponentType, lazy } from "react";

// 共通のエラーハンドリングと遅延読み込み関数
export const lazyImport = (
  factory: () => Promise<{ default: ComponentType<any> }>
) =>
  lazy(async () => {
    try {
      return await factory();
    } catch (e) {
      console.error(e)
      return {
        default: () => (
          <>
            <h1>Error occurred</h1>
            <button onClick={() => window.location.reload()}>Reload</button>
          </>
        ),
      };
    }
  });
