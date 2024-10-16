import { getContextWithSession } from "@/keystone/context";
import Link from "next/link";
import React from "react";

export default async function HomePage() {
  const ctx = await getContextWithSession();
  const c = await ctx.db.User.count();

  return (
    <main>
      <h1>Home /</h1>
      <h3>Session:</h3>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(ctx.session, null, 2)}
      </pre>
      <p>Reading users count that only logged in users can see: {c}</p>
      <Link href="/admin">Login to Admin</Link>
    </main>
  );
}
