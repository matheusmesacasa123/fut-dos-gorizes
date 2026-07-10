import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/lib/supabase-server";


export const metadata: Metadata = {
  title: "Fut dos Gorizes",
  description: "Gerenciador de futebol",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Header de navegação só aparece para quem está logado.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (

    <html lang="pt-BR">

      <body>

        {user && <Navbar initialUserId={user.id} />}

        {children}

        <Toaster richColors position="top-right" />

      </body>

    </html>

  );

}
