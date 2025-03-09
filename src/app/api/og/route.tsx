import { format } from "date-fns";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");
  const url = searchParams.get("url");
  const isRtl = searchParams.get("isRtl");
  const date = searchParams.get("date") || new Date().toISOString();

  const image = await (
    await fetch(
      `${
        process.env.OG_IMAGE_GENERATOR
      }?title=${postTitle}&url=${url}&date=${format(
        new Date(date || ""),
        "dd MMM yyyy"
      )}&isRtl=${isRtl}`
    )
  ).blob();

  try {
    if (image)
      return new Response(image, {
        headers: {
          "Content-Type": "image/png",
        },
      });
  } catch (e) {
    console.error(e);
  }
}
