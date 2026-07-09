import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";


export default async function Home() {


  const { data: players, error } = await supabase
    .from("jogadores")
    .select("*");



  if (error) {

    console.log("Erro ao buscar jogadores:", error);

  }



  const totalJogadores = players?.length ?? 0;



  const melhorOverall = players?.length
    ? players.reduce((a, b) =>
        a.overall > b.overall ? a : b
      )
    : null;



  const maiorChute = players?.length
    ? players.reduce((a, b) =>
        a.chute > b.chute ? a : b
      )
    : null;



  const melhorPasse = players?.length
    ? players.reduce((a, b) =>
        a.passe > b.passe ? a : b
      )
    : null;



  const melhorFisico = players?.length
    ? players.reduce((a, b) =>
        a.fisico > b.fisico ? a : b
      )
    : null;



  return (

    <main className="min-h-screen bg-zinc-100 p-8">


      <h1 className="text-5xl font-bold mb-10">
        ⚽ Fut dos Gorizes
      </h1>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


        <Card className="p-6">

          <h2 className="text-xl font-bold">
            👥 Jogadores
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {totalJogadores}
          </p>

        </Card>




        <Card className="p-6">

          <h2 className="text-xl font-bold">
            ⭐ Melhor Overall
          </h2>


          <p className="text-2xl mt-4 font-bold">

            {melhorOverall
              ? `${melhorOverall.nome} - ${melhorOverall.overall}`
              : "Nenhum"}

          </p>

        </Card>




        <Card className="p-6">

          <h2 className="text-xl font-bold">
            ⚽ Melhor Chute
          </h2>


          <p className="text-2xl mt-4 font-bold">

            {maiorChute
              ? `${maiorChute.nome} - ${maiorChute.chute}`
              : "Nenhum"}

          </p>

        </Card>




        <Card className="p-6">

          <h2 className="text-xl font-bold">
            🎯 Melhor Passe
          </h2>


          <p className="text-2xl mt-4 font-bold">

            {melhorPasse
              ? `${melhorPasse.nome} - ${melhorPasse.passe}`
              : "Nenhum"}

          </p>

        </Card>


      </div>



      <Card className="mt-8 p-6">


        <h2 className="text-2xl font-bold mb-4">
          💪 Maior físico
        </h2>


        <p className="text-xl">

          {melhorFisico
            ? `${melhorFisico.nome} - ${melhorFisico.fisico}`
            : "Nenhum"}

        </p>


      </Card>



    </main>

  );
}