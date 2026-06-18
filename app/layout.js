import "./globals.css";

export const metadata = {
  title: "Skin & Hair Insights",
  description: "Cosmetic photo assessment — not medical advice.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
