import { Kumbh_Sans, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Providers from "@/lib/Providers";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: {
    default: "Bookatable",
    template: "%s | Bookatable",
  },
  description:
    "The official homepage of the bookatable restaurant which enable diners to customize their booking by requesting a specific table location or view.",
};

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kumbhSans",
});
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${kumbhSans.variable} max-w-8xl flex min-h-screen flex-col`}
      >
        <Providers>
          <main className="z-10 flex-grow">{children}</main>

          <footer>
            <Footer />
          </footer>
        </Providers>

        {/* Toaster */}
        <Toaster richColors />

        {/* Top Loader */}
        <NextTopLoader
          color="#8ABA51"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #8ABA51,0 0 5px #000"
          zIndex={1600}
        />
      </body>
    </html>
  );
}
