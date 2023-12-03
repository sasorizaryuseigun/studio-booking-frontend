// import './globals.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studio Booking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        ></link>
      </head>
      <body className={inter.className}>
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <h1 class="navbar-brand">Studio Booking</h1>
          </div>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  );
}
