import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin-session")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!session || !adminPassword || session !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const photosDir = path.join(process.cwd(), "public", "photos");

  try {
    const files = fs.readdirSync(photosDir).filter((f) => {
      const ext = f.toLowerCase();
      return (
        ext.endsWith(".jpg") ||
        ext.endsWith(".jpeg") ||
        ext.endsWith(".png") ||
        ext.endsWith(".webp")
      );
    });

    return NextResponse.json({
      photos: files.map((f) => `/photos/${f}`),
    });
  } catch {
    return NextResponse.json({ photos: [] });
  }
}
