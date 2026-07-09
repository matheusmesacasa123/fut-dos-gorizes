import PlayerCard from "@/components/PlayerCard";
import { supabase } from "@/lib/supabase";


export default async function Jogadores() {


  const { data: players, error } = await supabase
    .from("jogadores")
    .select("*");



  if (error) {

    console.log(
      "ERRO SUPABASE:",
      JSON.stringify(error, null, 2)
    );

  }





  return (

    <main className="min-h-screen bg-zinc-100 p-8">


      <div className="mb-8">


        <h1 className="text-4xl font-bold">

          👥 Jogadores

        </h1>


      </div>





      <div className="flex flex-wrap gap-6">


        {players?.map((player) => (


          <PlayerCard

            key={player.id}

            player={player}

          />


        ))}



      </div>



    </main>

  );

}