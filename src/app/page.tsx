import Blog from "@/components/Blog";
import Classes from "@/components/Classes";
import Closing from "@/components/Closing";
import Clubs from "@/components/Clubs";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Perks from "@/components/Perks";
import Pilates from "@/components/Pilates";
import ScrollProgress from "@/components/ScrollProgress";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StackFrame from "@/components/StackFrame";
import Stats from "@/components/Stats";
import Stories from "@/components/Stories";
import ThemeMorph from "@/components/ThemeMorph";
import Ticker from "@/components/Ticker";
import Training from "@/components/Training";

export default function Home() {
  return (
    <>
      <Intro />
      <Cursor />
      <ScrollProgress />
      <ThemeMorph />
      <SiteHeader />

      {/*
        Each band is a StackFrame: it overlaps the one above with a rounded top
        and shrinks as it exits, so the page reads as a stack of cards. The z
        values must increase down the page — a later band has to sit above its
        predecessor for the overlap to work.
      */}
      <main className="relative">
        <Hero />

        <StackFrame z={1} className="stack-round -mt-8">
          <Stats />
          <Perks />
        </StackFrame>

        <StackFrame z={2} className="stack-round -mt-8">
          <Ticker />
          <Clubs />
        </StackFrame>

        <StackFrame z={3} className="stack-round -mt-8">
          <Training />
        </StackFrame>

        <StackFrame z={4} className="stack-round -mt-8">
          <Pilates />
        </StackFrame>

        <StackFrame z={5} className="stack-round -mt-8">
          <Classes />
        </StackFrame>

        <StackFrame z={6} className="stack-round -mt-8">
          <Stories />
        </StackFrame>

        <StackFrame z={7} className="stack-round -mt-8">
          <Blog />
          <Closing />
        </StackFrame>
      </main>

      <SiteFooter />
    </>
  );
}
