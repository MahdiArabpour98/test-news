import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const vazirRegular = localFont({
  src: [
    {
      path: "./fonts/vazir-matn/Vazirmatn-FD-Thin.woff2",
      weight: "100",
    },
    {
      path: "./fonts/vazir-matn/Vazirmatn-FD-ExtraLight.woff2",
      weight: "200",
    },
    {
      path: "./fonts/vazir-matn/Vazirmatn-FD-Light.woff2",
      weight: "300",
    },
    {
      path: "./fonts/vazir-matn/Vazirmatn-FD-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/vazir-matn/Vazirmatn-FD-Medium.woff2",
      weight: "500",
    },
    {
      path: "./fonts/vazir-matn/Vazirmatn-FD-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "./fonts/vazir-matn/Vazirmatn-FD-Bold.woff2",
      weight: "700",
    },
    {
      path: "./fonts/vazir-matn/Vazirmatn-FD-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "./fonts/vazir-matn/Vazirmatn-FD-Black.woff2",
      weight: "900",
    },
  ],
  variable: "--font-vazir",
});

export const metadata = {
  title: "News Application",
  description: "News Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className={`${vazirRegular.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="hsl(47.9 95.8% 53.1%)"
            height={4}
            shadow=""
            showSpinner={false}
          />
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
