import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronDown,
  Compass,
  Download,
  FileText,
  FolderOpen,
  Grid2X2,
  Layers3,
  MapPin,
  Maximize2,
  MessageSquare,
  Monitor,
  MousePointer2,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import Portal from "@/components/portal/portal";
import { DeploymentGate } from "@/components/portal/access";
import { floors, rooms, zones, type FloorId, type Room } from "@/lib/hq/rooms";
import { Architecture } from "./architecture";

const sections = [
  "Overview",
  "Live Office",
  "Progress",
  "Staging",
  "Tasks",
  "Feedback",
  "Approvals",
  "Assets",
  "Meetings",
  "Activity",
  "Team",
  "Settings",
];
export default function Headquarters() {
  const readHash = () => {
    try {
      return decodeURIComponent(location.hash.slice(1));
    } catch {
      return "hq";
    }
  };
  const [hash, setHash] = useState(readHash);
  useEffect(() => {
    const update = () => setHash(readHash());
    addEventListener("hashchange", update);
    return () => removeEventListener("hashchange", update);
  }, []);
  if (
    sections.includes(hash) ||
    new URLSearchParams(location.search).has("token")
  )
    return (
      <div className="hq-project-shell">
        <div className="hq-return">
          <a href="#hq">
            <ArrowLeft size={14} />
            Back to headquarters
          </a>
          <span>FABRIPASS · CLIENT WORKSPACE</span>
        </div>
        <DeploymentGate>
          <Portal />
        </DeploymentGate>
      </div>
    );
  return <HQExplorer />;
}
function HQExplorer() {
  const [floor, setFloor] = useState<FloorId | null>(null),
    [selected, setSelected] = useState<Room | null>(null),
    [plan, setPlan] = useState(false),
    [view, setView] = useState<"explore" | "directory" | "brief">("explore"),
    [query, setQuery] = useState(""),
    [expanded, setExpanded] = useState(false),
    [menu, setMenu] = useState(false);
  const active = floors.find((f) => f.id === floor),
    visibleRooms = useMemo(
      () =>
        rooms.filter(
          (r) =>
            (!floor || r.floor === floor) &&
            `${r.name} ${r.zone} ${r.capacity}`
              .toLowerCase()
              .includes(query.toLowerCase()),
        ),
      [floor, query],
    );
  const selectFloor = (id: FloorId | null) => {
    setFloor(id);
    setSelected(null);
    if (!id) setPlan(false);
  };
  const selectRoom = (room: Room) => {
    setFloor(room.floor);
    setSelected(room);
    setView("explore");
    if (matchMedia("(max-width:1000px)").matches)
      requestAnimationFrame(() =>
        document
          .querySelector(".hq-room-detail")
          ?.scrollIntoView({
            block: "nearest",
            behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
              ? "instant"
              : "smooth",
          }),
      );
  };
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (expanded) setExpanded(false);
        else if (selected) setSelected(null);
        else {
          setFloor(null);
          setPlan(false);
        }
        setMenu(false);
      }
    };
    addEventListener("keydown", escape);
    return () => removeEventListener("keydown", escape);
  }, [selected, expanded]);
  return (
    <div className={`hq-app ${expanded ? "hq-expanded" : ""}`}>
      <aside className={`hq-sidebar ${menu ? "is-open" : ""}`}>
        <a
          className="hq-wordmark"
          href="#hq"
          onClick={() => {
            setView("explore");
            selectFloor(null);
          }}
        >
          Tigotek<span>THE HEADQUARTERS</span>
        </a>
        <div className="hq-location">
          <span className="hq-location-icon">
            <Building2 size={19} />
          </span>
          <div>
            <b>Dhaka, Bangladesh</b>
            <small>One place. Every possibility.</small>
          </div>
        </div>
        <p className="hq-nav-label">YOUR SPACE</p>
        <nav aria-label="Headquarters navigation">
          <button
            className={view === "explore" ? "active" : ""}
            onClick={() => {
              setView("explore");
              setMenu(false);
            }}
          >
            <Compass size={18} />
            Explore headquarters
            <ArrowUpRight size={13} />
          </button>
          <button
            className={view === "directory" ? "active" : ""}
            onClick={() => {
              setView("directory");
              setMenu(false);
            }}
          >
            <Grid2X2 size={18} />
            Room directory<span>28</span>
          </button>
          <button
            className={view === "brief" ? "active" : ""}
            onClick={() => {
              setView("brief");
              setMenu(false);
            }}
          >
            <FileText size={18} />
            The concept
          </button>
        </nav>
        <p className="hq-nav-label project-nav-label">YOUR PROJECT</p>
        <nav aria-label="Project navigation">
          <a href="#Overview">
            <Layers3 size={18} />
            Project workspace
            <ArrowUpRight size={13} />
          </a>
          <a href="#Staging">
            <Monitor size={18} />
            Live preview
          </a>
          <a href="#Feedback">
            <MessageSquare size={18} />
            Feedback & approvals
          </a>
          <a href="#Assets">
            <FolderOpen size={18} />
            Asset library
          </a>
        </nav>
        <div className="hq-sidebar-bottom">
          <div className="hq-brand-line" />
          <p>
            A home for
            <br />
            <em>what’s next.</em>
          </p>
          <a href="https://www.tigotek.net/" target="_blank" rel="noreferrer">
            tigotek.net
            <ArrowUpRight size={13} />
          </a>
          <span className="hq-draft-dot">WORKPLACE CONCEPT · DRAFT 01</span>
        </div>
      </aside>
      {menu && (
        <button
          className="hq-mobile-scrim"
          aria-label="Close navigation"
          onClick={() => setMenu(false)}
        />
      )}
      <div className="hq-workspace">
        <header className="hq-topbar">
          <div>
            <button
              className="hq-mobile-menu"
              aria-label="Open navigation"
              onClick={() => setMenu(!menu)}
            >
              <Layers3 size={19} />
            </button>
            <span>Tigotek HQ</span>
            <i>/</i>
            <b>
              {view === "explore"
                ? "Explore"
                : view === "directory"
                  ? "Room directory"
                  : "The concept"}
            </b>
          </div>
          <div className="hq-topbar-right">
            <span>
              <MapPin size={12} />
              DHAKA, BD
            </span>
            <a
              href="/concept/Tigotek-HQ-Draft01.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Concept brief
              <ArrowUpRight size={13} />
            </a>
            <span className="hq-avatar">T.</span>
          </div>
        </header>
        <main className="hq-main" id="main-content">
          <section className="hq-heading">
            <div>
              <p className="hq-eyebrow">TIGOTEK · A NEW KIND OF HEADQUARTERS</p>
              <h1>
                {view === "explore" ? (
                  <>
                    Space to connect.
                    <br className="mobile-break" /> Room to create.
                  </>
                ) : view === "directory" ? (
                  "Every room has a purpose."
                ) : (
                  "Built around the way we work."
                )}
              </h1>
              <p>
                {view === "explore"
                  ? "Public at the base. Production in the middle. Focus at the top."
                  : view === "directory"
                    ? "Find your place across three carefully considered floors."
                    : "The ideas behind the three-floor marketplace headquarters."}
              </p>
            </div>
            <a className="hq-outline-button" href="#Overview">
              Enter your workspace
              <ArrowUpRight size={15} />
            </a>
          </section>
          <div className="hq-stat-strip">
            {[
              ["03", "Connected floors"],
              ["52", "Assigned desks"],
              ["28", "Purposeful rooms"],
              ["12,594", "Square feet"],
            ].map(([n, label]) => (
              <div key={label}>
                <strong>{n}</strong>
                <span>{label}</span>
              </div>
            ))}
            <div className="hq-concept-tag">
              <span />
              CONCEPT, NOT LIVE OCCUPANCY
            </div>
          </div>
          {view === "explore" ? (
            <>
              <div className="hq-explorer-layout">
                <section
                  className="hq-theatre"
                  aria-label="Interactive headquarters"
                >
                  <div className="hq-theatre-heading">
                    <div>
                      <p className="hq-eyebrow">THE BIG PICTURE</p>
                      <h2>
                        {active ? active.name : "Your headquarters, in view."}
                      </h2>
                    </div>
                    <div className="hq-theatre-tools">
                      <button
                        className={plan ? "" : "active"}
                        aria-pressed={!plan}
                        onClick={() => setPlan(false)}
                      >
                        <Layers3 size={14} />
                        3D
                      </button>
                      <button
                        className={plan ? "active" : ""}
                        aria-pressed={plan}
                        onClick={() => {
                          setPlan(true);
                          if (!floor) setFloor("G");
                        }}
                      >
                        <Grid2X2 size={14} />
                        Plan
                      </button>
                      <button
                        aria-label={
                          expanded
                            ? "Exit expanded view"
                            : "Expand headquarters"
                        }
                        onClick={() => setExpanded(!expanded)}
                      >
                        {expanded ? <X size={15} /> : <Maximize2 size={15} />}
                      </button>
                    </div>
                  </div>
                  <div className="hq-scene">
                    <div className="hq-floor-rail">
                      <button
                        className={!floor ? "active" : ""}
                        aria-label="Show all floors"
                        aria-pressed={!floor}
                        onClick={() => selectFloor(null)}
                      >
                        <Layers3 size={17} />
                      </button>
                      {floors.map((f) => (
                        <button
                          key={f.id}
                          className={floor === f.id ? "active" : ""}
                          aria-label={`Focus ${f.id}: ${f.name}`}
                          aria-pressed={floor === f.id}
                          onClick={() => selectFloor(f.id)}
                        >
                          {f.id}
                        </button>
                      ))}
                    </div>
                    <Architecture
                      floor={floor}
                      room={selected?.id || null}
                      plan={plan}
                      onFloor={setFloor}
                      onRoom={selectRoom}
                    />
                    {floor && (
                      <button
                        className="hq-reset"
                        onClick={() => selectFloor(null)}
                      >
                        <RotateCcw size={12} />
                        All floors
                      </button>
                    )}
                    <div className="hq-orientation">
                      <span>N</span>
                      <ArrowUpRight size={21} />
                      <small>INDICATIVE</small>
                    </div>
                  </div>
                  <div className="hq-model-caption">
                    <span>
                      <MousePointer2 size={13} />
                      {floor
                        ? "Select a room to step inside"
                        : "Choose a floor. Make yourself at home."}
                    </span>
                    <span>26 × 15 m · CONCEPT PLATE</span>
                  </div>
                </section>
                <aside className="hq-context" aria-live="polite">
                  {selected ? (
                    <RoomDetail
                      room={selected}
                      onClose={() => setSelected(null)}
                    />
                  ) : active ? (
                    <>
                      <p className="hq-eyebrow">
                        {active.id === "G"
                          ? "GROUND FLOOR"
                          : `LEVEL ${active.id.slice(1)}`}
                      </p>
                      <h2>{active.name}</h2>
                      <p className="hq-context-intro">{active.intro}</p>
                      <div className="hq-context-numbers">
                        <div>
                          <strong>{active.desks}</strong>
                          <span>assigned desks</span>
                        </div>
                        <div>
                          <strong>{active.height}</strong>
                          <span>floor to floor</span>
                        </div>
                      </div>
                      <div className="hq-access-note">
                        <ShieldCheck size={16} />
                        <span>{active.access}</span>
                      </div>
                      <p className="hq-nav-label">STEP INSIDE</p>
                      <div className="hq-room-shortlist">
                        {rooms
                          .filter((r) => r.floor === floor)
                          .map((r) => (
                            <button key={r.id} onClick={() => selectRoom(r)}>
                              <span
                                className="hq-zone-dot"
                                style={{ background: zones[r.zone] }}
                              />
                              <span>{r.name}</span>
                              <ArrowUpRight size={13} />
                            </button>
                          ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="hq-eyebrow">THREE FLOORS. ONE AMBITION.</p>
                      <h2>
                        Good work starts
                        <br />
                        with a great place.
                      </h2>
                      <p className="hq-context-intro">
                        A home for the people who build, the partners who
                        connect, and the ideas that move us forward.
                      </p>
                      <div className="hq-floor-cards">
                        {floors.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => selectFloor(f.id)}
                            style={
                              {
                                "--floor-color": f.color,
                              } as React.CSSProperties
                            }
                          >
                            <span className="hq-floor-code">{f.id}</span>
                            <span>
                              <b>{f.name}</b>
                              <small>{f.subtitle}</small>
                            </span>
                            <ArrowUpRight size={15} />
                          </button>
                        ))}
                      </div>
                      <div className="hq-philosophy">
                        <Sparkles size={17} />
                        <p>
                          Community below.
                          <br />
                          Possibility on every level.
                        </p>
                      </div>
                    </>
                  )}
                </aside>
              </div>
              <div className="hq-zone-legend">
                {Object.entries(zones).map(([name, color]) => (
                  <span key={name}>
                    <i style={{ background: color }} />
                    {name}
                  </span>
                ))}
                <span>
                  <i style={{ background: "#a9b3aa" }} />
                  Core & services
                </span>
              </div>
              <section className="hq-lower-grid">
                <div className="hq-project-invite">
                  <span className="hq-mini-icon">
                    <Monitor size={20} />
                  </span>
                  <div>
                    <p className="hq-eyebrow">YOUR WORK, IN THE OPEN</p>
                    <h3>See what’s taking shape.</h3>
                    <p>
                      Open your project preview, follow the progress, and leave
                      feedback in one shared space.
                    </p>
                  </div>
                  <a href="#Staging" className="hq-gold-button">
                    Open live preview
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <a
                  className="hq-brief-card"
                  href="/concept/Tigotek-HQ-Draft01.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText size={22} />
                  <div>
                    <p className="hq-eyebrow">FROM THE FOUNDER’S SKETCH</p>
                    <h3>The thinking behind the space.</h3>
                    <span>Explore the original eight-page brief</span>
                  </div>
                  <ArrowUpRight size={19} />
                </a>
              </section>
            </>
          ) : view === "directory" ? (
            <section className="hq-directory">
              <div className="hq-directory-controls">
                <div className="hq-filter-tabs">
                  <button
                    className={!floor ? "active" : ""}
                    onClick={() => setFloor(null)}
                  >
                    All rooms <span>28</span>
                  </button>
                  {floors.map((f) => (
                    <button
                      className={floor === f.id ? "active" : ""}
                      key={f.id}
                      onClick={() => setFloor(f.id)}
                    >
                      {f.id} · {f.name}
                    </button>
                  ))}
                </div>
                <label className="hq-search">
                  <Search size={16} />
                  <input
                    placeholder="Find a room or purpose…"
                    aria-label="Search rooms"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
              </div>
              <div className="hq-directory-grid">
                {visibleRooms.map((r) => (
                  <button
                    className="hq-directory-room"
                    key={r.id}
                    onClick={() => selectRoom(r)}
                  >
                    <div>
                      <span
                        className="hq-zone-dot"
                        style={{ background: zones[r.zone] }}
                      />
                      {r.zone}
                      <span>{r.floor}</span>
                    </div>
                    <h3>{r.name}</h3>
                    <p>{r.capacity}</p>
                    <footer>
                      <span>{r.area} m²</span>
                      <ArrowUpRight size={17} />
                    </footer>
                  </button>
                ))}
              </div>
              {!visibleRooms.length && (
                <div className="hq-empty">
                  <Search size={25} />
                  <h3>No rooms found.</h3>
                  <p>Try a different name, purpose or floor.</p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setFloor(null);
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </section>
          ) : (
            <Concept
              onFloor={(f) => {
                setView("explore");
                selectFloor(f);
              }}
            />
          )}
          <footer className="hq-footer">
            <span>TIGOTEK (PVT.) LIMITED</span>
            <span>
              Based on HQ Workplace Concept · Draft 01 · 4 October 2026
            </span>
            <span>Designed for possibility.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
function RoomDetail({ room, onClose }: { room: Room; onClose: () => void }) {
  return (
    <div className="hq-room-detail" key={room.id}>
      <div className="hq-room-detail-top">
        <p className="hq-eyebrow">
          {room.floor} · {floors.find((f) => f.id === room.floor)!.name}
        </p>
        <button aria-label="Close room details" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
      <span className="hq-room-category" style={{ color: zones[room.zone] }}>
        <i style={{ background: zones[room.zone] }} />
        {room.zone}
      </span>
      <h2>{room.name}</h2>
      <p className="hq-context-intro">{room.description}</p>
      <div className="hq-room-area">
        <strong>
          {room.area}
          <small>m²</small>
        </strong>
        <span>{room.capacity}</span>
      </div>
      <p className="hq-nav-label">CONSIDERED DETAILS</p>
      <ul className="hq-room-features">
        {room.features.map((f) => (
          <li key={f}>
            <span />
            {f}
          </li>
        ))}
      </ul>
      {room.action && (
        <a className="hq-gold-button" href={`#${room.action}`}>
          Go to {room.action.toLowerCase()}
          <ArrowUpRight size={15} />
        </a>
      )}
      <p className="hq-room-note">
        Room areas and capacities follow the concept brief. Final dimensions
        depend on the building survey.
      </p>
    </div>
  );
}
function Concept({ onFloor }: { onFloor: (f: FloorId) => void }) {
  return (
    <div className="hq-concept">
      <div className="hq-concept-intro">
        <p className="hq-eyebrow">THE FOUNDING IDEA</p>
        <h2>
          Trust at the door.
          <br />
          Creativity at the heart.
          <br />
          <em>Focus at the top.</em>
        </h2>
        <p>
          The PDF’s workplace strategy becomes a digital headquarters: three
          distinct floors, a shared service core, and a clear progression from
          public space to concentrated work.
        </p>
        <a
          className="hq-gold-button"
          href="/concept/Tigotek-HQ-Draft01.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Read the original brief
          <Download size={15} />
        </a>
      </div>
      <div className="hq-concept-rules">
        {[
          [
            "01",
            "A clear privacy gradient",
            "Visitors and partners begin at The Commons. Studio guests are escorted; focused engineering and leadership sit above.",
          ],
          [
            "02",
            "Space for the whole marketplace",
            "A 28-seat work café, interview room and partner lockers make the ground floor a home for the network.",
          ],
          [
            "03",
            "Production with a quiet side",
            "The studio suite contains its own control room, podcast booth and green room. The core buffers the library and wellbeing spaces.",
          ],
          [
            "04",
            "Shared foundations",
            "Two protected stairs, a lift and accessible facilities align across all three floors. Dimensions remain subject to the real building.",
          ],
        ].map(([n, title, text]) => (
          <article key={n}>
            <span>{n}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="hq-concept-floor-grid">
        {[...floors].reverse().map((f) => (
          <button key={f.id} onClick={() => onFloor(f.id)}>
            <span style={{ color: f.color }}>{f.id}</span>
            <h3>{f.name}</h3>
            <p>{f.intro}</p>
            <footer>
              Explore floor
              <ArrowUpRight size={16} />
            </footer>
          </button>
        ))}
      </div>
      <p className="hq-source-note">
        Source: Tigotek HQ Workplace Concept, Draft 01. Assumed 26 × 15 m floor
        plate, 390 m² per floor. This interface interprets the concept; it is
        not a construction drawing or a live building-management system.
      </p>
    </div>
  );
}
