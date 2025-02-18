import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const src = searchParams.get("src");
    const width = parseInt(searchParams.get("w") || "0", 10);
    const quality = parseInt(searchParams.get("q") || "75", 10);

    if (!src) {
      return NextResponse.json({ error: "Image not found" }, { status: 400 });
    }

    let imageBuffer: Buffer;

    if (src.startsWith("http")) {
      // 外部URLの画像を取得
      const response = await fetch(src, { cache: "no-store" });
      if (!response.ok) {
        return NextResponse.json(
          { error: "Failed to fetch image" },
          { status: 500 }
        );
      }
      imageBuffer = Buffer.from(await response.arrayBuffer());
    } else {
      // `public/` 内の画像を処理
      const imagePath = path.join(process.cwd(), "public", src);
      if (!fs.existsSync(imagePath)) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }
      imageBuffer = fs.readFileSync(imagePath);
    }

    // sharp で画像を変換
    let image = sharp(imageBuffer);
    if (width > 0) {
      image = image.resize({ width });
    }
    image = image.webp({ quality });

    const transformedImage = await image.toBuffer();

    return new NextResponse(transformedImage, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error },
      { status: 500 }
    );
  }
}