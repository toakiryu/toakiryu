"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/shadcn/tabs";
import { User } from "@clerk/nextjs/server";

export function UserInfoContentTab({ user }: { user: User | null }) {
  return (
    <Tabs defaultValue="profile" className="w-[400px]">
      <TabsList className="pb-0! bg-transparent rounded-none">
        <TabsTrigger
          value="profile"
          className="bg-transparent! border-t-0! border-x-0! border-b! rounded-none! shadow-none! data-[state=inactive]:border-secondary! data-[state=active]:border-primary!"
        >
          プロフィール
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="bg-transparent! border-t-0! border-x-0! border-b! rounded-none! shadow-none! data-[state=inactive]:border-secondary! data-[state=active]:border-primary!"
        >
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">プロフィール</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
