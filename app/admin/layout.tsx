import "../globals.css";

export const metadata = {
  title: "管理者 | 佐藤公宜",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <body className="bg-sumi-black text-washi-white antialiased">
        {children}
      </body>
    </html>
  );
}
