import MainProvider from "../src/components/provider/main-provider";
import "./globals.scss";
import {
  Poppins,
  Inter,
  Oswald,
  Rajdhani,
  Roboto,
  Space_Grotesk,
  Syne,
} from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-poppins",
});
const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: ["--tp-ff-inter", "--tp-ff-body", "--tp-ff-p"],
});
const oswald = Oswald({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-oswald",
});
const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-rajdhani",
});
const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-roboto",
});
const space = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-heading",
});
const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--tp-ff-syne",
});

export const metadata = {
  title: "Oakistni Electronics - E-commerce Store",
  description: "Modern e-commerce store built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} ${oswald.variable} ${rajdhani.variable}  ${roboto.variable} ${space.variable} ${syne.variable}`}
      >
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
