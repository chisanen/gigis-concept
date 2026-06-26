import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";
import { serverFunction } from "./admin/[[...segments]]/serverFunction";
import React from "react";

import "@payloadcms/next/css";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function PayloadRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return RootLayout({ children, config, importMap, serverFunction });
}
