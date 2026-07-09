import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Trophy,
  Goal,
  Target,
  Dumbbell,
  Pencil,
} from "lucide-react";

import type { Player } from "@/types/player";


function Barra({ valor }: { valor: number }) {

  return (

    <div className="w-full h-2 bg-green-900 rounded-full overflow-hidden">

      <div

        className="h-full bg-yellow-400"

        style={{
          width: `${valor}%`
        }}

      />

    </div>

  );

}





export default function PlayerCard({

  player,

  isAdmin = false,

}: {

  player: Player;

  isAdmin?: boolean;

}) {


  return (


    <Card className="w-80 bg-gradient-to-br from-green-700 to-green-900 text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0">


      <CardContent className="p-6">



        <Link href={`/jogadores/${player.id}`}>



          <div className="flex justify-between items-center">


            {
              player.foto_url

              ?

              <img

                src={player.foto_url}

                alt={player.nome}

                className="
                  w-16
                  h-16
                  rounded-full
                  object-cover
                  border-2
                  border-white
                "

              />


              :


              <div className="bg-white/20 rounded-full p-3">

                <User size={34}/>

              </div>

            }




            <div className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">


              <Trophy size={18}/>

              {player.overall}


            </div>



          </div>





          <h2 className="text-2xl font-bold text-center mt-5">

            {player.nome}

          </h2>






          <div className="mt-8 space-y-5">



            <div>

              <div className="flex justify-between mb-1">

                <span className="flex items-center gap-2">

                  <Goal size={18}/>

                  Chute

                </span>


                <strong>
                  {player.chute}
                </strong>


              </div>


              <Barra valor={player.chute}/>


            </div>






            <div>


              <div className="flex justify-between mb-1">


                <span className="flex items-center gap-2">

                  <Target size={18}/>

                  Passe

                </span>


                <strong>
                  {player.passe}
                </strong>


              </div>


              <Barra valor={player.passe}/>


            </div>






            <div>


              <div className="flex justify-between mb-1">


                <span className="flex items-center gap-2">

                  <Dumbbell size={18}/>

                  Físico

                </span>


                <strong>
                  {player.fisico}
                </strong>


              </div>


              <Barra valor={player.fisico}/>


            </div>



          </div>




        </Link>






        {
          isAdmin
          &&
          (

            <Link

              href={`/jogadores/${player.id}/editar`}

              className="mt-8 flex justify-center"

            >


              <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-lg hover:bg-white/25">


                <Pencil size={18}/>

                Editar jogador


              </div>


            </Link>

          )

        }




      </CardContent>


    </Card>


  );

}