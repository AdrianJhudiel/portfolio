import { ImageResponse } from "next/og";
import { OG_BG_TO, OG_ACCENT, OG_TEXT_DARK } from "@/lib/pearl-theme";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: OG_BG_TO,
          borderRadius: 8,
          border: `2px solid ${OG_ACCENT}`,
          fontSize: 16,
          fontWeight: 700,
          color: OG_TEXT_DARK,
        }}
      >
        JA
      </div>
    ),
    { ...size }
  );
}
