import GoldenGlobe from "@/components/pages/Home/GoldenGlobe";
import Hero from "@/components/pages/Home/Hero";
import List from "@/components/pages/Home/List";
// import Subscribe from "@/components/pages/Home/Collection";

export default function HomePage() {
  return(
      <>
        <Hero />
        <List type="Trends" />
        <List type="Movies" />
        <GoldenGlobe />
        <List type="Series" />
        {/* <Subscribe /> */}
      </>
  )
}
