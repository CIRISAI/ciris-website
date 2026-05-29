import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import SchoolMap from "./components/SchoolMap";
import "./game.css";

export default function GamePage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="game-shell">
        <div className="game-frame">
          <header className="game-title-bar">
            <div className="kbd kbd-small">CASCADIA·REACH</div>
            <h1 className="game-title">THE CASE FILE</h1>
            <p className="game-subtitle">
              EVERYONE TELLS A DIFFERENT STORY.
              <br />
              WHO DO YOU TRUST TO FIND THE TRUTH?
            </p>
          </header>

          <SchoolMap />

          <section className="game-note">
            <div className="kbd kbd-small">v0.1 · WORKSHOP</div>
            <p>
              School layout is fixed across views. CLASS shows kids in their
              classrooms. CLUB shows them where their clubs meet. Tap a face
              to see who they are.
            </p>
            <p className="game-note-rule">
              <span className="kbd kbd-small">HOUSE RULE</span> Every kid here
              is good and honest. You never mark a kid as untrustworthy. You
              mark a specific DETAIL inside a specific story as drifted.
              Younger kids see everything but mix up names and times. Older
              kids are narrow and accurate. The truth is in the gaps between
              what each kid was paying attention to.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
