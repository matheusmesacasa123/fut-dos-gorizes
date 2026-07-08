import PlayerCard from "@/components/PlayerCard"
import { players } from "@/data/players"

export default function Jogadores() {
  return (
    <main className="min-h-screen bg-zinc-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        👥 Jogadores
      </h1>

      <div className="flex flex-wrap gap-6">

        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
          />
        ))}

      </div>

    </main>
  )
}