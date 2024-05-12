"use client";
// import { NextRequest } from "next/server";

export function getAuthToken() {
  if (typeof window !== "undefined") {
    // On the client-side
    return localStorage.getItem("token");
  }

  //   else if (req) {
  //     // On the server-side
  //     const authHeader = req.headers.get("Authorization");
  //     if (authHeader) {
  //       const token = authHeader.split(" ")[1];
  //       return token;
  //     }
  //     return null;
  //   }
  return null;
}
