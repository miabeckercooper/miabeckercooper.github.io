import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Leadership } from "./sections/Leadership";
import { Method } from "./sections/Method";
import { Models } from "./sections/models/Models";
import { Projects } from "./sections/Projects";
import { Research } from "./sections/Research";
import { Ticker } from "./sections/Ticker";
import { Timeline } from "./sections/Timeline";
import { ViewerHost } from "./sections/ViewerHost";
import { Header } from "./ui/Header";

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Research />
        <Timeline />
        <Method />
        <Models />
        <Projects />
        <Leadership />
        <About />
      </main>
      <Contact />
      <ViewerHost />
    </>
  );
}
