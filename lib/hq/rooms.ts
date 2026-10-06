export type FloorId = "G" | "L1" | "L2";
export type Zone =
  | "Community"
  | "Collaboration"
  | "Workspace"
  | "Production"
  | "Leadership"
  | "Wellbeing";
export type Room = {
  id: string;
  floor: FloorId;
  name: string;
  short: string;
  area: number;
  capacity: string;
  zone: Zone;
  rect: [number, number, number, number];
  description: string;
  features: string[];
  action?: string;
  furniture:
    | "desks"
    | "meeting"
    | "cafe"
    | "forum"
    | "studio"
    | "podcast"
    | "library"
    | "office"
    | "plant"
    | "racks"
    | "bench";
};
export const zones: Record<Zone, string> = {
  Community: "#d8b983",
  Collaboration: "#c3a675",
  Workspace: "#99b8bb",
  Production: "#88a5bd",
  Leadership: "#c2ac76",
  Wellbeing: "#a8bba1",
};
export const floors = [
  {
    id: "L2" as FloorId,
    name: "The Engine Room",
    subtitle: "Engineering, operations & leadership",
    height: "3.6 m",
    desks: 33,
    access: "Staff · clients with escort",
    color: "#98babc",
    intro:
      "Quiet confidence. Two engineering squads, a visible command centre, and room to think ahead.",
  },
  {
    id: "L1" as FloorId,
    name: "The Studio",
    subtitle: "Creative work, content & quiet",
    height: "4.2 m",
    desks: 18,
    access: "Staff · escorted guests",
    color: "#a6b49a",
    intro:
      "Ideas become tangible here. A complete production suite sits beside the creative floor, with a quieter side for recovery and reflection.",
  },
  {
    id: "G" as FloorId,
    name: "The Commons",
    subtitle: "Arrival, community & client conversations",
    height: "4.5 m",
    desks: 1,
    access: "Visitors · partners · staff",
    color: "#d8b983",
    intro:
      "The front room of the marketplace. A generous welcome, a place to meet, and a community that has somewhere to belong.",
  },
];
export const rooms: Room[] = [
  {
    id: "arrival",
    floor: "G",
    name: "Arrival hall & reception",
    short: "Arrival",
    area: 60,
    capacity: "Host + 2 meeting pods",
    zone: "Community",
    rect: [7.6, 8, 9.7, 7],
    description:
      "A direct line from the front door to the lift, with a host desk watching the entrance and the single security line.",
    features: [
      "Two enclosed meeting pods",
      "Step-free arrival",
      "4.5 m floor-to-floor",
    ],
    action: "Overview",
    furniture: "plant",
  },
  {
    id: "forum",
    floor: "G",
    name: "Forum & town hall",
    short: "Forum",
    area: 94,
    capacity: "~75 seated · ~100 with lobby",
    zone: "Community",
    rect: [0, 0, 10.4, 8],
    description:
      "A lounge on ordinary days. A stage for the whole community when it matters, with three tiers of step seating and stored event chairs.",
    features: [
      "4.2 × 2.4 m LED wall",
      "Three-tier step seating",
      "Stage at +300 mm",
    ],
    furniture: "forum",
  },
  {
    id: "cafe",
    floor: "G",
    name: "Work café",
    short: "Work café",
    area: 60,
    capacity: "28 powered seats",
    zone: "Community",
    rect: [17.3, 8, 8.7, 7],
    description:
      "Coffee, conversations and a place for partners to touch down. Power at every seat and partner lockers make it a working part of HQ.",
    features: ["Coffee bar", "Partner lockers", "Power at every seat"],
    furniture: "cafe",
  },
  {
    id: "boardroom",
    floor: "G",
    name: "Client boardroom",
    short: "Boardroom",
    area: 28,
    capacity: "10 seats",
    zone: "Collaboration",
    rect: [0, 9, 4.5, 6],
    description:
      "Client decisions stay close to arrival, before the security line. A dedicated setting for presentations and shared approvals.",
    features: [
      "Video-call ready",
      "Acoustic target: STC 53",
      "Client-facing suite",
    ],
    action: "Approvals",
    furniture: "meeting",
  },
  {
    id: "meeting",
    floor: "G",
    name: "Meeting room",
    short: "Meeting",
    area: 11,
    capacity: "6 seats",
    zone: "Collaboration",
    rect: [4.5, 9, 3.1, 3.7],
    description:
      "A compact room for useful conversations, short reviews and client catch-ups.",
    features: [
      "Six-person table",
      "Ground-floor access",
      "Shared review screen",
    ],
    action: "Meetings",
    furniture: "meeting",
  },
  {
    id: "interview",
    floor: "G",
    name: "Interview & partner vetting",
    short: "Interview",
    area: 7,
    capacity: "3 seats",
    zone: "Collaboration",
    rect: [4.5, 12.7, 3.1, 2.3],
    description:
      "A private, welcoming space for partner assessments and introductions to the Tigotek network.",
    features: [
      "Three-person setting",
      "Acoustic target: STC 45",
      "Beside reception",
    ],
    action: "Team",
    furniture: "meeting",
  },
  {
    id: "creative",
    floor: "L1",
    name: "Creative & media studio",
    short: "Creative & media",
    area: 87,
    capacity: "16 desks",
    zone: "Workspace",
    rect: [3.6, 9.6, 12.8, 5.4],
    description:
      "Four collaborative desk clusters, a pin-up wall and daylight. Screens sit at right angles to the glazing to limit glare.",
    features: [
      "16 assigned desks",
      "Pin-up wall",
      "Phone pods beside the core",
    ],
    action: "Tasks",
    furniture: "desks",
  },
  {
    id: "review",
    floor: "L1",
    name: "Creative review",
    short: "Review",
    area: 15,
    capacity: "6 seats",
    zone: "Collaboration",
    rect: [0, 10.3, 3.6, 4.7],
    description:
      "A focused place to see the work together, compare directions and capture clear feedback.",
    features: [
      "Colour-calibrated screen",
      "Six seats",
      "Alongside the creative floor",
    ],
    action: "Feedback",
    furniture: "meeting",
  },
  {
    id: "cyc",
    floor: "L1",
    name: "Studio A · cyclorama",
    short: "Studio A",
    area: 46,
    capacity: "Photo & video production",
    zone: "Production",
    rect: [0, 0, 6.3, 7.5],
    description:
      "A controlled photo and video environment with a two-wall cyclorama, lighting grid and its own quiet cooling zone.",
    features: [
      "46 m² production floor",
      "Lighting grid at ~3.2 m",
      "Isolated acoustic envelope",
    ],
    action: "Assets",
    furniture: "studio",
  },
  {
    id: "control",
    floor: "L1",
    name: "Control & edit",
    short: "Control / edit",
    area: 13,
    capacity: "2 editing desks",
    zone: "Production",
    rect: [6.3, 4.4, 4.1, 3.1],
    description:
      "One shared control desk looks through glass into both the cyclorama and podcast booth.",
    features: [
      "Two editing stations",
      "Sightlines to both studios",
      "Shared production control",
    ],
    action: "Staging",
    furniture: "desks",
  },
  {
    id: "podcast",
    floor: "L1",
    name: "Podcast booth",
    short: "Podcast",
    area: 18,
    capacity: "4 seats + cameras",
    zone: "Production",
    rect: [6.3, 0, 4.1, 4.4],
    description:
      "A room within a room, isolated from the rest of the building for clear, intimate recording.",
    features: [
      "Four-person recording table",
      "Two-camera setup",
      "Acoustic window to control",
    ],
    action: "Assets",
    furniture: "podcast",
  },
  {
    id: "green",
    floor: "L1",
    name: "Green room",
    short: "Green room",
    area: 8,
    capacity: "Guest arrival & waiting",
    zone: "Production",
    rect: [6.3, 7.5, 4.1, 2.1],
    description:
      "The studio’s single controlled entrance. Shoot guests arrive without crossing the creative work floor.",
    features: ["Direct suite entry", "Guest seating", "Controlled access"],
    furniture: "office",
  },
  {
    id: "soundlock",
    floor: "L1",
    name: "Sound lock & make-up",
    short: "Sound lock",
    area: 7,
    capacity: "Preparation zone",
    zone: "Production",
    rect: [2.5, 7.5, 3.8, 2.1],
    description:
      "A preparation zone and acoustic threshold between the corridor and the production suite.",
    features: [
      "Acoustic double doors",
      "Make-up counter",
      "Studio noise buffer",
    ],
    furniture: "bench",
  },
  {
    id: "kit",
    floor: "L1",
    name: "Kit store",
    short: "Kit store",
    area: 5,
    capacity: "Cameras, lights & props",
    zone: "Production",
    rect: [0, 7.5, 2.5, 2.1],
    description:
      "Production equipment stays close to the studio in a dedicated, controlled store.",
    features: ["Camera storage", "Lighting equipment", "Props and accessories"],
    action: "Assets",
    furniture: "racks",
  },
  {
    id: "library",
    floor: "L1",
    name: "Library & thinking room",
    short: "Library",
    area: 43,
    capacity: "Quiet · no calls",
    zone: "Wellbeing",
    rect: [16.4, 10.5, 9.6, 4.5],
    description:
      "One room for reading, thinking and concentration, with daylight on two sides and a window reading bench.",
    features: [
      "Acoustic target: NC 30",
      "Books line the buffer wall",
      "Window reading bench",
    ],
    furniture: "library",
  },
  {
    id: "wellness",
    floor: "L1",
    name: "Wellness & parent room",
    short: "Wellness",
    area: 5,
    capacity: "Private room",
    zone: "Wellbeing",
    rect: [17.7, 8, 2, 2.5],
    description:
      "A lockable room for wellbeing and parenting needs, away from busy work areas.",
    features: ["Lockable door", "Sink and fridge", "Quiet location"],
    furniture: "office",
  },
  {
    id: "prayer-w",
    floor: "L1",
    name: "Prayer · women",
    short: "Prayer W",
    area: 6,
    capacity: "6–8 places",
    zone: "Wellbeing",
    rect: [19.7, 8, 2.6, 2.5],
    description:
      "A dedicated prayer room beside the wudu facilities. Final orientation is set on site.",
    features: ["6–8 prayer places", "Wudu next door", "Qibla set on site"],
    furniture: "plant",
  },
  {
    id: "prayer-m",
    floor: "L1",
    name: "Prayer · men",
    short: "Prayer M",
    area: 9,
    capacity: "10–12 places",
    zone: "Wellbeing",
    rect: [22.3, 8, 3.7, 2.5],
    description:
      "A dedicated prayer room beside the wudu facilities, with a quiet threshold from the work floor.",
    features: ["10–12 prayer places", "Wudu next door", "Qibla set on site"],
    furniture: "plant",
  },
  {
    id: "engineering",
    floor: "L2",
    name: "Engineering · squads A & B",
    short: "Engineering",
    area: 95,
    capacity: "24 desks + 4 pods",
    zone: "Workspace",
    rect: [0, 8, 13.6, 7],
    description:
      "Two squads share four desk clusters. The technical lead sits with the team, close to the war room, with a phone pod at every cluster end.",
    features: [
      "24 engineering desks",
      "Four cluster-end pods",
      "Eight-desk growth option",
    ],
    action: "Tasks",
    furniture: "desks",
  },
  {
    id: "war",
    floor: "L2",
    name: "War room",
    short: "War room",
    area: 18,
    capacity: "8 seats",
    zone: "Collaboration",
    rect: [13.6, 10.4, 4.1, 4.6],
    description:
      "Ceremonies, planning and concentrated problem-solving happen beside the squads, against wall-to-wall whiteboards.",
    features: [
      "Eight-person table",
      "Whiteboard walls",
      "Acoustic target: STC 45",
    ],
    action: "Progress",
    furniture: "meeting",
  },
  {
    id: "director",
    floor: "L2",
    name: "Director’s office",
    short: "Director",
    area: 18,
    capacity: "1 desk + 4 visitors",
    zone: "Leadership",
    rect: [17.7, 10.4, 4.1, 4.6],
    description:
      "A right-sized office on the quieter end of the floor, with a glazed front and privacy blinds.",
    features: [
      "18 m² office",
      "Four visitor seats",
      "Glazed front with blinds",
    ],
    action: "Approvals",
    furniture: "office",
  },
  {
    id: "ceo",
    floor: "L2",
    name: "CEO’s office",
    short: "CEO",
    area: 20,
    capacity: "1 desk + 4 at table",
    zone: "Leadership",
    rect: [21.8, 10.4, 4.2, 4.6],
    description:
      "A calm leadership room overlooking the front of the building, sized for focused work and small conversations.",
    features: [
      "20 m² office",
      "Four-person meeting table",
      "Acoustic target: STC 45",
    ],
    action: "Overview",
    furniture: "office",
  },
  {
    id: "executive",
    floor: "L2",
    name: "Executive zone & EA",
    short: "Executive / EA",
    area: 20,
    capacity: "EA desk, print & storage",
    zone: "Leadership",
    rect: [17.7, 8, 8.3, 2.4],
    description:
      "A shared threshold for leadership with an assistant’s desk, storage and print support.",
    features: ["EA workstation", "Shared print point", "Leadership support"],
    action: "Meetings",
    furniture: "bench",
  },
  {
    id: "pantry",
    floor: "L2",
    name: "Pantry",
    short: "Pantry",
    area: 10,
    capacity: "6 stools",
    zone: "Community",
    rect: [13.6, 8, 4.1, 2.4],
    description:
      "A small refreshment point that keeps everyday breaks close to the work floor.",
    features: ["Sink and fridge", "Six stools", "Near engineering"],
    furniture: "cafe",
  },
  {
    id: "noc",
    floor: "L2",
    name: "NOC · command centre",
    short: "Command centre",
    area: 40,
    capacity: "6 operations desks",
    zone: "Production",
    rect: [0, 0, 6.1, 6.4],
    description:
      "The operation is visible through corridor glass. Six seats face a video wall, while critical hardware stays secured in its own room.",
    features: ["Six-seat command floor", "Video wall", "Dedicated UPS circuit"],
    action: "Activity",
    furniture: "desks",
  },
  {
    id: "techbench",
    floor: "L2",
    name: "Tech bench",
    short: "Tech bench",
    area: 12,
    capacity: "2 ESD benches",
    zone: "Production",
    rect: [6.1, 3.7, 4.3, 2.7],
    description:
      "A dedicated build and repair space, immediately beside the NOC and equipment stores.",
    features: ["Two ESD workbenches", "Build and repair", "Close to spares"],
    action: "Assets",
    furniture: "bench",
  },
  {
    id: "mdf",
    floor: "L2",
    name: "MDF communications room",
    short: "MDF",
    area: 9,
    capacity: "2 × 42U racks",
    zone: "Production",
    rect: [6.1, 0, 2.7, 3.7],
    description:
      "Critical infrastructure has its own controlled room, with independent cooling and backup power.",
    features: ["Two 42U racks", "N+1 cooling target", "Card and PIN access"],
    furniture: "racks",
  },
  {
    id: "itstore",
    floor: "L2",
    name: "IT store",
    short: "IT store",
    area: 6,
    capacity: "Devices & spares",
    zone: "Production",
    rect: [8.8, 0, 1.6, 3.7],
    description:
      "Secure storage for devices and service spares, next to the technical bench.",
    features: [
      "Controlled equipment store",
      "Devices and spares",
      "Beside tech operations",
    ],
    action: "Assets",
    furniture: "racks",
  },
];
