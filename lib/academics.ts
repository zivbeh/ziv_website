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
      title: "Structure and Interpretation of Computer Programs (SICP)",
      coreKnowledge: [
        "Functional programming: first-class procedures, higher-order functions, closures, lexical scope.",
        "Data abstraction; symbolic data; stream processing; delayed evaluation.",
        "Metalinguistic abstraction: interpreters, evaluators, special forms, macros (Scheme/Racket).",
        "Environment model of computation; substitution vs. environment semantics.",
        "Recursion vs. iteration; tail calls; continuation-passing style (CPS) intuition.",
        "Generic operations, message-passing style; object systems from first principles.",
        "Time/space reasoning; orders of growth; memoization.",
        "Nondeterminism/backtracking (amb-style) and constraint systems (logic programming taste).",
      ],
      toolsSoftware: [
        "Scheme/Racket (DrRacket), Chez Scheme; REPL-driven development.",
        "Unit test harnesses in Racket; simple profilers and tracers.",
        "Git for literate problem sets; Makefiles / scripts to run interpreters.",
      ],
      applicationsUsed: [
        "Building a metacircular evaluator, macro expander, and tiny register-machine simulator.",
        "Designing DSL-style abstractions; implementing streams/lazy sequences for pipelines.",
        "Prototyping object systems and generic arithmetic (e.g., complex/rational/polynomial).",
      ],
      physicalDevices: ["(N/A—software/theory focused.)"],
    },
    {
      title: "Data Structures and Algorithms",
      coreKnowledge: [
        "Asymptotic analysis; amortized analysis; recursion trees/master theorem; invariants.",
        "Core structures: arrays, linked lists, stacks/queues, heaps (binomial/Fibonacci), hash tables.",
        "Trees/graphs: BST/AVL/Red-Black, B-/B+-trees, tries/suffix arrays; union–find/DSU.",
        "Graph algorithms: BFS/DFS, topological sort, SCC (Kosaraju/Tarjan), Dijkstra, Bellman-Ford, A*, Floyd–Warshall, MST (Kruskal/Prim).",
        "String algos: KMP, Z-algorithm, Rabin–Karp, suffix structures and LCP.",
        "Greedy, divide-and-conquer, dynamic programming; cut/flow (Ford–Fulkerson/Edmonds–Karp).",
        "NP, reductions, approximations; randomized algorithms (hashing, sampling).",
      ],
      toolsSoftware: [
        "Python/C++/Java implementations; pytest/JUnit; property-based testing (Hypothesis).",
        "Profilers and analyzers (perf, gprof, Python cProfile); memory checkers (Valgrind).",
        "Visualization tools (Graphviz) for graphs/trees.",
      ],
      applicationsUsed: [
        "Designing indexes, caches, schedulers; picking structures for latency/throughput targets.",
        "Memory-layout-aware containers; external-memory data structures basics.",
        "Robust hashing (universal hashing ideas), load-factor tuning, rehash strategies.",
      ],
      physicalDevices: ["(N/A—software/theory focused.)"],
    },
    {
      title: "Computer Architecture",
      coreKnowledge: [
        "ISA vs. microarchitecture; RISC datapath; instruction formats; calling conventions.",
        "Single-cycle / multi-cycle / 5-stage pipelines; hazards (structural, data, control); forwarding & stall logic; branch prediction (static/2-bit/BTB).",
        "Memory hierarchy: caches (direct/assoc/set-assoc, write-back/through), prefetching; virtual memory, TLBs, paging.",
        "Performance: CPI decomposition; Amdahl/Gustafson’s law; roofline basics.",
        "Parallelism: SIMD, superscalar, out-of-order execution; coherence/consistency (MESI); interconnects and NUMA intuition.",
        "I/O and interrupts; DMA; memory-mapped I/O.",
      ],
      toolsSoftware: [
        "HDL or simulators (Logisim/Logisim-evolution; simple Verilog/VHDL exposure).",
        "Assembly toolchains (RISC-V, MIPS, or x86-64): assemblers, linkers, objdump.",
        "Cache/pipeline simulators; performance counters (Linux perf, PAPI).",
      ],
      applicationsUsed: [
        "Designing a pipelined CPU in simulation; verifying forwarding/stall control.",
        "Cache configuration trade-offs; page table/TLB walk reasoning.",
        "Low-level optimization: loop unrolling, vectorization heuristics, alignment.",
      ],
      physicalDevices: ["Logic analyzer for bus timing (conceptual); FPGA dev boards (entry-level exposure)."],
    },
    {
      title: "Linear Algebra",
      coreKnowledge: [
        "Vector spaces, subspaces; span, basis, dimension; column/row/Null/Left-Null spaces.",
        "Linear maps; matrix representations; rank–nullity; invertibility conditions.",
        "Orthogonality, projections, Gram–Schmidt; QR; least squares/normal equations.",
        "Eigenvalues/eigenvectors; diagonalization; similarity; spectral theorem for symmetric matrices.",
        "SVD; low-rank approximations; pseudoinverse; conditioning and stability.",
      ],
      toolsSoftware: [
        "Python/NumPy; MATLAB/Octave for decomposition (LU/QR/SVD) experiments.",
        "Symbolic checks with SymPy; LaTeX for proofs and derivations.",
      ],
      applicationsUsed: [
        "Least-squares regression and denoising; PCA for dimensionality reduction.",
        "State-space solutions (coupled with 16B): controllability/observability matrices.",
        "Numerical stability assessments; conditioning of systems and solvers.",
      ],
      physicalDevices: ["(N/A—math foundation; used conceptually in labs elsewhere.)"],
    },
    {
      title: "Designing Information Devices and Systems I/II",
      coreKnowledge: [
        "Circuit foundations: KCL/KVL; Thevenin/Norton; op-amp ideal rules and non-idealities.",
        "Linear systems view: impulse response, convolution; LTI modeling of sensors.",
        "Linear algebra for estimation: projections, least squares, over/underdetermined fits.",
        "State-space models: ẋ=Ax+Bu, y=Cx+Du; eigenvalues and stability.",
        "Controllability/observability; pole placement intuition; feedback and reference tracking.",
        "Frequency-domain intuition; discrete-time sampling basics.",
      ],
      toolsSoftware: [
        "SPICE (DC/AC/transient, param sweeps); Python/NumPy for linear models.",
        "MATLAB/Octave for quick LTI simulations.",
        "MATLAB control tooling (conceptual); Python/SciPy signal for simulations.",
        "SPICE for dynamic/active circuits; Bode magnitude/phase extraction.",
      ],
      applicationsUsed: [
        "Op-amp circuits (buffers, inverting/non-inverting, summing, active RC filters).",
        "Sensor calibration via least squares; simple FIR filters for denoising.",
        "Closed-loop design mindset; estimator vs. controller separation (Luenberger intuition).",
        "Logging/telemetry planned via observability; actuator placement via controllability.",
      ],
      physicalDevices: [
        "Breadboards; resistors/caps/diodes/LEDs; op-amps.",
        "DMM; entry-level oscilloscope (probe compensation, timebase); function generator.",
        "Step-response experiments; Bode magnitude/phase with oscilloscope + generator.",
      ],
    },
    {
      title: "Microelectronic Devices and Circuits",
      coreKnowledge: [
        "Semiconductor physics: drift/diffusion; carrier densities; depletion zones; built-in potential.",
        "PN junctions: Shockley I–V; small-signal resistance/capacitances; diode models.",
        "MOS capacitor: C–V, threshold/flat-band concepts; oxide effects.",
        "MOSFETs: regions (cutoff/linear/sat), body effect, gm/ro; small-signal hybrid-π.",
        "Analog building blocks: bias networks, current mirrors, common-source with/without degeneration; input/output resistance; GBW and dominant pole.",
        "Frequency response: single-pole approximations, compensation heuristics; Bode reading; first-order noise awareness.",
      ],
      toolsSoftware: [
        "SPICE (ngspice/LTspice/Cadence flow): DC/AC/transient; .op small-signal; param/corner sweeps; Monte-Carlo basics.",
        "Python helpers for batch simulation and data parsing; curve fitting.",
      ],
      applicationsUsed: [
        "Bias point design and region verification; estimating gain/Rin/Rout/UGB.",
        "RC filters; diode clamps/limiters; source-degeneration trade-offs.",
        "Rapid stability triage (phase margin hints) through first-order models.",
      ],
      physicalDevices: [
        "Breadboard analog stages; transistor/diode characterization.",
        "Oscilloscope for Bode/step; function generator for sine/step; DMM for DC bias.",
        "Components: resistors, capacitors, small-signal MOSFETs/BJTs, op-amps, diode networks.",
      ],
    },
    {
      title: "Multivariable Calculus",
      coreKnowledge: [
        "Vector-valued functions; limits/continuity; partial derivatives; gradient/Jacobian/Hessian.",
        "Chain rule in ℝⁿ; directional derivatives; Taylor expansions.",
        "Optimization: unconstrained (critical points, definiteness), constrained (Lagrange multipliers).",
        "Multiple integrals; change of variables/Jacobian; line/surface integrals.",
        "Vector calculus: div/grad/curl; Green’s, Stokes’, Divergence theorems.",
      ],
      toolsSoftware: ["MATLAB/NumPy/SymPy for visualization, symbolic differentiation/integration.", "Plotting (Matplotlib) for level sets/fields."],
      applicationsUsed: [
        "Cost-surface analysis; curvature and second-order behavior of objective functions.",
        "Flux/circulation reasoning for fields; coordinate transforms for efficient integrals.",
      ],
      physicalDevices: ["(N/A—math foundation.)"],
    },
    {
      title: "Discrete Mathematics and Probability Theory",
      coreKnowledge: [
        "Proofs: direct/contradiction; induction/strong induction; well-ordering.",
        "Number theory: divisibility, Euclid/GCD, modular arithmetic, inverses, CRT.",
        "Polynomials over finite fields; hashing; error-correcting codes (Reed–Solomon intuition).",
        "Graphs/trees; matchings and cuts (intro level).",
        "Probability: sample spaces, conditional probability/independence, Bayes; RVs, expectation/variance; concentration (Markov/Chebyshev), union bound; linearity of expectation.",
        "Randomized algorithms and the probabilistic method (existence proofs).",
      ],
      toolsSoftware: ["Python notebooks for Monte-Carlo sanity checks; LaTeX for formal write-ups."],
      applicationsUsed: [
        "Cryptography sanity checks (mod exponentiation, inverses); hashing collision analysis.",
        "A/B testing and risk bounds; error-tolerant storage/comm intuition.",
      ],
      physicalDevices: ["(N/A—theory focused.)"],
    },
    {
      title: "Physics Mechanics, Electricity, Magnetism",
      coreKnowledge: [
        "Mechanics: kinematics; Newton’s laws; energy/work; momentum/impulse; rotation; rigid-body dynamics; normal/tension/friction modeling; constraints & pulleys.",
        "Oscillations and waves: SHM; damping/driving; resonance.",
        "E&M: Coulomb’s law; fields/potential; Gauss’s law; capacitors/dielectrics; circuits (RLC, transients); magnetic fields/forces; Faraday/Lenz; inductors; Maxwell’s equations (integral form).",
        "EM waves: wave equation, Poyning vector (intro).",
      ],
      toolsSoftware: ["Python/NumPy for ODEs and simulations; simple circuit solvers; SPICE for RLC transients."],
      applicationsUsed: [
        "Constraint analysis (multi-mass, Atwood systems); energy vs. forces method selection.",
        "RLC transient shaping; resonance/bandwidth intuition; lumped vs. distributed modeling.",
      ],
      physicalDevices: ["DMM, oscilloscope, function generator for circuit labs.", "Mechanics kits: pulleys, masses, tracks; photogates/timers (conceptual familiarity)."],
    },
    {
      title: "CCNA",
      coreKnowledge: [
        "Models & addressing: OSI/TCP-IP stacks; Ethernet/802.3; ARP/ND; IPv4/IPv6 addressing, subnetting, VLSM; CIDR; MTU/fragmentation.",
        "Switching: MAC learning; VLANs/801Q; STP/RSTP; EtherChannel/LACP; storm control.",
        "Routing: static routes; default routes; dynamic protocols—RIPng (intro), OSPFv2/v3 areas/DR/BDR, EIGRP basics; route metrics, path selection; ECMP.",
        "Services & NAT: DHCP(v4/v6), DNS basics; PAT/NAT, inside/outside local/global.",
        "ACLs & security: standard/extended ACLs; port security; DHCP snooping, DAI, IP source guard; 802.1X (high level); basic VPN (site-to-site IPsec/GRE); AAA concepts.",
        "Wireless (intro): SSIDs, WPA2/WPA3-PSK/Enterprise; channel planning; controller vs. autonomous APs.",
        "WAN & virtualization: PPP, MLPPP, GRE; basic QoS (classification/marking, queuing); SD-Access/SD-WAN concepts; VRF; NAT64/NPTv6 (intro).",
        "Automation/telemetry: IOS CLI basics, structured data (JSON/YANG); NETCONF/RESTCONF concepts; syslog, SNMPv2c/v3, NetFlow/sFlow.",
      ],
      toolsSoftware: [
        "Cisco IOS/IOS-XE labs (Packet Tracer, GNS3/EVE-NG); terminal emulators.",
        "IP calculators; Wireshark; iperf; basic Python for config templating (Jinja2) and API calls.",
        "Monitoring: SNMP/NetFlow collectors; syslog servers.",
      ],
      applicationsUsed: [
        "Designing IPv4/IPv6 subnets and VLSM plans; inter-VLAN routing; OSPF single-/multi-area.",
        "Switch hardening (BPDU guard, root guard); ACL-based segmentation; NAT/PAT at edges.",
        "WLAN setup (SSID/security), basic QoS for voice/video; VRF-lite segmentation.",
      ],
      physicalDevices: [
        "Cisco Catalyst switches/ISR routers; SFP modules; patch panels.",
        "UTP crimping/cable testers; console cables; UPS basics; small APs/controllers.",
      ],
    },
  ],
};
