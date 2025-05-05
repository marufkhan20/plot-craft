"use client";
import HomePage from "@/components/HomePage";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("session", session);
  return (
    <main className="flex-grow">
      <HomePage />
    </main>
  );
}
