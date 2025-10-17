import Hero from "@/components/pages/Home/Hero";
import List from "@/components/pages/Home/List";

export default function HomePage() {
  return(
      <>
        <Hero />
        <List type="Trends" />
        <List type="Movies" />
        <List type="Series" />
      </>
  )
}
