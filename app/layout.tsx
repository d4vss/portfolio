import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${outfit.variable} antialiased flex flex-col min-h-screen`}
      >
        <div
          className="fixed dark:invert w-screen h-dvh opacity-15 max-md:opacity-25 dark:opacity-15 dark:max-md:opacity-25 -z-10"
          style={{
            backgroundImage: 'url("/topography.svg")',
            backgroundRepeat: "repeat",
            backgroundSize: "25%",
            backgroundAttachment: "fixed",
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-grow m-5 md:m-10">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
