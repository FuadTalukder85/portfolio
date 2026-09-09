import React from "react";
import Banner from "@/components/Banner";
import About from "@/components/About";
import Project from "@/components/Project";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#0a0a0c]">
      <Banner />
      <About />
      <Project />
    </main>
  );
}
