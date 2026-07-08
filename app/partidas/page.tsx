import GameCard from "@/components/GameCard"
import { games } from "@/data/games"


export default function Partidas() {

  return (

    <main className="min-h-screen bg-zinc-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        📅 Partidas
      </h1>


      <div className="flex gap-6">

        {games.map((game) => (

          <GameCard
            key={game.id}
            game={game}
          />

        ))}

      </div>


    </main>

  )
}