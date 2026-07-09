"use client"

import Link from "next/link"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



interface Game {

  id: number

  data: string

  local: string

  time_a: string

  time_b: string

  gols_a: number

  gols_b: number

}



export default function GameCard({
  game,
}: {
  game: Game
}) {



  return (

    <Card className="w-80 bg-green-700 text-white">


      <CardHeader>

        <CardTitle className="text-2xl">

          ⚽ Partida

        </CardTitle>

      </CardHeader>





      <CardContent className="space-y-4">



        <p>

          📅 Data:{" "}

          {game.data
            .split("-")
            .reverse()
            .join("/")}

        </p>





        <p>

          📍 Local:{" "}

          {game.local}

        </p>







        <div className="text-center">



          <div className="flex justify-center items-center gap-3">


            <p className="text-xl font-bold">

              {game.time_a}

            </p>



            <p className="text-xl font-bold">

              X

            </p>



            <p className="text-xl font-bold">

              {game.time_b}

            </p>


          </div>







          <p className="text-4xl font-bold my-4">

            {game.gols_a} x {game.gols_b}

          </p>



        </div>








        <div className="flex gap-3 mt-5">


          <Link

            href={`/partidas/${game.id}`}

            className="
              flex-1
              bg-white
              text-green-700
              font-bold
              py-2
              rounded-lg
              text-center
              hover:bg-gray-200
              transition
            "

          >

            👁️ Ver

          </Link>



        </div>





      </CardContent>


    </Card>

  )

}