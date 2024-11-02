import { ImageResponse } from "@vercel/og";
import { format } from "date-fns";
import Image from "next/image";
import { NextRequest } from "next/server";

// import { ENV } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");
  const url = searchParams.get("url");
  const isRtl = searchParams.get("isRtl");
  const date = searchParams.get("date");

  const font = fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-400-normal.ttf"
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#1B1B1E",
          paddingLeft: 60,
          paddingRight: 60,
          gap: 0,
        }}
      >
        <p
          style={{
            display: "flex",
            fontSize: 20,
            lineHeight: 0.2,
            fontFamily: "Geist Mono",
            fontStyle: "normal",
            textAlign: "left",
            color: "#F56E0F",
          }}
        >
          By Zeyad on {format(new Date(date || ""), "dd MMM yyyy")}
        </p>
        <p
          style={{
            display: "flex",
            fontSize: 48,
            lineHeight: 1.2,
            fontFamily: "Geist Mono",
            fontStyle: "normal",
            color: "#C6C6C6",
            ...(isRtl === "true"
              ? {
                  direction: "rtl",
                  textAlign: "right",
                  writingDirection: "rtl",
                }
              : {
                  direction: "ltr",
                  textAlign: "left",
                }),
          }}
          {...(isRtl === "true" ? { dir: "rtl" } : { dir: "ltr" })}
        >
          {postTitle}
        </p>
        <p
          style={{
            display: "flex",
            fontSize: 16,
            lineHeight: 1.2,
            fontFamily: "Geist Mono",
            fontStyle: "normal",
            textAlign: "left",
            color: "#b6b6b6",
          }}
        >
          {url}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist Mono",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
