import Link from "next/link";

import { Button } from "@/components/ui/button";

import DeleteGameButton from "@/components/DeleteGameButton";
import ConfirmPresenceButton from "@/components/ConfirmPresenceButton";

import { createClient } from "@/lib/supabase-server";


export const dynamic = "force-dynamic";



export default async function PartidaDetalhes({

  params,

}: {

  params: Promise<{ id:string }>;

}) {


  const { id } = await params;


  const partidaId = Number(id);


  const supabase = await createClient();




  if(isNaN(partidaId)){

    return (

      <main className="p-8">

        Partida inválida

      </main>

    );

  }







  const {

    data: partida,

    error

  } = await supabase

    .from("partidas")

    .select("*")

    .eq(
      "id",
      partidaId
    )

    .single();







  if(error || !partida){

    return (

      <main className="p-8">

        Partida não encontrada

      </main>

    );

  }







  const {

    data: presencas

  } = await supabase

    .from("presencas")

    .select(`

      id,

      jogador_id,

      jogadores (

        id,

        nome,

        overall,

        posicao,

        posicao_secundaria

      )

    `)

    .eq(
      "partida_id",
      partidaId
    );









  const {

    data:{
      user
    }

  } = await supabase.auth.getUser();







  let jaConfirmado = false;







  if(user){


    const {

      data:jogador

    } = await supabase

      .from("jogadores")

      .select("id")

      .eq(
        "usuario_id",
        user.id
      )

      .maybeSingle();







    if(jogador){



      const {

        data:minhaPresenca

      } = await supabase

        .from("presencas")

        .select("id")

        .eq(
          "partida_id",
          partidaId
        )

        .eq(
          "jogador_id",
          jogador.id
        )

        .maybeSingle();







      jaConfirmado = !!minhaPresenca;



    }



  }









  return (

    <main className="min-h-screen bg-zinc-100 p-8">


      <div className="max-w-xl mx-auto bg-white rounded-xl p-8 shadow">



        <h1 className="text-4xl font-bold text-center mb-8">

          ⚽ Partida

        </h1>







        <div className="text-center space-y-5">



          <p className="text-lg">

            📅 Data:{" "}

            {

              partida.data
              .split("-")
              .reverse()
              .join("/")

            }

          </p>





          <p className="text-lg">

            ⏰ Horário: {partida.hora || "Não informado"}

          </p>







          {
            partida.valor_goleiro
            &&
            (

              <div className="bg-green-100 rounded-lg p-4 mt-4 text-left">


                <h2 className="font-bold text-xl mb-2">

                  🥅 Pagamento do goleiro

                </h2>



                <p>

                  💰 Valor: R$ {partida.valor_goleiro}

                </p>



                {
                  partida.pix_goleiro
                  &&
                  (

                    <p>

                      💳 Pix: {partida.pix_goleiro}

                    </p>

                  )
                }



              </div>

            )
          }








          <div>


            <p className="text-2xl font-bold">

              🟢 {partida.time_a}

            </p>





            <p className="text-5xl font-bold my-4">

              {partida.gols_a} x {partida.gols_b}

            </p>





            <p className="text-2xl font-bold">

              🟡 {partida.time_b}

            </p>


          </div>


        </div>









        <div className="mt-8">


          <ConfirmPresenceButton

            partidaId={partida.id}

            jaConfirmado={jaConfirmado}

          />


        </div>









        <div className="mt-8">



          <h2 className="text-2xl font-bold mb-4">

            👥 Confirmados ({presencas?.length ?? 0}/14)

          </h2>







          <div className="space-y-3">



            {

              presencas?.map((presenca:any)=>(


                <div

                  key={presenca.id}

                  className="bg-zinc-100 rounded-lg p-4"

                >



                  <p className="font-bold text-lg">

                    ✅ {presenca.jogadores.nome}

                  </p>




                  <p>

                    ⭐ Overall: {presenca.jogadores.overall ?? 0}

                  </p>




                  <p>

                    ⚽ {presenca.jogadores.posicao ?? "Sem posição"}

                    {
                      presenca.jogadores.posicao_secundaria
                      &&
                      ` | ${presenca.jogadores.posicao_secundaria}`
                    }

                  </p>



                </div>


              ))

            }



          </div>


        </div>









        <div className="flex gap-4 mt-8 items-stretch">



          <Button
            className="flex-1 h-full"
            render={
              <Link
                href={`/partidas/${partida.id}/editar`}
                className="w-full h-full flex justify-center items-center"
              />
            }
          >
            ✏️ Editar
          </Button>








          <div className="flex-1">


            <DeleteGameButton

              id={partida.id}

            />


          </div>





        </div>





      </div>


    </main>

  );


}