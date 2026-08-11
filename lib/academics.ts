export interface ClassInfo {
  title: string;
  coreKnowledge: string[];
  toolsSoftware: string[];
  applicationsUsed: string[];
  physicalDevices: string[];
}

export const academics = {
  units: 97.2,
  honorStudent: true,
  classes: [
    {
      title: "CS61A - Structure and Interpretation of Computer Programs",
      coreKnowledge: [
        "Abstraction as the central idea in programming: names, environments, and the environment model of evaluation.",
        "Control abstraction: recursion and tree recursion, higher-order functions, iterators/generators, and functional patterns (map/filter/reduce).",
        "Data abstraction: sequences, trees, dictionaries, user-defined abstract data types, and object-oriented design.",
        "Programming paradigms: functional, object-oriented, declarative (SQL), plus a brief introduction to Scheme.",
        "Algorithmic reasoning: orders of growth, basic time/space analysis, recursion vs. iteration, memoization.",
        "Language abstraction: implementing evaluators/interpreters to understand how languages work from the inside.",
        "Testing, debugging, and style as part of software engineering practice in an intro CS course.",
      ],
      toolsSoftware: [
        "Python 3 as the primary language (cs61a.org stack).",
        "A small Scheme dialect for an interpreter project.",
        "SQLite and SQL for table/data-manipulation labs and projects.",
        "VS Code / terminal-based workflow with Git and OK/Gradescope autograding tools.",
      ],
      applicationsUsed: [
        "Implementing small interpreters and evaluators (e.g., a Scheme-like language) to explore metaprogramming.",
        "Building non-trivial Python programs such as simulations, games, and search tools using recursion and higher-order functions.",
        "Using tables, SQL, and Python together for basic data analysis and query-style workloads.",
        "Practicing test-driven debugging workflows and code review on introductory but nontrivial codebases.",
      ],
      physicalDevices: ["(N/A: software/theory-focused course)."],
    },

    {
      title: "CS61B - Data Structures and Algorithms",
      coreKnowledge: [
        "Asymptotic analysis of algorithms: big-O, big-Theta, big-Omega; amortized analysis for dynamic structures.",
        "Core data structures: dynamic arrays, linked lists, stacks, queues, priority queues, hash tables, and disjoint sets (union–find).",
        "Tree structures: binary search trees, balanced trees (e.g., AVL / red–black), heaps, and B-/B+-style trees.",
        "Graph algorithms: representations (adjacency lists/matrices), BFS/DFS, shortest paths (e.g., Dijkstra), and minimum spanning trees.",
        "Sorting and searching: comparison sorts (merge, quick, heap) and non-comparison techniques (e.g., radix).",
        "Abstract data types, invariants, and interfaces as software engineering tools for large codebases.",
        "Basic principles of modular design, encapsulation, and testing in Java-based systems.",
      ],
      toolsSoftware: [
        "Java as the implementation language (including generics and interfaces).",
        "Java build and IDE workflows (e.g., IntelliJ / VS Code with standard Java toolchains).",
        "JUnit-style testing frameworks and Gradescope/autograder workflows.",
        "Git/GitHub for version control, code review, and collaboration.",
      ],
      applicationsUsed: [
        "Implementing custom collections (lists, maps, heaps, union–find) from first principles.",
        "Building multi-thousand-line projects such as map/routing tools or tile-based worlds that exercise graphs and trees.",
        "Designing and stabilizing APIs for reusable data-structure libraries in a team-like environment.",
      ],
      physicalDevices: ["(N/A: software-focused)."],
    },

    {
      title: "CS61C - Computer Architecture",
      coreKnowledge: [
        "C programming: pointers, memory layout, structs, manual memory management, and low-level debugging.",
        "Number representation: binary/hex, signed vs. unsigned, two’s complement, and IEEE 754 floating point.",
        "RISC-V assembly language: instruction formats, calling conventions, stacks, and procedure calls.",
        "The compilation pipeline from C to assembly to machine code; linking, loading, and basic OS interfaces.",
        "Digital logic: combinational and sequential logic, finite state machines, and synchronous design basics.",
        "CPU datapath and control: single-cycle and pipelined designs, hazards, forwarding, and branch prediction.",
        "Memory hierarchy: caches, main memory, TLBs, virtual memory, and performance trade-offs.",
        "Parallelism and performance: SIMD, threads, synchronization, and Amdahl’s law; an introduction to warehouse-scale computing.",
      ],
      toolsSoftware: [
        "C toolchain (gcc/clang), Makefiles, and gdb debugger.",
        "RISC-V assemblers and simulators/emulators (e.g., Venus or similar tools).",
        "Digital logic simulators such as Logisim to construct and test CPU datapaths.",
        "Debugging/profiling tools like GDB and timing/profiling harnesses.",
        "Git and remote Linux instructional servers for development.",
      ],
      applicationsUsed: [
        "Writing and optimizing C programs, including pointer-heavy and memory-intensive workloads.",
        "Implementing and debugging RISC-V assembly programs that interface with C and the OS.",
        "Designing and simulating a pipelined RISC-V CPU datapath/control in a hardware simulator.",
        "Running cache/memory microbenchmarks to observe real performance impacts of hierarchy and locality.",
        "Exploring basic parallel programming primitives and SIMD-style acceleration in small numerical kernels.",
      ],
      physicalDevices: [
        "Instructional Linux workstations and remote servers.",
      ],
    },

    {
      title: "EECS16A - Linear Algebra",
      coreKnowledge: [
        "Solving systems of linear equations via Gaussian elimination and understanding when solutions exist and are unique.",
        "Matrix arithmetic, determinants, inverses, and the relationship between linear systems and matrix properties.",
        "Vector spaces and subspaces; bases, dimension, rank-nullity theorem, and change of basis.",
        "Eigenvalues and eigenvectors, diagonalization, and applications to dynamical systems.",
        "Inner products, orthogonality, Gram–Schmidt, orthonormal bases, and least-squares problems.",
        "Symmetric matrices, quadratic forms, and a taste of singular value decomposition.",
        "Coupling linear algebra with first-order and second-order linear ODE systems.",
        "Fourier series and representing functions as sums of orthogonal basis functions. DFTs and DTFS.",
      ],
      toolsSoftware: [
        "Hand calculations and proof-based reasoning for linear algebra concepts.",
        "Matrix computation environments using Python NumPy.",
        "Basic plotting/visualization tools for geometric interpretations and solution behavior in jupyter notebooks.",
      ],
      applicationsUsed: [
        "Shazam clone using fourier decomposition and linear alegbra tools.",
        "Image compression using singular value decomposition.",
        "Image scanning with ilummination and linear algebra tools.",
        "acoustic positioning system reading signals and using linear algebra to estimate position.",
        "Using eigen-analysis for stability questions and decoupling linear systems of ODEs.",
      ],
      physicalDevices: ["(N/A: math/theory-focused)."],
    },

    {
      title: "EECS16B - Designing Information Devices and Systems I/II",
      coreKnowledge: [
        "Circuit theory fundamentals: KCL, KVL, nodal analysis, resistive networks, and operational amplifier models.",
        "Linear-algebraic tools in context: projections, least squares, and overdetermined systems for sensor fusion.",
        "Sampling, reconstruction, simple filtering, and basic ideas from signal processing.",
        "State-space viewpoints and stability intuition for dynamical systems.",
        "Time and frequency domain analysis in 16B: complex exponentials, phasors, and sinusoidal steady-state.",
        "RLC circuits, feedback, and introductory control ideas (stability, gain/phase intuition).",
        "Introductory machine learning flavor: linear regression and classification framed as linear-algebra problems.",
      ],
      toolsSoftware: [
        "Jupyter notebooks with Python and NumPy for simulations and data analysis.",
        "Circuit simulators such as LTspice for AC/DC/transient analysis.",
        "Course-specific hardware kits (sensors, op-amps, microcontrollers) for hands-on labs.",
        "Bench equipment: oscilloscopes, function generators, digital multimeters, and power supplies.",
      ],
      applicationsUsed: [
        "Building and characterizing sensing systems (e.g., position or audio sensing) and deriving their mathematical models.",
        "Designing op-amp circuits for amplification, filtering, and signal conditioning in real hardware.",
        "Implementing and evaluating linear regression and related ML-style models on real or synthetic sensor data.",
        "Designing feedback-based systems and validating their behavior experimentally.",
        "End-of-course projects that combine circuits, signal processing, control, and computation into a single system.",
      ],
      physicalDevices: [
        "EECS 16A/B hardware kits with breadboards, passive components, op-amps, and sensors.",
        "Lab benches with oscilloscopes, waveform generators, power supplies, and measurement tools.",
      ],
    },

    {
      title: "EE105 - Microelectronic Devices and Circuits",
      coreKnowledge: [
        "Semiconductor physics: carriers, drift and diffusion, pn junctions, depletion regions, and built-in potential.",
        "Diode I–V characteristics, small-signal models, and rectifier-style applications.",
        "MOS capacitors: C–V behavior, threshold voltage concepts, and oxide/interface effects.",
        "MOSFET operation in cutoff, triode, and saturation; body effect; large-signal and small-signal models (gm, ro).",
        "BJT basics: regions of operation, large- and small-signal models and comparisons to MOSFETs.",
        "Single-stage amplifier topologies (common-source, common-gate, common-drain) including gain, input/output resistance, and biasing.",
        "Current mirrors, cascodes, differential pairs, and multistage amplifier architectures.",
        "Frequency response, the Miller effect, Bode plots, feedback, stability margins, and op-amp non-idealities.",
      ],
      toolsSoftware: [
        "LTspice for DC, AC, and transient analysis.",
        "Python for design calculations, curve fitting, and plotting device and circuit characteristics.",
      ],
      applicationsUsed: [
        "Designing and simulating transistor-level amplifiers and bias networks to meet gain and headroom specs.",
        "Building and measuring diode/MOSFET/BJT circuits in lab and comparing results against SPICE predictions.",
        "Using small-signal models to predict gain, input/output impedance, and bandwidth of analog stages.",
      ],
      physicalDevices: [
        "Discrete MOSFETs, BJTs, and diodes mounted on prototyping boards. Breadboard and protoboard.",
        "Analog integrated circuits (op-amps, references) and passive components for lab experiments.",
        "Oscilloscopes, function generators, and precision power supplies.",
      ],
    },

    {
      title: "MATH53 - Multivariable Calculus",
      coreKnowledge: [
        "Parametric curves and polar coordinates as alternative coordinate systems.",
        "Vectors in 2D and 3D: dot and cross products, lines and planes, and basic geometry.",
        "Multivariable functions: limits, continuity, partial derivatives, gradients, and directional derivatives.",
        "Optimization in several variables, including constrained optimization with Lagrange multipliers.",
        "Multiple integrals (double and triple); change of variables and Jacobians at an introductory level.",
        "Vector fields, line integrals, and surface integrals.",
        "Green’s, Gauss’s, and Stokes’s theorems and their interpretations in physics (flux, circulation, and conservation laws).",
      ],
      toolsSoftware: [
        "Analytic calculations and geometric reasoning by hand.",
        "Graphing/visualization tools (e.g., Desmos, MATLAB, or Python/Matplotlib) for surfaces and vector fields.",
        "Symbolic tools (where available) for checking gradient/derivative calculations.",
      ],
      applicationsUsed: [
        "Modeling work, flux, and mass distributions in physics and engineering problems.",
        "Using gradients for multivariable optimization examples.",
        "Relating line and surface integrals directly to electromagnetism and fluid flow examples.",
      ],
      physicalDevices: ["(N/A: math/theory-focused)."],
    },

    {
      title: "CS70 - Discrete Mathematics and Probability Theory",
      coreKnowledge: [
        "Propositional logic, proof techniques (direct, contrapositive, contradiction), and induction/strong induction.",
        "Sets, functions, cardinality, and infinity; applications to undecidability and algorithmic limits.",
        "Modular arithmetic, the Euclidean algorithm, and applications to primality testing and public-key cryptography.",
        "Polynomials over finite fields, interpolation, and error-correcting codes.",
        "Graph theory concepts and their algorithmic applications.",
        "Discrete probability: sample spaces, conditional probability, independence, and Bayes’ theorem.",
        "Random variables, expectation, variance, and concentration phenomena such as the law of large numbers.",
        "Applications of probability to computer science: hashing, randomized algorithms, and load balancing.",
        "Markov chains and their applications to AI and machine learning.",
      ],
      toolsSoftware: [
        "Paper-and-pencil proofs and problem solving as the primary medium.",
        "LaTeX for typesetting longer proofs and homework writeups.",
      ],
      applicationsUsed: [
        "Proving correctness and runtime guarantees for algorithms using invariants and induction.",
        "Analyzing cryptographic protocols and coding schemes via modular arithmetic and polynomials.",
        "Designing and analyzing probabilistic models for simple random processes and algorithms.",
        "Connecting discrete math tools to real CS systems (hash tables, consensus-style problems, markov chains).",
      ],
      physicalDevices: ["(N/A: proofs/theory-focused)."],
    },

    {
      title: "CS189 - Introduction to Machine Learning",
      coreKnowledge: [
        "Supervised learning fundamentals: linear regression, logistic regression, regularization, and bias–variance trade-offs.",
        "Optimization for ML: gradients, SGD variants, and practical training dynamics (initialization, normalization, overfitting controls).",
        "Probabilistic modeling: maximum likelihood/MAP, Gaussian models, and discriminative vs. generative classification.",
        "Kernel methods and margin-based learning: SVM-style intuition and feature transformations.",
        "Unsupervised learning: k-means clustering, EM-style latent variable models, and dimensionality reduction (PCA).",
        "Neural networks and deep learning: backpropagation, MLPs, CNNs, and representation learning foundations.",
        "Model evaluation: cross-validation, metrics, calibration, and error analysis workflows.",
      ],
      toolsSoftware: [
        "Python for end-to-end ML pipelines.",
        "NumPy for numerical computing and vectorized implementations.",
        "PyTorch for training neural networks and deep models.",
        "Jupyter notebooks for experimentation and visualization.",
        "Gradescope/Ed-style workflows for submission and iteration.",
      ],
      applicationsUsed: [
        "Implementing and training models on real datasets, then iterating based on quantitative evaluation and error analysis.",
        "Building reproducible experiments (data splits, baselines, ablations) and reporting results clearly.",
        "Debugging training issues such as overfitting, unstable optimization, and data leakage.",
      ],
      physicalDevices: ["(N/A: software-focused)."],
    },

    {
      title: "CS170 - Efficient Algorithms and Intractable Problems",
      coreKnowledge: [
        "Algorithm design paradigms: divide-and-conquer, greedy algorithms, dynamic programming, and reductions.",
        "Graph algorithms: traversals, shortest paths, and classic modeling patterns for real problems.",
        "Fast primitives and analysis: recurrences/Master theorem, selection/median finding, and asymptotic reasoning.",
        "Algebraic/transform techniques: FFT-style ideas and where they unlock speedups.",
        "Linear programming: formulating problems as LPs plus duality-style intuition and optimality conditions.",
        "Complexity and NP-completeness: polynomial-time reductions and what “intractable” means in practice.",
        "Number theory foundations used in algorithms (as covered in the DPV-style syllabus).",
      ],
      toolsSoftware: [
        "DPV textbook-style problem solving (design + proofs of correctness/runtime).",
        "Pseudocode-to-implementation discipline (language-agnostic; commonly Python/Java/C for practice).",
        "Asymptotic analysis tooling: recurrence solving and empirical validation via small benchmarks.",
        "LaTeX for rigorous writeups and proofs.",
      ],
      applicationsUsed: [
        "Modeling real problems into algorithmic formulations and choosing the right paradigm under constraints.",
        "Designing DP state representations, proving optimal substructure, and validating with edge cases.",
        "Using reductions to connect novel problems to known hard/easy classes and justify approach selection.",
        "Recognizing when LP/FFT/number-theoretic tools are the right hammer for a performance bottleneck.",
      ],
      physicalDevices: ["(N/A: theory/software-focused)."],
    },

    {
      title: "CS152 - Computer Architecture and Engineering",
      coreKnowledge: [
        "Processor microarchitecture: pipelines, hazards, forwarding, and control flow (branch prediction concepts).",
        "Memory hierarchy: caches, coherence concepts, virtual memory, and performance trade-offs.",
        "Parallelism: ILP, SIMD/vectorization, multithreading basics, and throughput/latency reasoning.",
        "Performance engineering: CPI, bottleneck analysis, roofline-style thinking, and microbenchmarking.",
        "Hardware/software interface: ISA vs. microarchitecture, and how compiler/code patterns impact performance.",
        "Modern architecture workflow: iterating with simulation + measurement to justify design decisions.",
      ],
      toolsSoftware: [
        "Chisel (Scala-embedded HDL) for architecture labs and hardware design iteration.",
        "Python and C/C++ for testing, evaluation harnesses, and performance experiments.",
        "Architecture simulators and profiling/benchmark harnesses (course tooling).",
        "ISA-level reasoning (RISC-V concepts) for performance-sensitive code paths.",
      ],
      applicationsUsed: [
        "Analyzing workloads to identify whether compute, memory, or branch behavior dominates performance.",
        "Designing and evaluating microarchitectural trade-offs via simulation/benchmark results.",
        "Connecting algorithmic patterns to cache behavior and throughput on real machines.",
        "Building and validating hardware modules in labs, then writing tests to prove correctness/performance.",
      ],
      physicalDevices: ["Instructional servers/workstations for benchmarking and simulation."],
    },

    {
      title: "PHYS7A/B - Mechanics, Electricity, Magnetism",
      coreKnowledge: [
        "Newtonian mechanics: kinematics, Newton’s laws, work–energy, momentum, rotation, and torque.",
        "Oscillations and waves: simple harmonic motion, damping/driving, wave propagation, and sound.",
        "Fluid mechanics (as typically covered in 7A): density, pressure, buoyancy, and Bernoulli-style reasoning.",
        "Thermodynamics (7B): temperature, ideal gas law, kinetic theory, and the laws of thermodynamics.",
        "Electricity: charge, electric field, Gauss’s law, potential, capacitors, and DC circuits.",
        "Magnetism: magnetic fields, Lorentz force, Ampere’s law, Faraday’s law, inductance, and LR/LC circuits.",
        "A first look at Maxwell’s equations in integral form and their connection to electromagnetic waves.",
      ],
      toolsSoftware: [
        "Online homework platforms such as MasteringPhysics or similar systems.",
        "Spreadsheet/graphing or dedicated lab software for data analysis and curve fitting.",
        "Occasional simulation or applet-based tools for visualizing fields and motion.",
      ],
      applicationsUsed: [
        "Running mechanics labs (e.g., carts on tracks, projectiles, oscillators) and fitting theoretical models to experimental data.",
        "Building and analyzing simple DC circuits with resistors, capacitors, and inductors.",
        "Using calculus-based models to predict and verify the behavior of physical systems in mechanics and E&M.",
      ],
      physicalDevices: [
        "Mechanics lab equipment: carts, tracks, motion sensors, photogates, and springs.",
        "Circuit boards, power supplies, multimeters, and oscilloscopes for E&M labs.",
        "Miscellaneous lab hardware for thermodynamics and wave experiments.",
      ],
    },

    {
      title: "CCNA",
      coreKnowledge: [
        "Network fundamentals: OSI/TCP-IP models, Ethernet framing, IPv4/IPv6 addressing, subnetting, and VLAN concepts.",
        "Network access: switching, MAC learning, trunking, spanning tree, and basic wireless LAN concepts.",
        "IP connectivity: static and dynamic routing, routing tables, and path selection.",
        "IP services: DHCP, NAT, and DNS basics.",
        "Security fundamentals: ACLs, port security, secure management protocols, and basic VPN concepts.",
      ],
      toolsSoftware: [
        "Cisco IOS command-line interface on routers and switches (physical or virtual).",
        "Network simulators/emulators such as Cisco Packet Tracer.",
        "Wireshark or similar packet analyzers to inspect live and simulated traffic.",
      ],
      applicationsUsed: [
        "Configuring small campus-style networks with VLANs, inter-VLAN routing, and trunk links.",
        "Implementing static and dynamic routing, NAT, and DHCP in lab scenarios and verifying end-to-end connectivity.",
        "Applying ACLs and port-security features to enforce simple security policies.",
        "Debugging connectivity issues with a structured approach using routing tables, ARP tables, and interface status.",
      ],
      physicalDevices: [
        "Cisco routers and switches in a lab or rack environment.",
        "Small office/home office routers, access points, and wired infrastructure for practice.",
        "Cabling and patch panels used in hands-on networking labs.",
      ],
    },
  ],
};
