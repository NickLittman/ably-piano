import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "./providers";
import NavBar from "./components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <>
            <NavBar />
            {children}
          </>
        </Providers>
      </body>
    </html>
  );
}
