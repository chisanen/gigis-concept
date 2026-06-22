/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import { importMap } from "../importMap";
import { serverFunction } from "./serverFunction";

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) =>
  RootLayout({ children, config, importMap, serverFunction });

export default Layout;
