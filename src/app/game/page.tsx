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
            <p className="game-note-rule">
              <span className="kbd kbd-small">PRINTED SOURCES</span> Some kids
              cite school newspapers, club newsletters, class announcements,
              or the colony encyclopedia. The KID is honest; the PUBLISHED
              SOURCE may have drifted. All sources are wrong 20 to 50 percent
              of the time on average. None is reliable enough to trust
              blindly, none unreliable enough to silence. Important details
              live in the noisier sources too.
            </p>
            <p className="game-note-rule">
              <span className="kbd kbd-small">WEAK POOL</span> If you trust
              only one gossipy paper and a clutch of year-1s who were doing
              hydroponics during the comms-tower incident, the game tells you
              so. Build out your roster. Pin a kid whose attention domain
              overlaps the case.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
