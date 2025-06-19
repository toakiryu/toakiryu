"use client";

import Error from "next/error";

export default function NotFoundPage() {
  return <Error  statusCode={404}/>;
}
