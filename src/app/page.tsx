"use client";
import React from "react";
import MainControls from "@/Components/MainControls/MainControls";
import {NextUIProvider} from "@nextui-org/react";
export default function Home() {
  return (
<NextUIProvider>

      <main className="dark text-foreground bg-background">

      <div className="flex items-center justify-center min-h-screen">


      <MainControls />
    </div>
      </main>
</NextUIProvider>

  );
}
