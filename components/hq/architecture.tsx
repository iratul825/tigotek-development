import { useEffect, useId, useRef, useState } from "react";
import { floors, rooms, zones, type FloorId, type Room } from "@/lib/hq/rooms";

export function Architecture({
  floor,
  room,
  plan,
  onFloor,
  onRoom,
}: {
  floor: FloorId | null;
  room: string | null;
  plan: boolean;
  onFloor: (f: FloorId) => void;
  onRoom: (r: Room) => void;
}) {
  const uid = useId().replaceAll(":", "");
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1.1);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const unit = Math.min(width / 1000, height / 1000);
      if (unit > 0)
        setZoom(
          Math.max(
            0.96,
            Math.min(
              1.7,
              (width - 85) / (841 * unit),
              (height - 85) / (390 * unit),
            ),
          ),
        );
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);
  const active = floor || "G";
  const bases: Record<FloorId, number> = { L2: 100, L1: 330, G: 560 };
  const visibleFloor = plan ? active : floor;
  function renderFloor(id: FloorId) {
    const base = plan ? 75 : bases[id];
    const p = (x: number, y: number, z = 0) =>
      plan
        ? `${80 + x * 32},${base + y * 32}`
        : `${430 + (x - y) * 20.5},${base + (x + y) * 8.5 - z * 22}`;
    const poly = (coords: number[][]) =>
      coords.map(([x, y, z]) => p(x, y, z || 0)).join(" ");
    const box = (
      x: number,
      y: number,
      w: number,
      h: number,
      z: number,
      color: string,
      key: string,
    ) => (
      <g key={key} className="model-object">
        <polygon
          points={poly([
            [x, y, z],
            [x + w, y, z],
            [x + w, y + h, z],
            [x, y + h, z],
          ])}
          fill={color}
          stroke="#46524e"
          strokeWidth=".6"
        />
        {!plan && (
          <>
            <polygon
              points={poly([
                [x, y + h, 0],
                [x + w, y + h, 0],
                [x + w, y + h, z],
                [x, y + h, z],
              ])}
              fill="#697971"
              stroke="#495c54"
              strokeWidth=".5"
            />
            <polygon
              points={poly([
                [x + w, y, 0],
                [x + w, y + h, 0],
                [x + w, y + h, z],
                [x + w, y, z],
              ])}
              fill="#829187"
              stroke="#495c54"
              strokeWidth=".5"
            />
          </>
        )}
      </g>
    );
    const desk = (x: number, y: number, key: string) => (
      <g key={key}>
        {box(x, y, 1.5, 0.8, 0.7, "#d8d1b9", "d")}
        {box(x + 0.3, y + 0.13, 0.82, 0.1, 1.15, "#384d4c", "m")}
        {box(x + 0.52, y + 0.95, 0.48, 0.48, 0.42, "#667875", "c")}
      </g>
    );
    const plant = (x: number, y: number, key: string) => (
      <g key={key}>
        {box(x - 0.18, y - 0.18, 0.36, 0.36, 0.4, "#a9b1a1", "p")}
        <ellipse
          cx={Number(p(x, y, 0.95).split(",")[0])}
          cy={Number(p(x, y, 0.95).split(",")[1])}
          rx={plan ? 9 : 7}
          ry={plan ? 9 : 15}
          fill="#5e806c"
        />
        <path
          d={`M ${p(x, y, 0.4)} L ${p(x, y, 1.2)}`}
          stroke="#b1c0a2"
          strokeWidth="1.2"
        />
      </g>
    );
    function furniture(r: Room) {
      const [x, y, w, h] = r.rect;
      const bits = [];
      if (r.furniture === "desks") {
        const cols =
          r.id === "engineering"
            ? 4
            : r.id === "creative"
              ? 4
              : r.id === "noc"
                ? 2
                : 1;
        const rows =
          r.id === "engineering"
            ? 3
            : r.id === "creative"
              ? 2
              : r.id === "noc"
                ? 3
                : 1;
        for (let a = 0; a < cols; a++)
          for (let b = 0; b < rows; b++) {
            bits.push(
              desk(
                x + 0.65 + (a * (w - 1.8)) / cols,
                y + 0.8 + (b * (h - 1.5)) / rows,
                `${a}-${b}`,
              ),
            );
            if (r.id === "engineering" || r.id === "creative")
              bits.push(
                desk(
                  x + 0.65 + (a * (w - 1.8)) / cols,
                  y + 1.7 + (b * (h - 1.5)) / rows,
                  `p-${a}-${b}`,
                ),
              );
          }
      }
      if (r.furniture === "meeting" || r.furniture === "office") {
        bits.push(
          box(
            x + w * 0.27,
            y + h * 0.24,
            w * 0.44,
            h * 0.49,
            0.65,
            "#d2c5a9",
            "table",
          ),
        );
        for (let i = 0; i < (r.id === "boardroom" ? 5 : 3); i++) {
          bits.push(
            box(
              x + w * 0.12,
              y + h * 0.22 + i * h * 0.18,
              0.38,
              0.5,
              0.4,
              "#788c82",
              `l${i}`,
            ),
          );
          bits.push(
            box(
              x + w * 0.8,
              y + h * 0.22 + i * h * 0.18,
              0.38,
              0.5,
              0.4,
              "#788c82",
              `r${i}`,
            ),
          );
        }
      }
      if (r.furniture === "forum") {
        bits.push(box(x + 0.35, y + 1, 0.95, h - 2, 0.3, "#cfb889", "stage"));
        bits.push(box(x + 0.35, y + 1, 0.12, h - 2, 2.1, "#253f3f", "screen"));
        for (let i = 0; i < 3; i++)
          bits.push(
            box(
              x + w - 2.8 + i * 0.72,
              y + 0.6,
              0.72,
              h - 1.2,
              0.3 + i * 0.3,
              "#c7b997",
              `tier${i}`,
            ),
          );
        for (let i = 0; i < 3; i++)
          bits.push(
            box(
              x + 3,
              y + 1.5 + i * 1.8,
              3.4,
              0.65,
              0.42,
              "#b9c1b1",
              `bench${i}`,
            ),
          );
      }
      if (r.furniture === "cafe") {
        bits.push(box(x + 0.4, y + 0.5, w - 0.8, 0.6, 0.95, "#d5c4a0", "bar"));
        for (let i = 0; i < 3; i++)
          for (let j = 0; j < 2; j++)
            bits.push(
              box(
                x + 0.7 + (i * (w - 1.5)) / 3,
                y + 2 + j * 1.7,
                1.3,
                0.8,
                0.7,
                "#d0c4a5",
                `table${i}${j}`,
              ),
            );
      }
      if (r.furniture === "studio") {
        bits.push(box(x + 0.5, y + 0.5, w - 1, h - 1, 0.02, "#efede4", "cyc"));
        bits.push(
          box(x + 0.5, y + 0.5, w - 1, 0.12, 1.8, "#e4e7df", "cycback"),
        );
        for (let i = 0; i < 2; i++) {
          bits.push(
            box(
              x + 1.2 + i * 2.5,
              y + h - 2,
              0.22,
              0.22,
              1.6,
              "#334c4c",
              `stand${i}`,
            ),
          );
          bits.push(
            box(
              x + 0.95 + i * 2.5,
              y + h - 2,
              0.7,
              0.42,
              1.8,
              "#b9c6bd",
              `light${i}`,
            ),
          );
        }
      }
      if (r.furniture === "podcast") {
        bits.push(
          box(
            x + w * 0.3,
            y + h * 0.33,
            w * 0.4,
            h * 0.35,
            0.7,
            "#d7cbb1",
            "podtable",
          ),
        );
        for (let i = 0; i < 2; i++) {
          bits.push(
            box(
              x + 0.55 + i * 2,
              y + 0.9,
              0.45,
              0.45,
              0.42,
              "#567578",
              `seat${i}`,
            ),
          );
          bits.push(
            box(
              x + 0.55 + i * 2,
              y + 2.7,
              0.45,
              0.45,
              0.42,
              "#567578",
              `seatr${i}`,
            ),
          );
        }
      }
      if (r.furniture === "library") {
        bits.push(
          box(x + 0.3, y + 0.3, 0.4, h - 0.6, 1.35, "#96a789", "shelf"),
        );
        for (let i = 0; i < 2; i++)
          bits.push(
            box(x + 2 + i * 3, y + 1.6, 2.2, 1, 0.65, "#d5cfb9", `table${i}`),
          );
        bits.push(
          box(x + 1, y + h - 0.8, w - 2, 0.45, 0.4, "#c4cdb9", "bench"),
        );
      }
      if (r.furniture === "racks" || r.furniture === "bench") {
        for (let i = 0; i < 2; i++)
          bits.push(
            box(
              x + 0.35 + (i * (w - 0.7)) / 2,
              y + 0.5,
              Math.min(1, (w - 0.9) / 2),
              Math.min(1.5, h - 0.9),
              r.furniture === "racks" ? 1.4 : 0.8,
              r.furniture === "racks" ? "#435958" : "#c9c4ad",
              `rack${i}`,
            ),
          );
      }
      if (r.id === "arrival") {
        bits.push(box(x + w - 0.9, y + 1, 0.6, 3, 0.8, "#cbbd9a", "host"));
        bits.push(box(x + 0.5, y + 1.8, 1.7, 1.7, 1, "#a8b8ad", "pod1"));
        bits.push(box(x + 0.5, y + 4.2, 1.7, 1.7, 1, "#a8b8ad", "pod2"));
      }
      if (r.id.startsWith("prayer"))
        for (let i = 0; i < 3; i++)
          bits.push(
            box(
              x + 0.35,
              y + 0.4 + i * 0.55,
              w - 0.7,
              0.35,
              0.02,
              "#91ac8c",
              `mat${i}`,
            ),
          );
      return <g pointerEvents="none">{bits}</g>;
    }
    return (
      <g
        key={id}
        aria-hidden={!!visibleFloor && visibleFloor !== id}
        className={`model-floor ${visibleFloor && visibleFloor !== id ? "is-muted" : ""}`}
        style={{
          pointerEvents: visibleFloor && visibleFloor !== id ? "none" : "auto",
        }}
      >
        {!plan && (
          <polygon
            points={poly([
              [0, 15, -0.24],
              [26, 15, -0.24],
              [26, 0, -0.24],
              [26, 0, 0],
              [26, 15, 0],
              [0, 15, 0],
            ])}
            fill="#52635c"
          />
        )}
        <polygon
          points={poly([
            [0, 0],
            [26, 0],
            [26, 15],
            [0, 15],
          ])}
          fill="#e4e3d4"
          stroke="#d7deca"
          strokeWidth="1.5"
        />
        {rooms
          .filter((r) => r.floor === id)
          .map((r) => (
            <g
              key={r.id}
              className={`model-room ${room === r.id ? "is-selected" : ""}`}
              role="button"
              tabIndex={visibleFloor && visibleFloor !== id ? -1 : 0}
              aria-label={`${id}: ${r.name}, ${r.capacity}`}
              aria-pressed={room === r.id}
              onClick={() => {
                onFloor(id);
                onRoom(r);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onFloor(id);
                  onRoom(r);
                }
              }}
            >
              <title>
                {r.name} · {r.area} m² · {r.capacity}
              </title>
              <polygon
                className="room-surface"
                points={poly([
                  [r.rect[0], r.rect[1]],
                  [r.rect[0] + r.rect[2], r.rect[1]],
                  [r.rect[0] + r.rect[2], r.rect[1] + r.rect[3]],
                  [r.rect[0], r.rect[1] + r.rect[3]],
                ])}
                fill={zones[r.zone]}
                fillOpacity={room === r.id ? 1 : 0.46}
                stroke="#f7f5e9"
                strokeWidth="1.5"
              />
              {furniture(r)}
              {(visibleFloor ||
                [
                  "forum",
                  "cafe",
                  "creative",
                  "library",
                  "engineering",
                  "noc",
                  "ceo",
                ].includes(r.id)) && (
                <text
                  className="model-room-label"
                  x={Number(
                    p(
                      r.rect[0] + r.rect[2] / 2,
                      r.rect[1] + r.rect[3] - 0.35,
                      0.01,
                    ).split(",")[0],
                  )}
                  y={Number(
                    p(
                      r.rect[0] + r.rect[2] / 2,
                      r.rect[1] + r.rect[3] - 0.35,
                      0.01,
                    ).split(",")[1],
                  )}
                  textAnchor="middle"
                  pointerEvents="none"
                >
                  {r.short}
                </text>
              )}
            </g>
          ))}
        <g pointerEvents="none">
          {box(10.4, 0, 2.7, 6.4, 1, "#a9b3aa", "stairs1")}
          {box(13.2, 0, 2.2, 2, 1.2, "#bcc7bb", "service")}
          {box(13.2, 2.2, 2.2, 2.4, 1.2, "#7e9891", "lift")}
          {box(16.5, 0, 6.8, 6.4, 0.65, "#bac3b5", "wc")}
          {box(23.4, 0, 2.6, 6.4, 1, "#a9b3aa", "stairs2")}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <g key={i}>
              <path
                d={`M ${p(10.65, 0.4 + i * 0.6, 1.02)} L ${p(12.85, 0.4 + i * 0.6, 1.02)}`}
                stroke="#e4e9dd"
              />
              <path
                d={`M ${p(23.65, 0.4 + i * 0.6, 1.02)} L ${p(25.75, 0.4 + i * 0.6, 1.02)}`}
                stroke="#e4e9dd"
              />
            </g>
          ))}
          <text
            x={Number(p(14.3, 3.3, 1.21).split(",")[0])}
            y={Number(p(14.3, 3.3, 1.21).split(",")[1])}
            fill="#eef4e6"
            fontSize="8"
            textAnchor="middle"
          >
            LIFT
          </text>
          {!plan && (
            <>
              <polygon
                points={poly([
                  [0, 0],
                  [26, 0],
                  [26, 0, 1.75],
                  [0, 0, 1.75],
                ])}
                fill="#b9d2ca"
                fillOpacity=".18"
                stroke="#bdcfc2"
                strokeOpacity=".7"
              />
              <polygon
                points={poly([
                  [26, 0],
                  [26, 15],
                  [26, 15, 1.2],
                  [26, 0, 1.75],
                ])}
                fill="#d6e4d7"
                fillOpacity=".1"
                stroke="#bdcfc2"
                strokeOpacity=".5"
              />
            </>
          )}
          {[0, 5.2, 10.4, 15.6, 20.8, 26].map((x, i) => (
            <path
              key={i}
              d={`M ${p(x, 0, 0)} L ${p(x, 0, 1.75)}`}
              stroke="#95ada0"
              strokeWidth="2"
            />
          ))}
          {plant(0.4, 14.5, "p1")}
          {plant(25.5, 14.5, "p2")}
          {plant(10, 7.3, "p3")}
          {id === "G" && (
            <path
              d={`M ${p(10.4, 6.6, 0.05)} L ${p(10.4, 8.4, 0.05)} L ${p(15.7, 8.4, 0.05)} L ${p(15.7, 6.6, 0.05)}`}
              fill="none"
              stroke="#a98f54"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
          )}
        </g>
        {!visibleFloor && (
          <g
            className="floor-model-title"
            role="button"
            tabIndex={0}
            aria-label={`Explore ${floors.find((f) => f.id === id)!.name}`}
            onClick={() => onFloor(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onFloor(id);
            }}
          >
            <path
              d={`M ${p(26, 15)} l 22 9 h 88`}
              fill="none"
              stroke="#a5b4a0"
              strokeOpacity=".45"
            />
            <text
              x="798"
              y={base + 365}
              fill={floors.find((f) => f.id === id)!.color}
              fontSize="12"
              letterSpacing="2"
            >
              {id}
            </text>
            <text x="833" y={base + 365} fill="#d3d7c7" fontSize="12">
              {floors.find((f) => f.id === id)!.name}
            </text>
          </g>
        )}
      </g>
    );
  }
  const targetBase = floor ? bases[floor] : 0;
  const transform = plan
    ? "translate(0px, 0px)"
    : floor
      ? `translate(${560 - 542.75 * zoom}px, ${515 - (targetBase + 155) * zoom}px) scale(${zoom})`
      : "translate(0px, 0px) scale(1)";
  return (
    <svg
      ref={svgRef}
      className={`hq-model ${plan ? "is-plan" : ""}`}
      viewBox={plan ? "35 35 950 620" : "35 15 1000 1000"}
      aria-label="Interactive three-floor Tigotek headquarters"
      role="group"
    >
      <defs>
        <radialGradient id={`halo-${uid}`}>
          <stop stopColor="#b5af79" stopOpacity=".13" />
          <stop offset="1" stopColor="#b5af79" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="495" cy="750" rx="470" ry="190" fill={`url(#halo-${uid})`} />
      <g className="model-camera" style={{ transform }}>
        {[...floors]
          .reverse()
          .filter((f) => !plan || f.id === active)
          .map((f) => renderFloor(f.id))}
      </g>
    </svg>
  );
}
