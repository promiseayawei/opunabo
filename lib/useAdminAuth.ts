"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminUser } from "@/lib/api";
import { getAdminToken, getAdminUser } from "@/lib/adminSession";

export function useAdminAuth() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    const foundToken = getAdminToken();
    const foundAdmin = getAdminUser();

    if (!foundToken) {
      router.replace("/admin/login");
      return;
    }

    setToken(foundToken);
    setAdmin(foundAdmin);
    setReady(true);
  }, [router]);

  return useMemo(
    () => ({
      ready,
      token,
      admin,
    }),
    [ready, token, admin]
  );
}
