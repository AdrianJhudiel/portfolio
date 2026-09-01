import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import { OG_BG_FROM, OG_BG_TO, OG_TEXT_DARK, OG_TEXT_MUTED, OG_ACCENT } from "@/lib/pearl-theme";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: `linear-gradient(180deg, ${OG_BG_FROM}, ${OG_BG_TO})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontFamily: "monospace",
            color: OG_ACCENT,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: OG_ACCENT,
              display: "flex",
            }}
          />
          {siteConfig.companyTitle} · {siteConfig.company}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: OG_TEXT_DARK,
            marginTop: 28,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: OG_TEXT_MUTED,
            marginTop: 20,
          }}
        >
          {siteConfig.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
