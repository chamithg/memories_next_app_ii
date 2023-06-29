import "../styles/globals.css";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Memories",
  description: "Create and Share Memories",
};
function RootLayout({ children }) {
  return (
    <html lang="en">
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
