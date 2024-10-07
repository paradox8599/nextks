import { User } from "@prisma/client";
import { Session } from "../auth";

export function allowLoggedIn({ session }: { session?: Session }) {
  return !!session?.itemId;
}

export function allowSelf({
  item,
  session,
}: {
  item: User;
  session?: Session;
}) {
  return session?.itemId === item.id;
}
