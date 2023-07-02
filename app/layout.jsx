import { Chewy } from "next/font/google";

import "../styles/globals.css";
import Provider from "@/components/Provider";

const chewy = Chewy({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-chewy",
});

export const metadata = {
  title: "Memories",
  description: "Create and Share Memories",
};
function RootLayout({ children }) {
  return (
    <html lang="en" className={`${chewy.variable}`}>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;
