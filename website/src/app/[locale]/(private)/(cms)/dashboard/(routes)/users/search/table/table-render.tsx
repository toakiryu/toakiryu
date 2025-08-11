"use client";

import React, { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { getClerkClientUsersList } from "../clerk-client";
import { PaginatedResourceResponse } from "../type";
import { DataTable, DataTableSkeleton } from "./data-table";
import { columns } from "./columns";

export default function TableRender({
  setSelectUser,
}: {
  setSelectUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  const [usersList, setUsersList] = useState<null | PaginatedResourceResponse<
    User[]
  >>(null);

  const getUsersList = async () => {
    const result = await getClerkClientUsersList();
    setUsersList(result);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  if (!usersList) {
    return <DataTableSkeleton />;
  }

  return (
    <DataTable
      columns={columns}
      data={usersList.data}
      setSelectUser={setSelectUser}
    />
  );
}
