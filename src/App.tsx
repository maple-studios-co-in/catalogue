import { Routes, Route, Link } from "react-router-dom";

/**
 * Embedded PDFs are broken on mobile: iOS WebKit renders only the first
 * page of an iframed PDF (frozen, no scrolling) and Android often refuses
 * to render one at all. On touch platforms we link straight to the PDF —
 * the native viewer scrolls, zooms and paginates properly. Desktop keeps
 * the in-page iframe. (iPadOS 13+ masquerades as MacIntel, hence the
 * maxTouchPoints check.)
 */
const MOBILE_PDF =
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod|Android/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

const CATALOGUES = {
  chair: {
    index: "Seating",
    title: "Chair Collection",
    route: "/catalogue-1",
    pdf: "/catalogues/Chair_Collection.pdf",
  },
  nimbus: {
    index: "Living",
    title: "Nimbus Collection",
    route: "/catalogue-2",
    pdf: "/catalogues/Nimbus_Collection.pdf",
  },
} as const;

type Catalogue = (typeof CATALOGUES)[keyof typeof CATALOGUES];

function CollectionPlate({ cat }: { cat: Catalogue }) {
  const inner = (
    <>
      <span className="collection-index">{cat.index}</span>
      <span className="collection-name">{cat.title}</span>
      <span className="collection-cta">View catalogue →</span>
    </>
  );
  // Mobile goes straight to the PDF (native viewer); the browser back
  // button returns here. Desktop opens the in-app viewer route.
  return MOBILE_PDF ? (
    <a href={cat.pdf} className="collection-plate">
      {inner}
    </a>
  ) : (
    <Link to={cat.route} className="collection-plate">
      {inner}
    </Link>
  );
}

function Home() {
  return (
    <div className="home">
      <div className="home-glow" />
      <span className="home-eyebrow">Maple Furnishers</span>
      <h1 className="home-headline">
        Every room deserves
        <br />
        a quiet kind of luxury.
      </h1>
      <p className="home-sub">Two collections, considered down to the grain.</p>

      <div className="collections">
        <CollectionPlate cat={CATALOGUES.chair} />
        <CollectionPlate cat={CATALOGUES.nimbus} />
      </div>
    </div>
  );
}

function PdfViewer({ cat }: { cat: Catalogue }) {
  // Someone landing on this route directly on a phone would hit the dead
  // first-page-only iframe — give them the native-viewer door instead,
  // styled with the home page's own plates.
  if (MOBILE_PDF) {
    return (
      <div className="home">
        <div className="home-glow" />
        <span className="home-eyebrow">Maple Furnishers</span>
        <h1 className="home-headline">{cat.title}</h1>
        <div className="collections">
          <a href={cat.pdf} className="collection-plate">
            <span className="collection-index">{cat.index}</span>
            <span className="collection-cta">Open the catalogue →</span>
          </a>
        </div>
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={cat.pdf}
        style={{ width: "100%", height: "100%", border: "none" }}
        title={cat.title}
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogue-1" element={<PdfViewer cat={CATALOGUES.chair} />} />
      <Route path="/catalogue-2" element={<PdfViewer cat={CATALOGUES.nimbus} />} />
    </Routes>
  );
}

export default App;
