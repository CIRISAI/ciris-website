import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import CaseBanner from "./components/CaseBanner";
import SchoolMap from "./components/SchoolMap";
import SourcesGallery from "./components/SourcesGallery";
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

          <CaseBanner />

          <details className="how-to-play">
            <summary>
              <span className="kbd kbd-small">?</span> HOW TO PLAY
            </summary>
            <div className="how-to-play-body">
              <p className="game-note-rule">
                <span className="kbd kbd-small">HOUSE RULE</span> Every kid
                here is good and honest. You never mark a kid as
                untrustworthy. You mark a specific DETAIL inside a specific
                story as drifted. Younger kids see everything but mix up
                names and times. Older kids are narrow and accurate. The
                truth is in the gaps between what each kid was paying
                attention to.
              </p>
              <p className="game-note-rule">
                <span className="kbd kbd-small">PRINTED SOURCES</span> Some
                kids cite school newspapers, club newsletters, class
                announcements, or the colony encyclopedia. The KID is
                honest; the PUBLISHED SOURCE may have drifted. All sources
                are wrong 20 to 50 percent of the time. None is reliable
                enough to trust blindly, none unreliable enough to silence.
                Important details live in the noisier sources too.
              </p>
              <p className="game-note-rule">
                <span className="kbd kbd-small">WEAK POOL</span> If you
                trust only one gossipy paper and a clutch of year-1s who
                were doing hydroponics during the comms-tower incident, the
                game tells you so. Build out your roster. Pin a kid whose
                attention domain overlaps the case.
              </p>
            </div>
          </details>

          <h2 className="section-h">THE CAST</h2>
          <SchoolMap />

          <h2 className="section-h">THE PRINTED SOURCES</h2>
          <SourcesGallery />
        </div>
      </main>
      <Footer />
    </>
  );
}
