import Link from 'next/link';
import { FLAGSHIP_PROJECTS, type Project } from '@/content/projects';
import { lineFor } from '@/content/lines';

const RIDE_SECONDS = 7;
const DRAW_SECONDS = 1.2;

interface Point {
  x: number;
  y: number;
}

interface LineGeometry {
  /** SVG path of the line, also the packet's motion path. */
  d: string;
  /** Where each station sits and how far along the path it is (0 to 1). */
  stops: Array<Point & { at: number }>;
  /** Station name position: above or below its station. */
  labelAbove: (index: number) => boolean;
  bullet: Point;
  title: Point;
  metric: Point & { anchor: 'start' | 'end' };
}

function headline(project: Project) {
  const metric = project.metrics?.[0];
  return metric ? `${metric.value} ${metric.label.toLowerCase()}` : project.tag;
}

/* ── Desktop: three lines fan out from one interchange ─────────────────── */

const HUB = { x: 70, y: 280 };
const BEND_X = 240;
const END_X = 650;
const STOPS_X = [270, 365, 460, 555, 650];
const LANES = [110, 280, 450];

function wideGeometry(y: number): LineGeometry {
  const straight = y === HUB.y;
  const sign = y < HUB.y ? -1 : 1;
  const diagonal = straight ? 0 : Math.abs(y - HUB.y) * Math.SQRT2;
  const total = straight ? END_X - HUB.x : diagonal + (END_X - BEND_X);
  return {
    d: straight
      ? `M${HUB.x} ${HUB.y} H${END_X}`
      : `M${HUB.x} ${HUB.y} L${BEND_X - 14} ${y - sign * 14} Q${BEND_X} ${y} ${BEND_X + 20} ${y} H${END_X}`,
    stops: STOPS_X.map((x) => ({ x, y, at: straight ? (x - HUB.x) / total : (diagonal + (x - BEND_X)) / total })),
    // Lines arriving from above keep their first label clear of the bend.
    labelAbove: (index) => (index % 2 === 0) === (y <= HUB.y),
    bullet: { x: 264, y: y - 62 },
    title: { x: 288, y: y - 55 },
    metric: { x: END_X + 8, y: y - 56, anchor: 'end' },
  };
}

/* ── Phone: the same lines run down one trunk and peel off to the right ── */

const TALL = { width: 370, height: 552, hubY: 28, radius: 16 };
const TALL_STOPS_X = [86, 144, 202, 260, 318];
const TALL_LANES = [112, 292, 472];
/** The first line to leave the trunk rides on its outside edge, so no two cross. */
const TRUNK_X = [38, 27, 16];

function tallGeometry(index: number): LineGeometry {
  const x = TRUNK_X[index];
  const y = TALL_LANES[index];
  const r = TALL.radius;
  const end = TALL_STOPS_X[TALL_STOPS_X.length - 1];
  const vertical = y - r - TALL.hubY;
  const corner = (Math.PI * r) / 2;
  const total = vertical + corner + (end - (x + r));
  return {
    d: `M${x} ${TALL.hubY} V${y - r} Q${x} ${y} ${x + r} ${y} H${end}`,
    stops: TALL_STOPS_X.map((stopX) => ({ x: stopX, y, at: (vertical + corner + (stopX - (x + r))) / total })),
    labelAbove: (stop) => stop % 2 === 0,
    bullet: { x: 76, y: y - 60 },
    title: { x: 98, y: y - 53 },
    metric: { x: 62, y: y + 62, anchor: 'start' },
  };
}

function MapLine({ project, geometry, index }: { project: Project; geometry: LineGeometry; index: number }) {
  const line = lineFor(project.slug);
  const nodes = project.nodes ?? [];
  const start = DRAW_SECONDS + index * 0.5;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`map-group line-${line.color}`}
      aria-label={`${project.title}: ${project.tag}. Open the case study`}
    >
      {/* Wide invisible stroke so the whole line is an easy target. */}
      <path d={geometry.d} fill="none" stroke="transparent" strokeWidth={44} />
      <path d={geometry.d} pathLength={1} className="map-line" />

      {[0, 1].map((packet) => (
        <circle
          key={packet}
          r={6.5}
          className="map-packet"
          style={
            {
              offsetPath: `path('${geometry.d}')`,
              '--ride': `${RIDE_SECONDS}s`,
              animationDelay: `${start + (packet * RIDE_SECONDS) / 2}s`,
              opacity: 0,
            } as React.CSSProperties
          }
        />
      ))}

      {nodes.slice(0, geometry.stops.length).map((node, i) => {
        const stop = geometry.stops[i];
        return (
          <g key={node.id}>
            <circle
              cx={stop.x}
              cy={stop.y}
              r={9.5}
              className="map-station"
              style={
                {
                  '--ride': `${RIDE_SECONDS / 2}s`,
                  animationDelay: `${start + stop.at * RIDE_SECONDS}s`,
                } as React.CSSProperties
              }
            />
            <text
              x={stop.x}
              y={geometry.labelAbove(i) ? stop.y - 22 : stop.y + 34}
              textAnchor="middle"
              fontSize={14}
              fontWeight={600}
              style={{ fontStretch: '82%' }}
              fill="var(--ink)"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      <circle cx={geometry.bullet.x} cy={geometry.bullet.y} r={14} fill="var(--line)" />
      <text
        x={geometry.bullet.x}
        y={geometry.bullet.y + 5.5}
        textAnchor="middle"
        fontSize={16}
        fontWeight={800}
        fill="var(--on-line)"
      >
        {line.bullet}
      </text>
      <text
        x={geometry.title.x}
        y={geometry.title.y}
        fontSize={21}
        fontWeight={800}
        className="map-title"
        fill="var(--ink)"
        style={{ fontStretch: '106%' }}
      >
        {project.title}
      </text>
      <text
        x={geometry.metric.x}
        y={geometry.metric.y}
        textAnchor={geometry.metric.anchor}
        fontSize={13.5}
        fontWeight={600}
        fill="var(--muted)"
        style={{ fontStretch: '85%' }}
      >
        {headline(project)}
      </text>
    </Link>
  );
}

const MAP_LABEL =
  'Route map of three flagship systems. Each line is a project; each station is a stage of its pipeline.';

/** The first-viewport figure: three project lines leaving one interchange. */
export function RouteMap() {
  const projects = FLAGSHIP_PROJECTS.slice(0, 3);

  return (
    <>
      <svg viewBox="20 24 700 482" role="group" aria-label={MAP_LABEL} className="map hidden h-auto w-full lg:block">
        {projects.map((project, index) => (
          <MapLine key={project.slug} project={project} geometry={wideGeometry(LANES[index])} index={index} />
        ))}
        <circle cx={HUB.x} cy={HUB.y} r={24} className="map-hub-pulse" />
        <circle cx={HUB.x} cy={HUB.y} r={24} fill="#fff" stroke="var(--ink)" strokeWidth={8} />
        <text x={HUB.x} y={HUB.y + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--ink)">
          MB
        </text>
      </svg>

      <svg
        viewBox={`0 0 ${TALL.width} ${TALL.height}`}
        role="group"
        aria-label={MAP_LABEL}
        className="map map-tall mx-auto h-auto w-full max-w-[30rem] overflow-visible lg:hidden"
      >
        {projects.map((project, index) => (
          <MapLine key={project.slug} project={project} geometry={tallGeometry(index)} index={index} />
        ))}
        <circle cx={27} cy={TALL.hubY} r={22} className="map-hub-pulse" />
        <circle cx={27} cy={TALL.hubY} r={22} fill="#fff" stroke="var(--ink)" strokeWidth={7} />
        <text x={27} y={TALL.hubY + 5} textAnchor="middle" fontSize={13} fontWeight={800} fill="var(--ink)">
          MB
        </text>
      </svg>
    </>
  );
}
