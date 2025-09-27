export const projects = [
  // Featured Projects
  {
    id: "stealth-founder",
    name: "Stealth Founder",
    category: "Featured",
    punchline: "A custom computer vision pipeline for real-time photo intelligence.",
    description:
      "I’m building a specialized transformer-based computer vision system end-to-end: I designed the model, built a data-creation app so I can generate high-quality training sets quickly, and engineered a mobile↔cloud pipeline that clusters, captions, and retrieves 100k+ photos in real time. I obsess over throughput and correctness—multithreading, parallel algorithms, gRPC services, and websocket updates—so when I capture or upload on my phone, the GPU workers ingest, index, and surface results instantly. I treat the whole thing like a product: robust logging, versioned datasets, repeatable training, and deployable inference that actually holds up under load.",
    tools: ["PyTorch", "Python", "CUDA-class GPUs", "React Native", "Node.js", "gRPC", "WebSockets", "Docker", "Git"],
    size: "large",
    image: "/stealth/logo.png",
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
    punchline: "Live campus library occupancy tracking, acquired by the student union.",
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
    punchline: "SaaS for optimizing office seating plans with live, multiuser updates.",
    description:
      "A SaaS application designed to help companies reduce office costs by managing shared cubicles and seating plans. The front end features grid and canvas editors for layouts with instant, multiuser updates. The back end is a Node.js service with a MySQL schema that broadcasts database changes, ensuring all users see edits live. The application runs on AWS with autoscaling and CI/CD for reliable deployments and handling of traffic spikes.",
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
    punchline: "An automated pipeline that turns a text prompt into a YouTube video.",
    description:
      "An automated pipeline that transforms a single prompt into a published YouTube video. The process involves scraping online for story material, using GPT-4 to reshape it into a catchy script, fetching images and clips via media APIs, and then stitching everything together with MoviePy into a cohesive MP4 file. The pipeline is fully automated, with TTS narration and OAuth upload, allowing a video to go from an idea to live on YouTube in a single run within a minute, easy to create hundreds of videos daily.",
    tools: ["Python", "MoviePy", "GPT-4 (script editing)", "Requests/BS4 or Playwright (scraping)", "media APIs", "TTS", "YouTube Data API (OAuth)", "Git"],
    repoUrl: "https://github.com/zivbeh/auto-video-gen",
    size: "medium",
    image: "/textures/planets/vidgen.png",
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
    punchline: "A secure web messenger with 2FA, group chats, and a focus on UX.",
    description:
      "A secure web messenger developed before the current AI wave. It implements two-factor authentication, group chats, profile customization, and an SQL data model with clean permissioning. Significant effort was dedicated to perfecting auth flows and user experience to ensure sessions are secure and the interface is fast on all devices.",
    tools: ["Node.js/Express", "SQL (PostgreSQL/MySQL)", "JWT/sessions", "email/OTP 2FA", "HTML/CSS/JS (responsive)", "Git"],
    size: "medium",
    image: "/chatup/bg.png",
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
    punchline: "A fast, SEO-optimized marketing site for a venture studio.",
    description:
      "A fast, SEO-friendly marketing site designed and shipped for a venture studio. The project involved tuning metadata and OG tags, setting up Vercel hosting, and integrating a mailing system for leads and updates. The focus was on the details that matter for performance and visibility, such as image sizing, Core Web Vitals (CLS/LCP), and copy structure, rather than flashy effects.",
    tools: ["Next.js/React (site)", "Vercel (hosting)", "HTML/CSS", "SEO/OG metadata", "email service (SMTP/API)", "Git"],
    liveUrl: "https://www.capiros.ventures/",
    size: "medium",
    image: "/capirosventures/sitebg.png",
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
    punchline: "My first major project: a feature-rich to-do app with auth and notifications.",
    description:
      "A classic but feature-rich to-do application. It includes SQL persistence, email-based 2-step authentication, notifications, timers/reminders, priorities, and deep search/filtering. This project was an opportunity to learn how to wire authentication, scheduled jobs, and data models that remain simple as features are added.",
    tools: ["Node.js/Express", "SQL (PostgreSQL/MySQL)", "email OTP/2FA", "cron/schedulers", "HTML/CSS/JS", "Git"],
    repoUrl: "https://github.com/zivbeh/ToDoList",
    size: "medium",
    image: "/todolist/bg.png",
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
    punchline: "A classical music generator using an advanced Markov process.",
    description:
      "A classical-style music generator that uses a custom, improved Markov process, supporting effectively unbounded state and sequence length. It works directly with MIDI files, focusing on creating transitions that feel musical rather than random.",
    tools: ["Python", "MIDI libraries (mido/music21)", "custom Markov modeling", "Git"],
    size: "small",
    image: "/musicgen/bg.png",
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
    punchline: "A web app to see where friends are and plan summer meetups.",
    description:
      "A small web application for visualizing friends' locations over the summer and planning meetups. It was designed to be lightweight, with a simple sharing model, a map-based UI, and a user-friendly way to update status without spamming group chats.",
    tools: ["JavaScript/TypeScript", "HTML/CSS", "a mapping API (Google Maps or Leaflet)", "lightweight backend", "Git"],
    repoUrl: "https://github.com/zivbeh/AEPiInIsrael",
    size: "small",
    image: "/textures/planets/travelingmap.png",
    texture: "/textures/planets/travelingmap.png",
    theme: {
      surfaceColor1: "#86EFAC",
      surfaceColor2: "#16A34A",
      atmosphereColor: "#4ADE80",
    },
  },
  {
    id: "cs61c-cpu",
    name: "RISC-V CPU with parallelism",
    category: "Other",
    punchline: "A pipelined RISC-V CPU designed and tested in Logisim.",
    description:
      "A pipelined RISC-V CPU designed and tested in Logisim. The project involved laying out the datapath, writing the control logic, handling hazards, and verifying behavior against ISA-level tests. The experience taught the importance of keeping the pipeline honest and the timing predictable.",
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
    name: "Electric Guitar Amplifier",
    category: "Other",
    punchline: "A multi-stage guitar amplifier built from scratch with op-amps.",
    description:
      "A multi-stage guitar amplifier built and characterized with filters and op-amp gain stages on breadboards, then measured with lab equipment. The project involved tuning frequency response and gain/linearity while learning to chase noise and oscillations with an oscilloscope.",
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
    punchline: "A collaborative web strategy game with unit upgrades and tricky waves.",
    description: "A web strategy defense game where players place and upgrade units to pop increasingly tricky balloon waves. The game was co-built with a teammate overseas and uses the Canvas API for rendering. The game loop was tuned for responsiveness, and the project covered everything from mechanics to deployment. It encompases wise data structures for easy scalability and game state management.",
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
    punchline: "A platformer with a custom physics engine for wall-sticking.",
    description: "A minimal physics engine for wall-stick movement, gravity, and collisions for this coin-collecting web-based game, which is packed with blade hazards and effects. A lightweight level editor was also built to allow for authoring new stages and tweaking gameplay constants in minutes. It is a fun blend of physics and game mechanics.",
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
    punchline: "A celebratory arcade mini-game for my dad's birthday.",
    description: "A celebratory arcade mini-game where players collect coins, dodge moving obstacles, and unlock an animation and music finale upon winning. The game was designed for quick joy and a nice reveal for my dad's birthday.",
    tools: ["HTML5 Canvas", "JavaScript", "Audio APIs", "sprite/texture assets", "Git"],
    repoUrl: "https://github.com/zivbeh/babic-birth-day",
    size: "small",
    image: "/profile.JPG",
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
    punchline: "A Monopoly-style web game with a built-in strategy solver.",
    description: "A Monopoly-style web game with configurable rules and a strategy helper that computes the most profitable board squares. The project is a fun blend of probability/EV logic and an approachable UI.",
    tools: ["JavaScript/TypeScript", "HTML/CSS", "probability/simulation utilities", "Git"],
    repoUrl: "https://github.com/zivbeh/MonopolSolver",
    size: "small",
    image: "/Monopoly Solver/bg.png",
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
    punchline: "A browser-based Flappy Bird clone to master game loop fundamentals.",
    description: "This project reproduces the feel of Flappy Bird—frame timing, collision, difficulty ramp—purely in the browser. It was an exercise in sharpening fundamentals in game loops, assets, and hitboxes.",
    tools: ["HTML5 Canvas", "JavaScript", "sprite sheets", "Git"],
    size: "small",
    image: "/flafybird/bg.png",
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
    punchline: "A physics-based playground for experimenting with portals and gravity.",
    description: "A portal-and-gravity playground prototype where players navigate linked spaces under simple physics. It serves as a toybox for experimenting with movement and surprise.",
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
    punchline: "A low-latency browser toy for layering beats and triggering samples.",
    description: "A browser-based music toy that layers beats and triggers samples with low latency. The focus is on immediate feedback and playful controls.",
    tools: ["Web Audio API", "JavaScript", "HTML/CSS", "simple state management", "Git"],
    size: "small",
    image: "/djapp/dj.png",
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
    punchline: "A Java game featuring a procedural room generator.",
    description: "A Java game featuring a procedural room generator. It includes randomized layouts, data structures doing real work, and a straightforward rendering loop.",
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
    punchline: "A collection of 3D models designed for mechanical assembly and printing.",
    description:
      "A variety of models designed in Onshape, focusing on mechanical design, assembly, and 3D printing. The collection includes interlocking wooden modules for custom storage, a miniature Tie Fighter, a Minion figurine, a mini basketball desk game, and a compact marble maze. For each model, the focus was on tolerances, clean constraints, and design for manufacturability.",
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