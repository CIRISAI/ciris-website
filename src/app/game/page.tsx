import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import GameShell from "./components/GameShell";
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

          <GameShell />
        </div>
      </main>
      <Footer />
    </>
  );
}
