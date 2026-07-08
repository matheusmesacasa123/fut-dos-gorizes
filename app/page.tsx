import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold">
          ⚽ Fut dos Gorizes
        </h1>

        <p className="text-zinc-500 mt-2">
          Organize suas partidas de futebol.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <Card>
            <CardHeader>
              <CardTitle>📅 Próxima Pelada</CardTitle>
            </CardHeader>

            <CardContent>

              <p><b>Data:</b> Quinta-feira</p>

              <p><b>Horário:</b> 20:00</p>

              <p><b>Local:</b> Arena Society</p>

              <p><b>Valor:</b> R$25</p>

              <Button className="mt-6 w-full">
                Confirmar Presença
              </Button>

            </CardContent>
          </Card>

          <Card>

            <CardHeader>

              <CardTitle>
                🏆 Ranking
              </CardTitle>

            </CardHeader>

            <CardContent>

              <p>🥇 João - 87</p>

              <p>🥈 Pedro - 85</p>

              <p>🥉 Matheus - 84</p>

            </CardContent>

          </Card>

        </div>

      </div>
    </main>
  )
}