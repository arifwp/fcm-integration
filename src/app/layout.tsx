import { NotificationProvider } from "@/context/FirebaseContext";
import Providers from "@/utils/Providers";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          <NotificationProvider>
            <>
              <div>
                <Toaster
                  position="bottom-center"
                  toastOptions={{
                    style: {
                      background: "#ffffff",
                      color: "#333333",
                    },
                  }}
                />
              </div>
              {children}
            </>
          </NotificationProvider>
        </Providers>
      </body>
    </html>
  );
}
