import { players } from "@/data/players"

export default async function PlayerProfile({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const player = players.find(
    (p) => p.id === Number(id)
  )


  if (!player) {
    return (
      <main className="p-8">
        Jogador não encontrado
      </main>
    )
  }


  return (
    <main className="min-h-screen bg-zinc-100 p-8">

      <div className="max-w-xl mx-auto bg-green-700 text-white rounded-xl p-8">

        <div className="text-center">

          <div className="text-6xl">
            ⚽
          </div>

          <h1 className="text-4xl font-bold mt-4">
            {player.name}
          </h1>

          <div className="text-6xl font-bold mt-4">
            {player.overall}
          </div>

        </div>


        <div className="mt-8 space-y-3 text-xl">

          <p>
            🥅 Chute: {player.chute}
          </p>

          <p>
            🎯 Passe: {player.passe}
          </p>

          <p>
            💪 Físico: {player.fisico}
          </p>

        </div>


      </div>

    </main>
  )
}