import { Card, CardContent } from "@/components/ui/card"

interface Player {
  name: string
  overall: number
  chute: number
  passe: number
  fisico: number
}

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <Card className="w-64 bg-green-700 text-white">

      <CardContent className="p-6 text-center">

        <div className="text-5xl">
          ⚽
        </div>

        <h2 className="text-2xl font-bold mt-4">
          {player.name}
        </h2>

        <div className="text-5xl font-bold mt-3">
          {player.overall}
        </div>

        <div className="mt-5 space-y-2 text-left">

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

      </CardContent>

    </Card>
  )
}