
export const getTagStyle = (tag: string): string => {
  const lowerTag = tag.toLowerCase().trim();

  // -------------------------------------------------------
  // 1. AI / ML / Data (Violet)
  // -------------------------------------------------------
  // PyTorch, Transformer vision models, LLM Integration, AI agents, Scraping, Autonomous Targeting, MoviePy, AI Agents, TTS, NumPy, Pandas
  if (
    [
      "machine learning", "vision", "llm", "agent", "transformer", "pytorch", "numpy", 
      "pandas", "scraping", "cuda", "tts", "data", "simulation", "markov", "autonomous", 
      "targeting", "probability", "multivariable calculus"
    ].some(k => lowerTag.includes(k))
  ) {
    return "text-violet-400 bg-violet-400/10 border-violet-400/20";
  }
  if (lowerTag == "ai") {
    return "text-violet-400 bg-violet-400/10 border-violet-400/20";
  }

  // -------------------------------------------------------
  // 2. Frontend / Mobile / Web (Cyan)
  // -------------------------------------------------------
  // React Native, React, WebSockets, Canvas/Grid UI, Chrome Extension API, HTML, Canvas API, Web Design, Web Canvas, GUI, Next.js
  if (
    [
      "react", "next.js", "ui", "gui", "canvas", "chrome extension", "google maps", 
      "design", "html", "typescript", "javascript", "web"
    ].some(k => lowerTag.includes(k))
  ) {
    return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
  }

  // -------------------------------------------------------
  // 3. Backend / Server (Emerald)
  // -------------------------------------------------------
  // Node.js, Express, MySQL, Auth, Security, JWT/sessions, email service
  if (
    [
      "node", "express", "database", "sql", "mysql", "auth", "jwt", "session", 
      "email", "moviepy", "nodejs", "node.js", "nodejs/express", "nodejs/express.js", "email service"
    ].some(k => lowerTag.includes(k))
  ) {
    return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  }

  // -------------------------------------------------------
  // 5. Hardware / Low Level (Amber)
  // -------------------------------------------------------
  // CUDA (handled in AI/ML? No, user wanted it separate or it's hardware), Wi-Fi AP sensors, RISC-V, Logisim, SPICE, Breadboards, op-amps, signal generator, oscilloscope, DMM, Onshape, 3D Printing
  if (
    [
      "risc-v", "logisim", "spice", "breadboard", "op-amp", "passive", "signal", "oscilloscope", 
      "dmm", "circuit", "3d printing", "onshape", "sensor", "wifi", "verilog", "low level"
    ].some(k => lowerTag.includes(k))
  ) {
    return "text-amber-400 bg-amber-400/10 border-amber-400/20";
  }

  // -------------------------------------------------------
  // 6. Creative / Game Dev (Rose)
  // -------------------------------------------------------
  // animation pipeline, level design platform, Audio, Web Audio, MIDI
  if (
    [
      "startup", "marketing", "seo", "production", "product", "aws", "vercel", "api", "grpc", "websocket", "sse", "oauth", "cron", "scheduler", 
      "networking", "os", "hosting", "ci/cd", "2fa", "security"
      ].some(k => lowerTag.includes(k))
  ) {
    return "text-rose-400 bg-rose-400/10 border-rose-400/20";
  }

  // -------------------------------------------------------
  // 7. Math / Algorithms (Orange)
  // -------------------------------------------------------
  // path optimization, Markov modeling, OOP, physics/collision, probability/simulation, RNG/procedural gen, Linear Algebra, Data Structures
  if (
    [
      "algorithm", "data structure", "linear algebra", "math", "rng", 
      "procedural", "optimization", "path", "physics", "collision", "oop", "backend"
    ].some(k => lowerTag.includes(k))
  ) {
    return "text-orange-400 bg-orange-400/10 border-orange-400/20";
  }

  // -------------------------------------------------------
  // 8. Business / Startup (Emerald)
  // -------------------------------------------------------
  // Startups, marketing, SEO Optimization, production workflows
  if (
    [
      "animation", "audio", "midi", "media", "level design",
    ].some(k => lowerTag.includes(k))
  ) {
    return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  }

  // -------------------------------------------------------
  // 9. Languages (Blue)
  // -------------------------------------------------------
  // Python, Java, C++, Scheme, MATLAB
  if (
    [
      "python", "java", "c++", "scheme", "matlab"
    ].some(k => lowerTag.includes(k))
  ) {
    return "text-blue-400 bg-blue-400/10 border-blue-400/20";
  }

  // -------------------------------------------------------
  // 10. General Software (Sky)
  // -------------------------------------------------------
  // Full Stack
  if (
    [
      "full stack"
    ].some(k => lowerTag.includes(k))
  ) {
    return "text-sky-400 bg-sky-400/10 border-sky-400/20";
  }

  // -------------------------------------------------------
  // 11. Tools (Slate)
  // -------------------------------------------------------
  // Git, VS Code
  if (
    [
      "git", "vs code"
    ].some(k => lowerTag.includes(k))
  ) {
    return "text-slate-300 bg-slate-400/10 border-slate-400/20";
  }

  // -------------------------------------------------------
  // 12. NO AI used
  // -------------------------------------------------------
  // No AI used
  if (
    [
      "no ai used"
    ].some(k => lowerTag.includes(k))
  ) {
    return "text-brown-300 bg-brown-400/10 border-brown-400/20";
  }

  // Catch-all
  return "text-slate-300 bg-slate-400/10 border-slate-400/20";
};
