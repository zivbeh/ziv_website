export const projects = [
  {
    id: "stealth-founder",
    name: "Snap Sort",
    category: "Other",
    punchline: "A custom computer vision pipeline for real-time photo intelligence.",
    description:
      "Built an AI-powered photo organization system designed to automatically sort, cluster, and annotate your large image datasets based on events. It consists of a mobile/web client and a high-performance computing (HPC) distributed systems-oriented backend that handles tasks such as face detection, captioning, and clustering into events through custom ML models with communication over gRPC.",
    tools: ["PyTorch", "Machine Learning", "Distributed Systems", "CUDA", "React Native", "Node.js", "gRPC", "WebSockets"],
    size: "large",
    images: ["/textures/planets/snap-sort-events.png", "/stealth/Stealth.png"],
    texture: "/textures/planets/snap-sort-events.png",
    theme: {
      surfaceColor1: "#22D3EE", // cyan
      surfaceColor2: "#F97316", // warm orange
      atmosphereColor: "#34D399", // greenish glow
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
    texture: "/textures/planets/lib_radar.png",
    theme: {
      surfaceColor1: "#99ccff",
      surfaceColor2: "#0033cc",
      atmosphereColor: "#6699ff",
    },
  },
  {
    id: "bsac-liwei-lin-lab",
    name: "PIML 3D Reconstruction",
    category: "Academics",
    punchline:
      "Physics-informed 3D ultrasonic imaging at BSAC. 3 abstracts to IEEE MEMS 2027; writing 1 journal paper.",
    description:
      "In the Berkeley Sensor & Actuator Center (BSAC) with Prof. Liwei Lin, I invented the first physics-informed learned reconstruction method for in-air 3D ultrasonic imaging. The system uses just 8 PMUT sensors (vs. hundreds conventionally) and cuts acquisition time by 10–100×, reconstructing target position, size, and orientation with 34 mm median surface error to ground truth. " +
      "I also developed methods for synthetic-aperture and non-line-of-sight PMUT imaging, improving resolution 11.3× to 2.87 mm and localizing occluded targets up to 1.42 m away within 0.9 mm of ground truth. " +
      "This work has 3 abstracts submitted to IEEE MEMS 2027, and I am writing 1 journal paper. " +
      "The hardware is a compact in-air ultrasonic imager: piezoelectric micromachined ultrasonic transducers (PMUTs) driven from a mixed-signal stack I brought up. I wrote microcontroller firmware to coordinate pulse transmission and data acquisition, used a genetic algorithm to tune drive parameters and cut ringdown by over 90% so the reconstruction sees cleaner echoes, and designed a dual-rail inverting supply PCB so the pMUTs can drive 2× higher voltages for better resolution and a deeper field of view.",
    tools: [
      "Compressed sensing",
      "Machine Learning",
      "Firmware",
      "Genetic algorithms",
      "Python",
      "C/C++",
      "KiCad PCB design",
    ],
    repoUrl: "https://github.com/zivbeh/pcb_inverter",
    size: "medium",
    images: [
      "/research/ultrasound-rig-desk.jpg",
      "/research/ultrasound-target-setup.jpg",
      "/research/cal-reconstruction.png",
      "/research/pcb-layout.jpg",
      "/research/reconstruction of the cross.jpeg",
      "/research/design.png",
      "/research/pcb-preassembly.jpeg",
      "/research/pcb-onboard.png",
    ],
    texture: "/textures/planets/lib_radar.png",
    theme: {
      surfaceColor1: "#0EA5E9",
      surfaceColor2: "#0369A1",
      atmosphereColor: "#38BDF8",
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
    tools: ["VS Code Extension API", "TypeScript", "LLM Integration", "AI agents", "OOP"],
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
    id: "liftr",
    name: "LIFTR: On-device ML Fitness Coaching (acquired)",
    category: "Other",
    punchline: "On-device vision for real-time iOS coaching. Acquired.",
    description:
      "At LIFTR, I shipped an acquired fitness coaching iOS app that runs real-time ML vision inference on-device. I derived structured form feedback by analyzing pose signals at ~30 FPS on mobile hardware, turning raw model outputs into personalized coaching cues. I also built an LSTM-based workout recommendation engine that retrains incrementally as users log sessions, adapting recommendations over time while preserving privacy and keeping zero network latency. Stack: CoreML, Swift/SwiftUI, PyTorch, Firebase, and Superwall.",
    tools: ["CoreML", "Swift/SwiftUI", "PyTorch", "Firebase", "On-device ML", "iOS", "Superwall"],
    liveUrl: "https://apps.apple.com/us/app/liftr-get-jacked/id6748885669",
    size: "medium",
    // Product walkthrough only (all portrait) — coaching lead, then app surfaces.
    // Mascot is landscape; mixing it here broke the phone strip into a junk album.
    images: [
      "/liftr/pullup with score.png",
      "/liftr/liftr home.png",
      "/liftr/liftr body rankings.png",
      "/liftr/data analytics.JPG",
    ],
    texture: "/liftr/pullup with score.png",
    theme: {
      surfaceColor1: "#0EA5E9",
      surfaceColor2: "#0284C7",
      atmosphereColor: "#38BDF8",
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
    tools: ["Node.js", "JavaScript", "MySQL", "AWS (autoscaling, CI/CD)", "No AI used!", "WebSockets/SSE", "Canvas/Grid UI", "OOP", "Git"],
    repoUrl: "https://github.com/zivbeh/OrderCubic",
    size: "medium",
    images: [
      "/ordercubic/Floorplan for the App.png",
      "/ordercubic/Floorplan2.jpg",
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
    tools: ["Python", "MoviePy", "AI Agents", "Scraping", "media APIs", "TTS", "YouTube Data API (OAuth)", "Git"],
    repoUrl: "https://github.com/zivbeh/Video-Generator",
    size: "medium",
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
    id: "strata-bb-hacks",
    name: "STRATA (B&B Hacks 1st Place)",
    category: "Other",
    punchline:
      "Autonomous polymarket trading AI agent that turns conflict news into market trades.",
    description:
      "At the 2026 Blockchain@Berkeley Hackathon, Roy Ruppin and I built STRATA, " +
      "a real-time pipeline that turns live conflict news in the Middle East into structured events, " +
      "maps them to Polymarket prediction markets, and can automatically place trades. " +
      "A Python pipeline ingests and filters messages from conflict-focused Telegram channels, " +
      "uses AI to cross reference and extract events (who/what/where/when, confidence), builds out a map of implications " +
      "(find specific companies/comodities/actors/etc. affected by the event), and ranks corresponding " +
      "Polymarket contracts. A Node.js terminal UI then shows how the pipeline works in real time.",
    tools: [
      "Hackathons",
      "Python",
      "Node.js",
      "AI Agents",
      "Telegram API",
      "Anthropic API",
      "Polymarket API",
    ],
    repoUrl: "https://github.com/zivbeh/b-bhacks",
    size: "large",
    images: [
      "/hackathonBAB/view.png",
      "/hackathonBAB/winning photo.jpg",
      "/hackathonBAB/ziv and roy b@b hacks seating.jpg",
    ],
    texture: "/textures/planets/percepta.png",
    theme: {
      surfaceColor1: "#22C55E",
      surfaceColor2: "#15803D",
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
    tools: ["Logisim", "RISC-V ISA/specs", "path optimization"],
    size: "medium",
    images: [
      "/c61cpu/RISC-V Datapath.png",
      "/c61cpu/Data Path in Logisim.png",
      "/c61cpu/Arithmetic Unit of CPU.png",
    ],
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
    tools: ["Java", "MIDI", "custom Markov modeling", "No AI used!", "Git"],
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
      "/guitarAMP/Breadboard In Progress.jpg",
      "/guitarAMP/BNC Adapter with Digilent Analog Discovery 2.jpg",
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
    tools: ["Node.js/Express", "MySQL", "JWT/sessions", "No AI used!", "Web Security", "2FA", "Full Stack", "OOP", "Git"],
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
    tools: ["NodeJS/Express", "MySQL", "cron/schedulers", "Full Stack", "No AI used!", "OOP", "Git"],
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
    punchline: "A web strategy defense game where players place and upgrade units to pop increasingly tricky balloon waves. pre AI coding!",
    description: "A web strategy defense game where players place and upgrade units to pop increasingly tricky balloon waves. The game was co-built with a teammate overseas and uses the Canvas API for rendering. The game loop was tuned for responsiveness, and the project covered everything from mechanics to deployment. It encompases wise data structures for easy scalability and game state management.",
    tools: ["No AI used!", "Web Canvas",  "OOP", "JavaScript", "Autonomous Targeting", "animation pipeline"],
    liveUrl: "https://zivbeh.github.io/BalloonsPOP/",
    size: "medium",
    images: [
      "/balloonspopgame/Choose World Screen.png",
      "/balloonspopgame/Example Map.png",
    ],
    videos: [
      "/balloonspopgame/Balloons Pop Gamelplay.mp4",
    ],
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
    tools: ["No AI used!", "Canvas", "JavaScript", "custom physics/collision", "level design platform", "Git"],
    repoUrl: "https://github.com/zivbeh/sticky-fred",
    size: "medium",
    images: [
      "/stickyfred/Example Game.png",
      "/stickyfred/Game Over.png",
    ],
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
    tools: ["No AI used!", "Canvas", "JavaScript", "custom physics", "OOP", "level design"],
    size: "small",
    images: [
      "/MoneyPortal/Gameplay Start.png",
      "/MoneyPortal/Example portals.png",
    ],
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
    tools: ["No AI used!","JavaScript", "OOP", "Web Design", "probability/simulation utilities", "Git"],
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
    description: "This project reproduces the feel of Flappy Bird (frame timing, collision, difficulty ramp), purely in the browser. It was an exercise in sharpening fundamentals in game loops, assets, and hitboxes.",
    tools: ["No AI used!", "Canvas", "JavaScript"],
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
    tools: ["No AI used!", "Canvas", "JavaScript", "Audio", "Git"],
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
    id: "dj-game",
    name: "DJ Game",
    category: "Games",
    punchline: "A low-latency browser toy for layering beats and triggering samples.",
    description: "A browser-based music toy that layers beats and triggers samples with low latency. The focus is on immediate feedback and playful controls.",
    tools: ["Web Audio", "JavaScript", "Web Design", "No AI used!"],
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
    tools: ["No AI used!", "Java", "OOP", "RNG/procedural gen", "GUI"],
    liveUrl: "https://sp25.datastructur.es/projects/proj3/",
    size: "small",
    images: [
      "/roomgame/Randomly Generated Rooms.png",
      "/roomgame/Randomly Generated Rooms using seed441.png",
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
    tools: ["Onshape", "3D Printing"],
    size: "medium",
    images: [
      "/3dprojs/Star Wars Tie Fighter.png",
      "/3dprojs/Minion.png",
      "/3dprojs/Basketball Hoop For My Desk.png",
      "/3dprojs/Marble Game.png",
      "/3dprojs/Storage Boxes.png",
    ],
    texture: "/textures/planets/ordercubic.png",
    theme: {
      surfaceColor1: "#CA8A04",
      surfaceColor2: "#A16207",
      atmosphereColor: "#EAB308",
    },
  },
];
