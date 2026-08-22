import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "src/app/fonts", file));

export default async function OpenGraphImage() {
  const [medium, light, mono] = await Promise.all([
    font("SpaceGrotesk-500.ttf"),
    font("SpaceGrotesk-300.ttf"),
    font("GeistMono-400.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0b0a08",
          backgroundImage:
            "linear-gradient(to right, #1c1915 1px, transparent 1px), linear-gradient(to bottom, #1c1915 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          color: "#ede6d8",
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 20, letterSpacing: 5, color: "#5a5449" }}>
          {site.legalName.toUpperCase()} · INDIANAPOLIS, IN
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 156, fontWeight: 500, letterSpacing: -7, lineHeight: 1 }}>
            Amick&nbsp;
            <span style={{ color: "#5a5449", fontWeight: 300 }}>[</span>
            <span style={{ color: "#ffb000" }}>Labs</span>
            <span style={{ color: "#5a5449", fontWeight: 300 }}>]</span>
          </div>
          <div style={{ marginTop: 36, height: 2, width: "100%", background: "#c98a00" }} />
          <div style={{ display: "flex", marginTop: 36, fontSize: 38, fontWeight: 500, letterSpacing: -1, lineHeight: 1.2, color: "#ede6d8", maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 20, letterSpacing: 5, color: "#8f8777" }}>
          AMICKLABS.COM
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "Space Grotesk", data: light, weight: 300, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
