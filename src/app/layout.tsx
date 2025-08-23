import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Navbar/navbar";
import type { Metadata } from "next";
import './global.css'
import { Poppins } from "next/font/google";
import { UserProvider } from "@/context/userContext";

const poppins = Poppins({weight:["100", "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description: "Create Blog Post",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className='overall-container'>
          <UserProvider>
            <Navbar/>
              {children}
            <Footer/>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
