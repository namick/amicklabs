import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0a08",
          backgroundImage:
            "linear-gradient(to right, #26221b 1px, transparent 1px), linear-gradient(to bottom, #26221b 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          color: "#ede6d8",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#5a5449" }}>
          {site.legalName.toUpperCase()} · INDIANAPOLIS, IN
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 148, fontWeight: 600, letterSpacing: -6, lineHeight: 1 }}>
            Amick&nbsp;
            <span style={{ color: "#5a5449", fontWeight: 300 }}>[</span>
            <span style={{ color: "#ffb000" }}>Labs</span>
            <span style={{ color: "#5a5449", fontWeight: 300 }}>]</span>
          </div>
          <div style={{ marginTop: 40, height: 2, width: "100%", background: "#c98a00" }} />
          <div style={{ display: "flex", marginTop: 40, fontSize: 40, color: "#ede6d8" }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#8f8777" }}>AMICKLABS.COM</div>
      </div>
    ),
    size,
  );
}
