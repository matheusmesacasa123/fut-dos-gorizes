"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function Navbar() {

  const router = useRouter();

  const [usuario, setUsuario] = useState<any>(null);
  const [nome, setNome] = useState("");



  useEffect(() => {


    async function verificarUsuario() {


      const { data } = await supabase.auth.getUser();


      if(data.user){

        setUsuario(data.user);


        const { data: jogador } = await supabase
          .from("jogadores")
          .select("nome")
          .eq("usuario_id", data.user.id)
          .single();



        if(jogador){

          setNome(jogador.nome);

        }

      }


    }


    verificarUsuario();



    const {
      data: listener
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {


        setUsuario(session?.user ?? null);



        if(session?.user){


          const { data: jogador } = await supabase
            .from("jogadores")
            .select("nome")
            .eq("usuario_id", session.user.id)
            .single();



          if(jogador){

            setNome(jogador.nome);

          }


        } else {

          setNome("");

        }


      }
    );



    return () => {

      listener.subscription.unsubscribe();

    };


  }, []);





  async function sair(){

    await supabase.auth.signOut();

    setUsuario(null);
    setNome("");

    router.push("/");

  }




  return (

    <nav className="bg-green-800 text-white px-8 py-4 flex justify-between items-center">


      <Link
        href="/"
        className="text-2xl font-bold"
      >
        ⚽ Fut dos Gorizes
      </Link>



      <div className="flex gap-6 font-semibold items-center">


        <Link
          href="/"
          className="hover:text-yellow-400 transition"
        >
          🏠 Dashboard
        </Link>



        <Link
          href="/jogadores"
          className="hover:text-yellow-400 transition"
        >
          👥 Jogadores
        </Link>



        {usuario && (

          <Link
            href="/jogador/configurar"
            className="hover:text-yellow-400 transition"
          >
            ⚽ Meu Jogador
          </Link>

        )}



        <Link
          href="/partidas"
          className="hover:text-yellow-400 transition"
        >
          ⚔️ Partidas
        </Link>



        <Link
          href="/ranking"
          className="hover:text-yellow-400 transition"
        >
          🏆 Ranking
        </Link>





        {usuario ? (

          <>

            <span className="text-sm">
              👤 Olá {nome || "Jogador"}
            </span>



            <button
              onClick={sair}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Sair
            </button>


          </>


        ) : (

          <>

            <Link
              href="/login"
              className="bg-white text-green-800 px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Entrar
            </Link>



            <Link
              href="/cadastro"
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:text-yellow-300 transition"
            >
              Cadastro
            </Link>


          </>

        )}


      </div>


    </nav>

  );

}