"use client";

import React from "react";
import { User } from "@clerk/nextjs/server";

import TableRender from "./table/table-render";
import { SelectUserContents } from "./select-user/base";

export default function ClientRender() {
  const [selectUser, setSelectUser] = React.useState<null | User>(null);

  return (
    <div className="container max-w-5xl mx-auto py-4">
      {selectUser ? (
        <SelectUserContents
          selectUser={selectUser}
          setSelectUser={setSelectUser}
        />
      ) : (
        <TableRender setSelectUser={setSelectUser} />
      )}
    </div>
  );
}
