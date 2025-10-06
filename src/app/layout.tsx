import Footer from "@/components/Footer/footer";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar/navbar";
import type { Metadata } from "next";
import "./global.css";
import { Poppins } from "next/font/google";
import { UserProvider } from "@/context/userContext";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  fallback: [
    "Trebuchet MS",
    "Lucida Sans Unicode",
    "Lucida Grande",
    "Lucida Sans",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Create Blog Post",
  icons: {
    icon: "/favicon.ico",
  },
};
// const pathName = headers().get("next-url") || "";
// console.log(pathName);
// const hideElement = pathName.startsWith("/signIn");
// console.log(hideElement);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <div className='overall-container'>
          <UserProvider>
            {<Navbar />}
            {children}
            <Footer />
          </UserProvider>
          <Toaster position='top-right' />
        </div>
      </body>
    </html>
  );
}
