"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function Login() {


  const router = useRouter();


  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");



  async function entrar() {


    const { error } = await supabase.auth.signInWithPassword({

      email,
      password: senha,

    });



    if(error) {

      alert(error.message);
      return;

    }



    router.push("/partidas");
    router.refresh();


  }





  return (

    <main className="p-8 max-w-md mx-auto">


      <h1 className="text-3xl font-bold mb-6">
        Entrar
      </h1>



      <input

        className="border p-2 w-full mb-3"

        placeholder="Email"

        value={email}

        onChange={(e) => setEmail(e.target.value)}

      />



      <input

        className="border p-2 w-full mb-3"

        placeholder="Senha"

        type="password"

        value={senha}

        onChange={(e) => setSenha(e.target.value)}

      />



      <button

        onClick={entrar}

        className="bg-black text-white px-4 py-2 rounded w-full"

      >

        Entrar

      </button>


    </main>

  );

}