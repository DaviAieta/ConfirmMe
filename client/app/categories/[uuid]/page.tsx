"use client";

import { CategoryDetails } from "@/components/CategoryDetail";
import { NavBar } from "../../../components/Navbar";

export default function Page({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  return (
    <NavBar>
      <CategoryDetails params={params} />
    </NavBar>
  );
}
