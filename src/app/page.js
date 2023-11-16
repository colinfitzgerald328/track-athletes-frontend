"use client";
import Image from "next/image";
import styles from "./page.module.css";
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
