"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


export default function NovaPartida() {


  const router = useRouter();


  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [local, setLocal] = useState("");
  const [timeA, setTimeA] = useState("");
  const [timeB, setTimeB] = useState("");
  const [golsA, setGolsA] = useState("0");
  const [golsB, setGolsB] = useState("0");

  const [pixGoleiro, setPixGoleiro] = useState("");
  const [valorGoleiro, setValorGoleiro] = useState("");

  const [loading, setLoading] = useState(false);




  async function criarPartida() {


    setLoading(true);



    const response = await fetch(
      "/api/partidas",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },


        body: JSON.stringify({

          data,

          hora,

          local,

          time_a: timeA,

          time_b: timeB,

          gols_a: Number(golsA),

          gols_b: Number(golsB),

          pix_goleiro: pixGoleiro,

          valor_goleiro: Number(valorGoleiro),


        }),

      }
    );



    if (!response.ok) {

      alert("Erro ao criar partida");

      setLoading(false);

      return;

    }



    alert("Partida criada com sucesso!");

    router.push("/partidas");

    router.refresh();


  }






  return (

    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-8">


      <Card className="w-full max-w-xl p-8">


        <h1 className="text-3xl font-bold mb-8 text-center">
          ⚽ Nova Partida
        </h1>




        <div className="space-y-5">



          <Input

            type="date"

            value={data}

            onChange={(e)=>
              setData(e.target.value)
            }

          />



          <Input

            type="time"

            value={hora}

            onChange={(e)=>
              setHora(e.target.value)
            }

          />



          <Input

            placeholder="📍 Local da partida"

            value={local}

            onChange={(e)=>
              setLocal(e.target.value)
            }

          />



          <Input

            placeholder="Time A"

            value={timeA}

            onChange={(e)=>
              setTimeA(e.target.value)
            }

          />



          <Input

            placeholder="Time B"

            value={timeB}

            onChange={(e)=>
              setTimeB(e.target.value)
            }

          />



          <div className="grid grid-cols-2 gap-4">


            <Input

              type="number"

              value={golsA}

              onChange={(e)=>
                setGolsA(e.target.value)
              }

            />



            <Input

              type="number"

              value={golsB}

              onChange={(e)=>
                setGolsB(e.target.value)
              }

            />


          </div>





          <Input

            placeholder="💳 Pix do goleiro"

            value={pixGoleiro}

            onChange={(e)=>
              setPixGoleiro(e.target.value)
            }

          />





          <Input

            type="number"

            placeholder="💰 Valor do goleiro"

            value={valorGoleiro}

            onChange={(e)=>
              setValorGoleiro(e.target.value)
            }

          />





          <Button

            className="w-full cursor-pointer"

            onClick={criarPartida}

            disabled={loading}

          >

            {loading
              ? "Criando..."
              : "⚽ Criar Partida"
            }

          </Button>



        </div>


      </Card>


    </main>

  );

}