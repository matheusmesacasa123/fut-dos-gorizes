"use client";

import { useEffect, useState } from "react";


interface Jogador {
  id: number;
  nome: string;
  overall: number;
}


export default function ConfirmedPlayers({
  partidaId
}: {
  partidaId: number;
}) {


  const [jogadores, setJogadores] = useState<Jogador[]>([]);



  useEffect(() => {

    async function buscarPresencas() {

      const response = await fetch(
        `/api/presencas?partida_id=${partidaId}`
      );


      const data = await response.json();


      const lista = data.map(
        (item: any) => item.jogadores
      );


      setJogadores(lista);

    }


    buscarPresencas();


  }, [partidaId]);




  return (

    <div className="mt-8">


      <h2 className="text-xl font-bold mb-4">
        👥 Confirmados ({jogadores.length}/14)
      </h2>



      <div className="space-y-2">


        {jogadores.length === 0 && (

          <p className="text-zinc-500">
            Nenhum jogador confirmado ainda.
          </p>

        )}



        {jogadores.map((jogador) => (

          <div
            key={jogador.id}
            className="bg-zinc-100 rounded-lg p-3 flex justify-between"
          >

            <span>
              ✅ {jogador.nome}
            </span>


            <span>
              ⭐ {jogador.overall}
            </span>


          </div>

        ))}


      </div>


    </div>

  );

}