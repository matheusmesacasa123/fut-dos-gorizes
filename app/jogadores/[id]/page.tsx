import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

import DeletePlayerButton from "@/components/DeletePlayerButton";


export default async function PerfilJogador({

  params,

}: {

  params: Promise<{ id: string }>;

}) {


  const { id } = await params;


  const jogadorId = Number(id);



  if (isNaN(jogadorId)) {

    return (

      <main className="p-8">

        Jogador inválido

      </main>

    );

  }




  const { data: player, error } = await supabase

    .from("jogadores")

    .select("*")

    .eq("id", jogadorId)

    .single();





  if(error || !player){

    return (

      <main className="p-8">

        Jogador não encontrado

      </main>

    );

  }





  // VERIFICAR SE USUÁRIO LOGADO É ADMIN

  const {

    data: {
      user
    }

  } = await supabase.auth.getUser();




  let isAdmin = false;




  if(user){


    const {

      data: jogadorLogado

    } = await supabase

      .from("jogadores")

      .select("admin")

      .eq(
        "usuario_id",
        user.id
      )

      .single();




    if(jogadorLogado?.admin){

      isAdmin = true;

    }


  }







  return (

    <main className="min-h-screen bg-zinc-100 p-8">


      <div className="max-w-xl mx-auto bg-white rounded-xl p-8 shadow">



        <h1 className="text-4xl font-bold mb-6">

          {player.nome}

        </h1>





        {
          player.foto_url
          &&

          <img

            src={player.foto_url}

            alt={player.nome}

            className="
              w-32
              h-32
              rounded-full
              object-cover
              mx-auto
              mb-6
            "

          />

        }







        <div className="space-y-3 text-lg">


          <p>
            ⭐ Overall: {player.overall}
          </p>


          <p>
            ⚽ Chute: {player.chute}
          </p>


          <p>
            🎯 Passe: {player.passe}
          </p>


          <p>
            💪 Físico: {player.fisico}
          </p>



        </div>








        {
          isAdmin
          &&

          (

            <div className="flex gap-4 mt-8">


              <Button asChild>


                <Link href={`/jogadores/${player.id}/editar`}>

                  ✏️ Editar

                </Link>


              </Button>





              <DeletePlayerButton

                id={player.id}

              />



            </div>

          )

        }




      </div>


    </main>

  );

}