import { NextRequest, NextResponse } from "next/server";

/**
 * 管理画面の合言葉。
 *
 * Cookie には合言葉そのものではなく、そこから作った印（SHA-256）を入れる。
 * 印は合言葉が分からなければ作れないので、これで足りる。
 */
const COOKIE = "admin-session";

async function sessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`portfolio-admin:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** 長さの差で早く返らない比較。 */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: "Admin password not configured" }, { status: 500 });
  }

  if (typeof password === "string" && safeEqual(password, adminPassword)) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE, await sessionToken(adminPassword), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return response;
  }

  // 外れたときだけ一秒待たせる（機械の総当たりを遅くする）
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get(COOKIE)?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (session && adminPassword && safeEqual(session, await sessionToken(adminPassword))) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
