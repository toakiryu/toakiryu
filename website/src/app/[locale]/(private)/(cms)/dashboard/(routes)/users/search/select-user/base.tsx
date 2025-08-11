"use client";

import { User } from "@clerk/nextjs/server";
import { IconArrowLeft } from "@tabler/icons-react";
import { useFormatter, useLocale } from "next-intl";
import { clerkPublicEnv } from "@/src/lib/clerk/env-public";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/shadcn/avatar";
import { Button } from "@/src/components/ui/shadcn/button";
import { LinkButton } from "@/src/components/custom/link-button";
import { UserInfoContentTab } from "./tab";

export function SelectUserContents({
  selectUser,
  setSelectUser,
}: {
  selectUser: User | null;
  setSelectUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  if (!selectUser) return null;
  const locale = useLocale();
  const format = useFormatter();
  const user = selectUser;
  return (
    <div className="relative w-full">
      <button
        className="flex items-center text-foreground opacity-70 cursor-pointer hover:opacity-100 transition-all duration-100 ease-linear"
        onClick={() => {
          setSelectUser(null);
        }}
      >
        <IconArrowLeft className="w-3 mr-1" />
        <span className="text-xs">Users</span>
      </button>
      <div className="flex flex-wrap justify-between items-center mt-3">
        <div className="flex items-center">
          <div>
            <Avatar className="w-[45px] h-auto mr-3">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="flex items-center gap-3 text-3xl">
              {user.firstName}
              {user.lastName}
            </h1>
            <div className="text-xs">
              <span>最終アクティブ：</span>
              <span>
                {user.lastActiveAt
                  ? format.dateTime(new Date(user.lastActiveAt), {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="flex flex-wrap items-center gap-3">
            <Button>JSONを表示</Button>
            <LinkButton
              href={`https://dashboard.clerk.com/apps/${clerkPublicEnv.APP_ID}/instances/${clerkPublicEnv.INSTANCE_ID}/users/${user.id}`}
              variant="secondary"
            >
              Clerkで表示
            </LinkButton>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <UserInfoContentTab user={user} />
      </div>
    </div>
  );
}
