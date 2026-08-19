import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import { BG_FROM, BG_TO, TEXT_DARK, TEXT_MUTED, ACCENT } from "@/lib/pearl-theme";

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
          background: `linear-gradient(180deg, ${BG_FROM}, ${BG_TO})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontFamily: "monospace",
            color: ACCENT,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: ACCENT,
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
            color: TEXT_DARK,
            marginTop: 28,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: TEXT_MUTED,
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
