"use client";
import MainComponent from "./components";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <main>
        <MainComponent />
      </main>
    </NextUIProvider>
  );
}
