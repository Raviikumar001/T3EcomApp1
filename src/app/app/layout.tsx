"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <div className="flex h-screen items-center justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200"></div>
            <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-blue-500"></div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        {/* Your layout content goes here */}

        {children}
      </div>
    );
  }
}
