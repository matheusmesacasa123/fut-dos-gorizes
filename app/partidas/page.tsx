import Link from "next/link";
import GameCard from "@/components/GameCard";
import { supabase } from "@/lib/supabase";
import { verificarAdmin } from "@/lib/isAdmin";


export const dynamic = "force-dynamic";



export default async function Partidas() {


  const { data: games, error } = await supabase
    .from("partidas")
    .select("*")
    .order("id", {
      ascending: false,
    });



  if (error) {

    console.log(
      "Erro ao buscar partidas:",
      error
    );

  }



  const isAdmin = await verificarAdmin();


  console.log(
    "ADMIN NA PAGINA PARTIDAS:",
    isAdmin
  );




  return (

    <main className="min-h-screen bg-zinc-100 p-8">


      <div className="flex justify-between items-center mb-8">



        <h1 className="text-4xl font-bold">
          📅 Partidas
        </h1>





        {isAdmin && (

          <Link
            href="/partidas/nova"
            className="
              bg-green-600
              text-white
              px-5
              py-3
              rounded-lg
              font-semibold
              hover:bg-green-700
              transition
            "
          >

            ➕ Criar Partida

          </Link>

        )}



      </div>






      <div className="flex flex-wrap gap-6">


        {games?.map((game) => (

          <GameCard

            key={game.id}

            game={game}

          />

        ))}



      </div>




    </main>

  );

}