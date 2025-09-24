export const projects = [
  // Featured Projects
  {
    id: "stealth-founder",
    name: "Stealth Founder",
    category: "Featured",
    description:
      "I’m building a specialized transformer-based computer vision system end-to-end: I designed the model, built a data-creation app so I can generate high-quality training sets quickly, and engineered a mobile↔cloud pipeline that clusters, captions, and retrieves 100k+ photos in real time. I obsess over throughput and correctness—multithreading, parallel algorithms, gRPC services, and websocket updates—so when I capture or upload on my phone, the GPU workers ingest, index, and surface results instantly. I treat the whole thing like a product: robust logging, versioned datasets, repeatable training, and deployable inference that actually holds up under load.",
    tools: ["PyTorch", "Python", "CUDA-class GPUs", "React Native", "Node.js", "gRPC", "WebSockets", "Docker", "Git"],
    size: "large",
    image: "/stealth-cv.svg",
    texture: "/textures/planets/stealth.png",
    theme: {
      surfaceColor1: "#CCCCCC", // Light gray
      surfaceColor2: "#666666", // Medium gray
      atmosphereColor: "#FFFFFF", // White
    },
  },
  {
    id: "library-seat-radar",
    name: "Library-Seat Radar (acquired)",
    category: "Featured",
    description:
      "I launched a real-time “seat radar” for UC Berkeley so students could stop wandering for desks. I wired Wi-Fi traffic sensors to a REST API and a live site that showed per-floor occupancy across campus libraries. We hit ~3.5k monthly active users in month one with ~30% WoW growth; I also spun up an Instagram channel that reached the whole campus (1,600+ followers; 200k+ views). The project was acquired by the ASUC (Student Union), and we were accepted to SkyDeck Pad-13—fun validation that speed + clarity solves real pain.",
    tools: ["Wi-Fi traffic sensors", "REST API", "Python/Node.js", "JavaScript/HTML/CSS", "basic analytics dashboards", "Git"],
    size: "large",
    image: "/library-seat-radar.svg",
    images: [
      "/status/StatusLogo.png",
      "/status/skydeck_berkeley_logo.jpeg",
      "/status/outreachStats.png",
      "/status/websiteEngagment.png",
      "/status/websitelook.png",
      "/status/wifiap.png",
    ],
    imageSpans: {
      // Use tailwind grid span classes; base grid has 2 cols, md has 6 cols
      // Tip: keep base at col-span-1/2; for md you can use md:col-span-1..6
      // Big hero chart/screen
      "websitelook.png": "col-span-2 row-span-2 md:col-span-3 md:row-span-3",
      // Logos medium squares
      "StatusLogo.png": "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
      "skydeck_berkeley_logo.jpeg": "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
      // Stats tall card
      "outreachStats.png": "col-span-1 row-span-2 md:col-span-2 md:row-span-3",
      // Analytics wide
      "websiteEngagment.png": "col-span-2 row-span-1 md:col-span-3 md:row-span-2",
      // Device photo tall
      "wifiap.png": "col-span-1 row-span-2 md:col-span-2 md:row-span-3",
    },
    texture: "/textures/planets/lib_radar.png",
    theme: {
      surfaceColor1: "#99ccff",
      surfaceColor2: "#0033cc",
      atmosphereColor: "#6699ff",
    },
  },
  // Other Projects
  {
    id: "ordercubic",
    name: "OrderCubic (QBook)",
    category: "Other",
    description:
      "I built a SaaS app that helps companies cut office costs by managing shared cubicles and seating plans. On the front end, I implemented grid/canvas editors for layouts with instant, multiuser updates; on the back end, I designed a Node.js service with a MySQL schema that broadcasts DB changes so everyone sees edits live. I run it on AWS with autoscaling and CI/CD so deploys and traffic spikes are boring—in the best way.",
    tools: ["Node.js", "TypeScript/JavaScript", "MySQL", "AWS (autoscaling, CI/CD)", "WebSockets/SSE", "Canvas/Grid UI", "Git"],
    repoUrl: "https://github.com/zivbeh/OrderCubic",
    size: "medium",
    images: [
      "/ordercubic/ordercubic.png",
      "/ordercubic/floorplan2.jpg",
      "/ordercubic.svg",
    ],
    texture: "/textures/planets/ordercubic.png",
    theme: {
      surfaceColor1: "#ffccff",
      surfaceColor2: "#cc00cc",
      atmosphereColor: "#ff99ff",
    },
  },
  {
    id: "ai-video-generator",
    name: "AI Video Generator",
    category: "Other",
    description:
      "I created a pipeline that turns a single prompt into a published YouTube video. I scrape story material, have GPT-4 reshape it into a script, fetch images/clips via media APIs, then stitch everything with MoviePy into a cohesive MP4. I added TTS narration and OAuth upload so the pipeline is truly hands-off—from idea to live video in one run.",
    tools: ["Python", "MoviePy", "GPT-4 (script editing)", "Requests/BS4 or Playwright (scraping)", "media APIs", "TTS", "YouTube Data API (OAuth)", "Git"],
    repoUrl: "https://github.com/zivbeh/auto-video-gen",
    size: "medium",
    images: [],
    videos: [
      "/aividgen/version1.mp4",
      "/aividgen/version2.mp4",
    ],
    texture: "/textures/planets/vidgen.png",
    theme: {
      surfaceColor1: "#ccffcc",
      surfaceColor2: "#00cc00",
      atmosphereColor: "#99ff99",
    },
  },
  {
    id: "chatup",
    name: "Chatup (pre-generative AI)",
    category: "Other",
    description:
      "I built a secure web messenger before the current AI wave. I implemented two-factor auth, group chats, profile customization, and an SQL data model with clean permissioning. Most of the effort went into getting auth flows and UX right so sessions are safe and the interface feels fast on every device.",
    tools: ["Node.js/Express", "SQL (PostgreSQL/MySQL)", "JWT/sessions", "email/OTP 2FA", "HTML/CSS/JS (responsive)", "Git"],
    size: "medium",
    texture: "/textures/planets/chatup.png",
    theme: {
      surfaceColor1: "#FDBA74",
      surfaceColor2: "#EA580C",
      atmosphereColor: "#FB923C",
    },
  },
  {
    id: "capiros-ventures-website",
    name: "Capiros Ventures Website",
    category: "Other",
    description:
      "I designed and shipped a fast, SEO-friendly marketing site for a venture studio. I tuned metadata and OG tags, set up Vercel hosting, and integrated a mailing system for leads and updates. It’s the kind of project where details—image sizing, CLS/LCP, copy structure—matter more than flashy effects.",
    tools: ["Next.js/React (site)", "Vercel (hosting)", "HTML/CSS", "SEO/OG metadata", "email service (SMTP/API)", "Git"],
    liveUrl: "https://www.capiros.ventures/",
    size: "medium",
    texture: "/textures/planets/caprios.png",
    theme: {
      surfaceColor1: "#67E8F9",
      surfaceColor2: "#0891B2",
      atmosphereColor: "#22D3EE",
    },
  },
  {
    id: "todolist",
    name: "ToDoList (my first big project)",
    category: "Other",
    description:
      "I went all-in on a classic but feature-rich to-do app: SQL persistence, email-based 2-step auth, notifications, timers/reminders, priorities, and deep search/filtering. It’s where I learned to wire authentication, scheduled jobs, and data models that stay simple as features pile up.",
    tools: ["Node.js/Express", "SQL (PostgreSQL/MySQL)", "email OTP/2FA", "cron/schedulers", "HTML/CSS/JS", "Git"],
    repoUrl: "https://github.com/zivbeh/ToDoList",
    size: "medium",
    texture: "/textures/planets/todolist'.png",
    theme: {
      surfaceColor1: "#FDE047",
      surfaceColor2: "#EAB308",
      atmosphereColor: "#FACC15",
    },
  },
  {
    id: "music-generator",
    name: "Music Generator (Infinite Markov)",
    category: "Other",
    description:
      "I wrote a classical-style music generator using an improved Markov process that supports effectively unbounded state and sequence length. I work with MIDI files directly, focusing on transitions that feel musical rather than random.",
    tools: ["Python", "MIDI libraries (mido/music21)", "custom Markov modeling", "Git"],
    size: "small",
    texture: "/textures/planets/musicgen.png",
    theme: {
      surfaceColor1: "#C4B5FD",
      surfaceColor2: "#7C3AED",
      atmosphereColor: "#A78BFA",
    },
  },
  {
    id: "summer-friends-map",
    name: "Summer Friends Map & Hangouts",
    category: "Other",
    description:
      "I built a small web app to visualize where my friends are over the summer and plan meetups. I kept it lightweight: a simple auth/sharing model, a map UI, and a friendly way to update status without spamming group chats.",
    tools: ["JavaScript/TypeScript", "HTML/CSS", "a mapping API (Google Maps or Leaflet)", "lightweight backend", "Git"],
    repoUrl: "https://github.com/zivbeh/AEPiInIsrael",
    size: "small",
    texture: "/textures/planets/travelingmap.png",
    theme: {
      surfaceColor1: "#86EFAC",
      surfaceColor2: "#16A34A",
      atmosphereColor: "#4ADE80",
    },
  },
  {
    id: "cs61c-cpu",
    name: "CS61C RISC-V CPU (class project)",
    category: "Other",
    description:
      "I designed and tested a pipelined RISC-V CPU in Logisim. I laid out the datapath, wrote the control logic, handled hazards, and verified behavior against ISA-level tests. It taught me to keep the pipeline honest and the timing predictable.",
    tools: ["Logisim", "RISC-V ISA/specs", "unit tests/trace benches", "Git"],
    size: "medium",
    images: [
      "/c61cpu/datapath.png",
      "/c61cpu/datapathinlogisim.png",
      "/c61cpu/arithmeticunit.png",
    ],
    texture: "/textures/planets/61cpu.png",
    theme: {
      surfaceColor1: "#FDA4AF",
      surfaceColor2: "#E11D48",
      atmosphereColor: "#FB7185",
    },
  },
  {
    id: "electric-guitar-amplifier",
    name: "Electric Guitar Amplifier (EECS16B)",
    category: "Other",
    description:
      "I built and characterized a multi-stage guitar amp with filters and op-amp gain stages on breadboards, then measured it with lab gear. I tuned frequency response and gain/linearity while learning to chase noise and oscillations with a scope.",
    tools: ["Breadboards", "op-amps/passives", "signal generator", "oscilloscope", "DMM", "(optionally) SPICE"],
    size: "small",
    images: [
      "/guitarAMP/guitar.jpeg",
    ],
    texture: "/textures/planets/guitaramplifier.png",
    theme: {
      surfaceColor1: "#F0ABFC",
      surfaceColor2: "#C026D3",
      atmosphereColor: "#E879F9",
    },
  },
  // Games
  {
    id: "balloons-pop",
    name: "Balloons Pop",
    category: "Games",
    description: "I co-built a web strategy game where you place and upgrade units and pop increasingly tricky balloon waves. I used the Canvas API for rendering, tuned the game loop for responsiveness, and handled everything from mechanics to deployment with a teammate overseas.",
    tools: ["HTML5 Canvas", "JavaScript", "CSS3", "sprite/animation pipeline", "Git"],
    liveUrl: "https://zivbeh.github.io/BalloonsPOP/",
    size: "medium",
    images: [
      "/balloonspopgame/choose world.png",
      "/balloonspopgame/map.png",
    ],
    theme: {
      surfaceColor1: "#FCA5A5",
      surfaceColor2: "#DC2626",
      atmosphereColor: "#F87171",
    },
  },
  {
    id: "sticky-fred",
    name: "Sticky Fred",
    category: "Games",
    description: "I wrote a minimal physics engine for wall-stick movement, gravity, and collisions, then built a coin-collecting platformer packed with blade hazards and effects. I also built a lightweight level editor so I can author new stages and tweak gameplay constants in minutes.",
    tools: ["HTML5 Canvas", "JavaScript", "custom physics/collision", "simple level editor (JSON/objects)", "Git"],
    size: "medium",
    images: [
      "/stickyfred/entirepage.png",
      "/stickyfred/gameover.png",
    ],
    theme: {
      surfaceColor1: "#FCD34D",
      surfaceColor2: "#D97706",
      atmosphereColor: "#FBBF24",
    },
  },
  {
    id: "birthday-game",
    name: "Birthday Game for My Dad",
    category: "Games",
    description: "I made a celebratory arcade mini-game where you collect coins, dodge moving obstacles, and unlock an animation + music finale when you win—designed for quick joy and a nice reveal.",
    tools: ["HTML5 Canvas", "JavaScript", "Audio APIs", "sprite/texture assets", "Git"],
    repoUrl: "https://github.com/zivbeh/babic-birth-day",
    size: "small",
    theme: {
      surfaceColor1: "#A5B4FC",
      surfaceColor2: "#4F46E5",
      atmosphereColor: "#818CF8",
    },
  },
  {
    id: "monopolsolver",
    name: "MonopolSolver",
    category: "Games",
    description: "I built a Monopoly-style web game with configurable rules and a strategy helper that computes the most profitable board squares. It’s a fun blend of probability/EV logic and an approachable UI.",
    tools: ["JavaScript/TypeScript", "HTML/CSS", "probability/simulation utilities", "Git"],
    repoUrl: "https://github.com/zivbeh/MonopolSolver",
    size: "small",
    theme: {
      surfaceColor1: "#93C5FD",
      surfaceColor2: "#2563EB",
      atmosphereColor: "#60A5FA",
    },
  },
  {
    id: "flappy-bird-clone",
    name: "Flappy Bird Clone",
    category: "Games",
    description: "I reproduced the feel of Flappy Bird—frame timing, collision, difficulty ramp—purely in the browser to sharpen fundamentals in loops, assets, and hitboxes.",
    tools: ["HTML5 Canvas", "JavaScript", "sprite sheets", "Git"],
    size: "small",
    theme: {
      surfaceColor1: "#6EE7B7",
      surfaceColor2: "#059669",
      atmosphereColor: "#34D399",
    },
  },
  {
    id: "moneyportal",
    name: "MoneyPortal",
    category: "Games",
    description: "I prototyped a portal-and-gravity playground where you navigate linked spaces under simple physics. It’s a toybox for experimenting with movement and surprise.",
    tools: ["HTML5 Canvas", "JavaScript", "custom physics", "level configs", "Git"],
    size: "small",
    images: [
      "/MoneyPortal/start.png",
      "/MoneyPortal/portals!.png",
    ],
    theme: {
      surfaceColor1: "#F9A8D4",
      surfaceColor2: "#DB2777",
      atmosphereColor: "#F472B6",
    },
  },
  {
    id: "dj-game",
    name: "DJ Game",
    category: "Games",
    description: "I built a browser music toy that layers beats and triggers samples with low latency. It’s all about immediate feedback and playful controls.",
    tools: ["Web Audio API", "JavaScript", "HTML/CSS", "simple state management", "Git"],
    size: "small",
    theme: {
      surfaceColor1: "#F97316",
      surfaceColor2: "#9A3412",
      atmosphereColor: "#FB923C",
    },
  },
  {
    id: "java-game-room",
    name: "Java Game Room",
    category: "Games",
    description: "I implemented a Java game with a procedural room generator—randomized layouts, data structures doing real work, and a straightforward rendering loop.",
    tools: ["Java", "OOP design", "RNG/procedural gen", "lightweight renderer", "Git"],
    liveUrl: "https://sp25.datastructur.es/projects/proj3/",
    size: "small",
    images: [
      "/roomgame/Screenshot 2025-09-22 230008.png",
      "/roomgame/seed441.png",
    ],
theme: {
      surfaceColor1: "#F87171",
      surfaceColor2: "#B91C1C",
      atmosphereColor: "#EF4444",
    },
  },
  {
    id: "cad-designs",
    name: "3D CAD Designs",
    category: "Other",
    description:
      "I designed a variety of models in Onshape, focusing on mechanical design, assembly, and 3D printing. Projects include interlocking wooden modules for custom storage, a miniature Tie Fighter, a Minion figurine, a mini basketball desk game, and a compact marble maze. For each, I focused on tolerances, clean constraints, and design for manufacturability.",
    tools: ["Onshape", "3D Printing (STL Export)"],
    size: "medium",
    images: [
      "/3dprojs/minion.png",
      "/3dprojs/tiefighter.png",
      "/3dprojs/basketball.png",
      "/3dprojs/marblegame.png",
      "/3dprojs/boxes.png",
    ],
    texture: "/textures/planets/ordercubic.png",
    theme: {
      surfaceColor1: "#CA8A04",
      surfaceColor2: "#A16207",
      atmosphereColor: "#EAB308",
    },
  },
];