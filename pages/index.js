import RootLayout from "@/components/wrapper";
import Hero from "@/components/Hero";
import CategorySection from "@/components/Category";
import ReportSection from "@/components/ReportSection";
import { useState } from "react";

export default function Home() {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <RootLayout>
      <Hero />
      <CategorySection />
      <ReportSection />
    </RootLayout>
  );
}
