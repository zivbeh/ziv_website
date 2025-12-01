export const projects = [
  {
    id: "stealth-founder",
    name: "Stealth Founder (Present)",
    category: "Other",
    punchline: "A custom computer vision pipeline for real-time photo intelligence.",
    description:
      "I’m building a specialized transformer-based computer vision system end-to-end: I designed the model, built a data-creation app so I can generate high-quality training sets quickly, and engineered a mobile↔cloud pipeline that clusters, captions, and retrieves 100k+ photos in real time. I obsess over throughput and correctness—multithreading, parallel algorithms, gRPC services, and websocket updates—so when I capture or upload on my phone, the GPU workers ingest, index, and surface results instantly. I treat the whole thing like a product: robust logging, versioned datasets, repeatable training, and deployable inference that actually holds up under load.",
    tools: ["PyTorch", "Transformer vision models", "CUDA", "React Native", "Node.js", "gRPC", "WebSockets"],
    size: "large",
    image: "/stealth/Stealth.png",
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
    category: "Other",
    punchline: "Live campus library occupancy tracking, acquired by UC Berkeley. Accepted to SkyDeck Pad-13.",
    description:
      "Launched a real-time “seat radar” for UC Berkeley so students could stop wandering for desks. I wired Wi-Fi traffic sensors to a REST API and a live site that showed per-floor occupancy across campus libraries. We hit ~3.5k monthly active users in month one with ~30% WoW growth! We also spun up an Instagram channel that reached the whole campus (1,600+ followers; 200k+ views). The project was acquired by the ASUC (UC Berkeley Student Union), and we were accepted to SkyDeck Pad-13. Fun validation that speed + clarity solves real pain.",
    tools: ["Startups", "Wi-Fi AP sensors", "API Design", "Python/Node.js", "React", "production workflows", "marketing", "Git"],
    repoUrl: "https://github.com/zivbeh/MoffittStatus",
    size: "large",
    image: "/status/Status Logo.png",
    images: [
      "/status/Status Logo.png",
      "/status/Berkeley Skydeck Incubator.jpeg",
      "/status/Outreach Stats One Month After Launch.png",
      "/status/Website Engagment.png",
      "/status/Status Website Look.png",
      "/status/Example Wi-Fi AP.png",
    ],
    imageSpans: {
      // Use tailwind grid span classes; base grid has 2 cols, md has 9 cols
      // Logos medium squares
      "Status Logo.png": "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
      "Berkeley Skydeck Incubator.jpeg":
        "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
      // Stats tall card - larger, spans more columns and rows
      "Outreach Stats One Month After Launch.png":
        "col-span-2 row-span-2 md:col-span-5 md:row-span-4",
      "Website Engagment.png": "col-span-2 row-span-2 md:col-span-4 md:row-span-2",
      // Website look and AP side by side, same height, each taking 4 cols to fill all 8
      "Status Website Look.png":
        "col-span-2 row-span-2 md:col-span-5 md:row-span-4",
      "Example Wi-Fi AP.png":
        "col-span-2 row-span-2 md:col-span-4 md:row-span-4",
    },
    texture: "/textures/planets/lib_radar.png",
    theme: {
      surfaceColor1: "#99ccff",
      surfaceColor2: "#0033cc",
      atmosphereColor: "#6699ff",
    },
  },
  // Featured Projects
  {
    id: "percepta",
    name: "Personal AI IDE for Code Generation",
    category: "Other",
    punchline: "A personal Cursor clone with my own LLMs: a VS Code extension that autonomously analyzes repos, thinks, edits code, and verifies execution.",
    description:
      "A VS Code extension chatbot that serves as a personal AI coding assistant. It intelligently finds relevant information from all files in a repository, reasons through problems, autonomously edits code, and verifies execution without human intervention. Built as a personal alternative to Cursor, it integrates multiple LLM providers (Gemini, GPT-4, Claude) and provides context-aware assistance by analyzing the entire codebase structure. The extension can analyze code files, process images, manage multiple chat sessions, and perform autonomous code generation and verification workflows.",
    tools: ["VS Code Extension API", "TypeScript", "LLM Integration", "AI agents", "Git"],
    repoUrl: "https://github.com/zivbeh/Percepta",
    size: "large",
    image: "/percepta/background.svg",
    texture: "/textures/planets/percepta.png",
    theme: {
      surfaceColor1: "#9333EA",
      surfaceColor2: "#6B21A8",
      atmosphereColor: "#A855F7",
    },
  },
  {
    id: "academics",
    name: "Academics",
    category: "Academics",
    punchline: "Coursework and projects from my time at UC Berkeley.",
    description:
      "A summary of my academic journey at UC Berkeley, highlighting key courses in Electrical Engineering and Computer Sciences. This includes projects, core concepts, and tools I've mastered.",
    tools: ["RISC-V", "Logisim", "SPICE", "MATLAB", "Python", "C++", "Java"],
    size: "large",
    texture: "/berk.jpg",
    theme: {
      surfaceColor1: "#003262",
      surfaceColor2: "#FDB515",
      atmosphereColor: "#3B7EA1",
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
      "/ordercubic/Floorplan for the App.png",
      "/ordercubic/Floorplan2.jpg",
    ],
    imageSpans: {
      // Stack images vertically, each taking full width and proportional height
      "Floorplan for the App.png":
        "col-span-2 row-span-2 md:col-span-9 md:row-span-4",
      "Floorplan2.jpg": "col-span-2 row-span-2 md:col-span-9 md:row-span-5",
    },
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
    tools: ["Python", "MoviePy", "AI Agents", "Scraping", "media APIs", "TTS", "YouTube Data API (OAuth)", "Git"],
    repoUrl: "https://github.com/zivbeh/auto-video-gen",
    size: "medium",
    videos: [
      "/aividgen/version2.mp4",
      "/aividgen/version1.mp4",
    ],
    imageSpans: {
      // Stack videos vertically with proportional sizes - version2 is taller, version1 is wider
      "version2.mp4": "col-span-2 row-span-2 md:col-span-9 md:row-span-5",
      "version1.mp4": "col-span-2 row-span-2 md:col-span-9 md:row-span-4",
    },
    texture: "/textures/planets/vidgen.png",
    theme: {
      surfaceColor1: "#ccffcc",
      surfaceColor2: "#00cc00",
      atmosphereColor: "#99ff99",
    },
  },
  {
    id: "cs61c-cpu",
    name: "RISC-V CPU with parallelism",
    category: "Other",
    punchline: "A pipelined RISC-V CPU designed and tested in Logisim.",
    description:
      "A pipelined RISC-V CPU designed and tested in Logisim. The project involved laying out the datapath, writing the control logic, handling hazards, and verifying behavior against ISA-level tests. The experience taught the importance of keeping the pipeline honest and the timing predictable.",
    tools: ["Logisim", "RISC-V ISA/specs", "path optimization"],
    size: "medium",
    images: [
      "/c61cpu/RISC-V Datapath.png",
      "/c61cpu/Data Path in Logisim.png",
      "/c61cpu/Arithmetic Unit of CPU.png",
    ],
    imageSpans: {
      // On desktop: two datapath images stacked on left (5 cols each), arithmeticunit on right spanning top to bottom (4 cols)
      // On mobile: all stacked vertically as big boxes
      "RISC-V Datapath.png":
        "col-span-1 row-span-3 md:col-span-5 md:row-span-5",
      "Data Path in Logisim.png":
        "col-span-1 row-span-3 md:col-span-5 md:row-span-5",
      // Arithmetic unit positioned on right, spanning full height (matches 5+5 rows of the two datapath images)
      "Arithmetic Unit of CPU.png":
        "col-span-1 row-span-3 md:col-span-4 md:row-span-10 md:col-start-6 md:row-start-1",
    },
    texture: "/textures/planets/61cpu.png",
    theme: {
      surfaceColor1: "#FDA4AF",
      surfaceColor2: "#E11D48",
      atmosphereColor: "#FB7185",
    },
  },
  {
    id: "music-generator",
    name: "Music Generator (Infinite Markov)",
    category: "Other",
    punchline: "A classical music generator using an advanced Markov process.",
    description:
      "A classical-style music generator that uses a custom, improved Markov process, supporting effectively unbounded state and sequence length. It works directly with MIDI files, focusing on creating transitions that feel musical rather than random.",
    customLink: {
      url: "https://github.com/zivbeh/Infinite-States-General-Markov",
      label: "Link to Custom Markov",
    },
    tools: ["Java", "MIDI", "custom Markov modeling", "Git"],
    size: "small",
    image: "/musicgen/background.png",
    texture: "/textures/planets/musicgen.png",
    theme: {
      surfaceColor1: "#C4B5FD",
      surfaceColor2: "#7C3AED",
      atmosphereColor: "#A78BFA",
    },
  },
  {
    id: "electric-guitar-amplifier",
    name: "Electric Guitar Amplifier",
    category: "Other",
    punchline: "A multi-stage guitar amplifier built from scratch with op-amps.",
    description:
      "A multi-stage guitar amplifier built and characterized with filters and op-amp gain stages on breadboards, then measured with lab equipment. The project involved tuning frequency response and gain/linearity while learning to chase noise and oscillations with an oscilloscope.",
    tools: ["Breadboards", "op-amps/passives", "signal generator", "oscilloscope", "DMM", "SPICE"],
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
  {
    id: "chatup",
    name: "Chatup (pre-generative AI)",
    category: "Other",
    punchline: "A secure web messenger with 2FA, group chats, and a focus on UX.",
    description:
      "A secure web messenger developed before the current AI wave. It implements two-factor authentication, group chats, profile customization, and an SQL data model with clean permissioning. Significant effort was dedicated to perfecting auth flows and user experience to ensure sessions are secure and the interface is fast on all devices.",
    tools: ["Node.js/Express", "MySQL", "JWT/sessions", "Web Security", "2FA", "Full Stack", "Git"],
    repoUrl: "https://github.com/zivbeh/UChat",
    size: "medium",
    image: "/chatup/background.png",
    texture: "/textures/planets/chatup.png",
    theme: {
      surfaceColor1: "#FDBA74",
      surfaceColor2: "#EA580C",
      atmosphereColor: "#FB923C",
    },
  },
  {
    id: "graph-reader-extension",
    name: "Graph Reader (Chrome Extension)",
    category: "Other",
    punchline: "A Chrome extension that accurately finds intersection points and slopes on badly scaled graphs.",
    description:
      "A Chrome extension that makes reading graphs effortless. Select any graph on a webpage, set the axis and scale, then easily find intersection points and slopes with 100% accuracy. Perfect for students and professionals working with complicated or poorly scaled graphs, eliminating the guesswork and saving valuable time when extracting precise values from visual data.",
    tools: ["Chrome Extension API", "JavaScript", "HTML", "Canvas API", "Git"],
    repoUrl: "https://github.com/zivbeh/GraphReaderExtension",
    size: "small",
    image:
      "/graphreader/Example on a hard to read NMOS curves with the slope feature and hover cords .png",
    imageSpans: {
      // Constrain single image to reasonable size
      "Example on a hard to read NMOS curves with the slope feature and hover cords .png":
        "col-span-2 row-span-2 md:col-span-6 md:row-span-6",
    },
    texture: "/textures/planets/graphreader.png",
    theme: {
      surfaceColor1: "#60A5FA",
      surfaceColor2: "#2563EB",
      atmosphereColor: "#93C5FD",
    },
  },
  {
    id: "capiros-ventures-website",
    name: "Capiros Ventures Website",
    category: "Other",
    punchline: "A fast, SEO-optimized marketing site for a venture studio.",
    description:
      "A fast, SEO-friendly marketing site designed and shipped for a venture studio. The project involved tuning metadata and OG tags, setting up Vercel hosting, and integrating a mailing system for leads and updates. The focus was on the details that matter for performance and visibility, such as image sizing, Core Web Vitals (CLS/LCP), and copy structure, rather than flashy effects.",
    tools: ["Next.js/React", "Vercel Hosting", "Full Stack", "SEO Optimization", "Email Service"],
    liveUrl: "https://www.capiros.ventures/",
    size: "medium",
    image: "/capirosventures/Website Background.png",
    texture: "/textures/planets/caprios.png",
    theme: {
      surfaceColor1: "#67E8F9",
      surfaceColor2: "#0891B2",
      atmosphereColor: "#22D3EE",
    },
  },
  {
    id: "todolist",
    name: "ToDoList",
    category: "Other",
    punchline: "A feature-rich to-do app with auth and notifications.",
    description:
      "A classic but feature-rich to-do application. It includes SQL persistence, email-based 2-step authentication, notifications, timers/reminders, priorities, and deep search/filtering. This project was an opportunity to learn how to wire authentication, scheduled jobs, and data models that remain simple as features are added.",
    tools: ["NodeJS/Express", "MySQL", "cron/schedulers", "Full Stack", "Git"],
    repoUrl: "https://github.com/zivbeh/ToDoList",
    size: "medium",
    image: "/todolist/background.png",
    texture: "/textures/planets/todolist'.png",
    theme: {
      surfaceColor1: "#FDE047",
      surfaceColor2: "#EAB308",
      atmosphereColor: "#FACC15",
    },
  },
  {
    id: "summer-friends-map",
    name: "Meetup Map",
    category: "Other",
    punchline: "A web app to see where many friends are over the summer and plan meetups.",
    description:
      "A small web application for visualizing friends' locations over the summer and planning meetups. It was designed to be lightweight, with a simple sharing model, a map-based UI, and a user-friendly way to update status without spamming group chats.",
    image: "/summerfriends/background.svg",
    tools: ["Web Design", "Google Maps API", "Git"],
    repoUrl: "https://github.com/zivbeh/AEPiInIsrael",
    size: "small",
    texture: "/textures/planets/travelingmap.png",
    theme: {
      surfaceColor1: "#86EFAC",
      surfaceColor2: "#16A34A",
      atmosphereColor: "#4ADE80",
    },
  },
  // Games
  {
    id: "balloons-pop",
    name: "Balloons Pop",
    category: "Games",
    punchline: "A collaborative web strategy game with unit upgrades and tricky waves.",
    description: "A web strategy defense game where players place and upgrade units to pop increasingly tricky balloon waves. The game was co-built with a teammate overseas and uses the Canvas API for rendering. The game loop was tuned for responsiveness, and the project covered everything from mechanics to deployment. It encompases wise data structures for easy scalability and game state management.",
    tools: ["Web Canvas", "JavaScript", "OOP", "Autonomous Targeting", "animation pipeline"],
    liveUrl: "https://zivbeh.github.io/BalloonsPOP/",
    size: "medium",
    images: [
      "/balloonspopgame/Choose World Screen.png",
      "/balloonspopgame/Example Map.png",
    ],
    videos: [
      "/balloonspopgame/Balloons Pop Gamelplay.mp4",
    ],
    imageSpans: {
      // Video on left, full height
      "Balloons Pop Gamelplay.mp4":
        "col-span-2 row-span-2 md:col-span-5 md:row-span-10",
      // First image on right, top half
      "Choose World Screen.png":
        "col-span-2 row-span-2 md:col-span-4 md:row-span-5 md:col-start-6 md:row-start-1",
      // Second image on right, bottom half
      "Example Map.png":
        "col-span-2 row-span-2 md:col-span-4 md:row-span-5 md:col-start-6 md:row-start-6",
    },
    texture: "/textures/planets/balloonspop.png",
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
    tools: ["Canvas", "JavaScript", "custom physics/collision", "level design platform", "Git"],
    repoUrl: "https://github.com/zivbeh/sticky-fred",
    size: "medium",
    images: [
      "/stickyfred/Example Game.png",
      "/stickyfred/Game Over.png",
    ],
    imageSpans: {
      // Two images side-by-side, filling full width (4 + 5 = 9 columns)
      "Example Game.png":
        "col-span-2 row-span-2 md:col-span-4 md:row-span-6",
      "Game Over.png":
        "col-span-2 row-span-2 md:col-span-5 md:row-span-6 md:col-start-5",
    },
    theme: {
      surfaceColor1: "#FCD34D",
      surfaceColor2: "#D97706",
      atmosphereColor: "#FBBF24",
    },
  },
  {
    id: "moneyportal",
    name: "MoneyPortal",
    category: "Games",
    punchline: "A physics-based playground for experimenting with portals and gravity.",
    description: "A portal-and-gravity playground prototype where players navigate linked spaces under simple physics. It serves as a toybox for experimenting with movement and surprise.",
    tools: ["Canvas", "JavaScript", "custom physics", "level design"],
    size: "small",
    images: [
      "/MoneyPortal/Gameplay Start.png",
      "/MoneyPortal/Example portals.png",
    ],
    imageSpans: {
      // Two images side-by-side, filling full width (4 + 5 = 9 columns)
      "Gameplay Start.png":
        "col-span-2 row-span-2 md:col-span-4 md:row-span-6",
      "Example portals.png":
        "col-span-2 row-span-2 md:col-span-5 md:row-span-6 md:col-start-5",
    },
    theme: {
      surfaceColor1: "#F9A8D4",
      surfaceColor2: "#DB2777",
      atmosphereColor: "#F472B6",
    },
  },
  {
    id: "monopolsolver",
    name: "MonopolSolver",
    category: "Games",
    punchline: "A Monopoly-style web game with a built-in strategy solver.",
    description: "A Monopoly-style web game with configurable rules and a strategy helper that computes the most profitable board squares. The project is a fun blend of probability/EV logic and an approachable UI.",
    tools: ["JavaScript", "Web Design", "probability/simulation utilities", "Git"],
    repoUrl: "https://github.com/zivbeh/MonopolSolver",
    size: "small",
    image: "/Monopoly Solver/background.png",
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
    tools: ["Canvas", "JavaScript"],
    size: "small",
    image: "/flafybird/background.png",
    theme: {
      surfaceColor1: "#6EE7B7",
      surfaceColor2: "#059669",
      atmosphereColor: "#34D399",
    },
  },
  {
    id: "birthday-game",
    name: "Birthday Game for My Dad",
    category: "Games",
    punchline: "A celebratory arcade mini-game for my dad's birthday.",
    description: "A celebratory arcade mini-game where players collect coins, dodge moving obstacles, and unlock an animation and music finale upon winning. The game was designed for quick joy and a nice reveal for my dad's birthday.",
    tools: ["Canvas", "JavaScript", "Audio", "Git"],
    repoUrl: "https://github.com/zivbeh/babic-birth-day",
    size: "small",
    image: "/profile.JPG",
    imageSpans: {
      // Constrain single image to reasonable size
      "profile.JPG":
        "col-span-2 row-span-2 md:col-span-6 md:row-span-6",
    },
    theme: {
      surfaceColor1: "#A5B4FC",
      surfaceColor2: "#4F46E5",
      atmosphereColor: "#818CF8",
    },
  },
  {
    id: "dj-game",
    name: "DJ Game",
    category: "Games",
    punchline: "A low-latency browser toy for layering beats and triggering samples.",
    description: "A browser-based music toy that layers beats and triggers samples with low latency. The focus is on immediate feedback and playful controls.",
    tools: ["Web Audio", "JavaScript", "Web Design"],
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
    tools: ["Java", "OOP", "RNG/procedural gen", "GUI"],
    liveUrl: "https://sp25.datastructur.es/projects/proj3/",
    size: "small",
    images: [
      "/roomgame/Randomly Generated Rooms.png",
      "/roomgame/Randomly Generated Rooms using seed441.png",
    ],
    imageSpans: {
      // Two images side-by-side, filling most of the width similar to MoneyPortal
      "Randomly Generated Rooms.png":
        "col-span-2 row-span-2 md:col-span-4 md:row-span-6",
      "Randomly Generated Rooms using seed441.png":
        "col-span-2 row-span-2 md:col-span-5 md:row-span-6 md:col-start-5",
    },
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
    tools: ["Onshape", "3D Printing"],
    size: "medium",
    images: [
      "/3dprojs/Star Wars Tie Fighter.png",
      "/3dprojs/Minion.png",
      "/3dprojs/Basketball Hoop For My Desk.png",
      "/3dprojs/Marble Game.png",
      "/3dprojs/Storage Boxes.png",
    ],
    imageSpans: {
      // Arrange 5 images in a grid: 2 on top row, 3 on bottom row, all taking substantial space
      "Star Wars Tie Fighter.png":
        "col-span-2 row-span-2 md:col-span-4 md:row-span-5",
      "Minion.png":
        "col-span-2 row-span-2 md:col-span-5 md:row-span-5 md:col-start-5",
      "Basketball Hoop For My Desk.png":
        "col-span-2 row-span-2 md:col-span-3 md:row-span-5 md:row-start-6",
      "Marble Game.png":
        "col-span-2 row-span-2 md:col-span-3 md:row-span-5 md:col-start-4 md:row-start-6",
      "Storage Boxes.png":
        "col-span-2 row-span-2 md:col-span-3 md:row-span-5 md:col-start-7 md:row-start-6",
    },
    texture: "/textures/planets/ordercubic.png",
    theme: {
      surfaceColor1: "#CA8A04",
      surfaceColor2: "#A16207",
      atmosphereColor: "#EAB308",
    },
  },
];
