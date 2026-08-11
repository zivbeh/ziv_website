import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT = path.resolve("tmp/project-view");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

await page.goto("http://localhost:3000/", {
  waitUntil: "networkidle",
  timeout: 60000,
});

// Wait for project cards / boxes to appear
await page.waitForTimeout(2000);

// Try to open projects by clicking text names if present
const names = [
  "Library-Seat Radar",
  "3D CAD Designs",
  "LIFTR",
];

for (const name of names) {
  // Close any open overlay first
  const close = page.locator('button[aria-label="Close"]');
  if (await close.count()) {
    await close.first().click().catch(() => {});
    await page.waitForTimeout(400);
  }

  const clicked = await page.evaluate((label) => {
    const candidates = Array.from(
      document.querySelectorAll("button, a, [role='button'], div")
    );
    const el = candidates.find((n) => {
      const t = (n.textContent || "").trim();
      return t.includes(label) && t.length < 80;
    });
    if (!el) return false;
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    return true;
  }, name);

  console.log(name, "clicked=", clicked);
  await page.waitForTimeout(1500);

  // Wait for gallery images in overlay
  await page
    .waitForSelector("[data-auto-gallery] img, .fixed img", { timeout: 15000 })
    .catch(() => null);
  await page.waitForTimeout(800);

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const file = path.join(OUT, `${slug}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log("wrote", file);
}

await browser.close();
