"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
}: {
  error: Error & { digest?: string };
}) {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-16rem)] rounded-lg shadow-lg">
        <h2 className="text-2xl">Oops! We couldn&apos;t find the page you&apos;re looking for.</h2>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </>
  );
}
