import Head from "next/head";
import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="">
      <Head>
        <title>Salsa Therapy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-inter antialiased bg-gray-100 text-gray-600 min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex flex-col justify-between">
          <div className="container mx-auto">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};