"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/AuthUserContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </AuthContextProvider>
    </div>
  );
}
