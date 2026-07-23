import { Routes, Route, Link } from "react-router-dom";

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
        <Link to="/catalogue-1" className="collection-plate">
          <span className="collection-index">Seating</span>
          <span className="collection-name">Chair Collection</span>
          <span className="collection-cta">View catalogue →</span>
        </Link>
        <Link to="/catalogue-2" className="collection-plate">
          <span className="collection-index">Living</span>
          <span className="collection-name">Nimbus Collection</span>
          <span className="collection-cta">View catalogue →</span>
        </Link>
      </div>
    </div>
  );
}

function Catalogue1() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/catalogues/Chair_Collection.pdf"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Chair Collection"
      />
    </div>
  );
}

function Catalogue2() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/catalogues/Nimbus_Collection.pdf"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Nimbus Collection"
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogue-1" element={<Catalogue1 />} />
      <Route path="/catalogue-2" element={<Catalogue2 />} />
    </Routes>
  );
}

export default App;