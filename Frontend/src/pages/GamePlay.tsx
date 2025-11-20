import { useParams, Link } from "react-router-dom";
import { useGames } from "../hooks/useGames";
import { useEffect, useState, useRef } from "react";
import Seo from "../components/Seo";

export default function GamePlay() {
  const { id } = useParams();
  const { data: games, isLoading } = useGames();
  const [game, setGame] = useState(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!isLoading && games) {
      const found = games.find((g) => String(g.Id) === String(id));
      setGame(found || null);
    }
  }, [isLoading, games, id]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        <p className="text-lg">Loading game...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        <p className="text-lg">Game not found.</p>
      </div>
    );
  }

  const externalUrl = game.GameURL;

  /** Fullscreen handler */
  const handleFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  return (
    <Seo
      title={`${game.Title} - Play Online`}
      description={`Play ${game.Title} safely on Kiddovase.`}
      canonicalUrl={`/play/${game.Id}`}
    >
      <main className="max-w-7xl mx-auto px-4 py-10">
        <Link
          to="/games"
          className="text-blue-700 underline mb-4 inline-block text-sm"
        >
          Back to games
        </Link>

        <h1 className="text-3xl font-bold mb-1">{game.Title}</h1>
        <p className="text-gray-600 mb-8">
          Play this kid-friendly browser game safely on Kiddovase.
        </p>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-3/4">
            <div className="relative rounded-2xl shadow-xl bg-white p-4 border border-gray-200">
              {/** FULLSCREEN BUTTON */}
              <button
                onClick={handleFullscreen}
                className="absolute top-3 right-3 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow hover:bg-gray-700 transition"
              >
                Fullscreen
              </button>

              {/** RESPONSIVE GAME IFRAME */}
              <iframe
                ref={iframeRef}
                src={externalUrl}
                title={game.Title ?? "Game"}
                className="w-full rounded-xl border border-gray-300"
                style={{
                  minHeight: "600px",
                  height: "65vh",
                }}
                allow="fullscreen"
              />
            </div>

            <p className="text-xs text-gray-500 mt-4 ml-1">
              Games on Kiddovase are provided by trusted partners and reviewed
              for kid-friendly content.
            </p>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-1/4">
            <Accordion title="Quick play tips">
              <p className="text-sm text-gray-700 leading-relaxed">
                Tap or click to start. Most games focus on simple controls and
                short play sessions designed for kids.
              </p>
            </Accordion>

            <Accordion title="Controls & fullscreen">
              <p className="text-sm text-gray-700 leading-relaxed">
                Use your mouse, keyboard, or touch controls depending on the
                game. You can go fullscreen using the button above.
              </p>
            </Accordion>

            <Accordion title="Devices & browsers">
              <p className="text-sm text-gray-700 leading-relaxed">
                Best played on Chrome, Safari, Firefox, or Edge. Works on
                desktop, mobile, and tablets.
              </p>
            </Accordion>

            <Accordion title="Troubleshooting">
              <p className="text-sm text-gray-700 leading-relaxed">
                If the game won’t load, refresh the page or open it in a new
                browser tab. Some games restrict embedding depending on your
                device or region.
              </p>
            </Accordion>
          </div>
        </div>
      </main>
    </Seo>
  );
}

/** Styled accordion matching your theme */
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 border border-gray-200 rounded-xl bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 font-medium flex justify-between items-center"
      >
        <span>{title}</span>
        <span className="text-gray-500">{open ? "–" : "+"}</span>
      </button>

      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}
