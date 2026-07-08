import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Game {
  local: string
  data: string
  horario: string
  goleiro: number
  pix: string
  jogadores: string[]
}


export default function GameCard({ game }: { game: Game }) {

  return (

    <Card className="max-w-md bg-green-700 text-white">

      <CardHeader>

        <CardTitle className="text-2xl">
          📅 Próxima Pelada
        </CardTitle>

      </CardHeader>


      <CardContent className="space-y-3">

        <p>
          📍 Local: {game.local}
        </p>

        <p>
          🗓 Data: {game.data}
        </p>

        <p>
          ⏰ Horário: {game.horario}
        </p>

        <p>
          🧤 Goleiro: R${game.goleiro}
        </p>

        <p>
          💰 Pix: {game.pix}
        </p>


        <div className="mt-5">

          <h3 className="font-bold">
            👥 Confirmados:
          </h3>


          {game.jogadores.map((jogador) => (

            <p key={jogador}>
              ✅ {jogador}
            </p>

          ))}


        </div>


      </CardContent>

    </Card>

  )
}