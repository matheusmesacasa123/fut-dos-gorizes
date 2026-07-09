"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import type { Player } from "@/types/player"


type Props = {
  initialData?: Partial<Player>
  onSubmit: (player: Player) => Promise<void>
  buttonText: string
}



export default function PlayerForm({
  initialData,
  onSubmit,
  buttonText,
}: Props) {


  const [nome, setNome] = useState(initialData?.nome ?? "")
  const [overall, setOverall] = useState(initialData?.overall?.toString() ?? "")
  const [chute, setChute] = useState(initialData?.chute?.toString() ?? "")
  const [passe, setPasse] = useState(initialData?.passe?.toString() ?? "")
  const [fisico, setFisico] = useState(initialData?.fisico?.toString() ?? "")

  const [erro, setErro] = useState("")



  function validarValor(valor: string) {

    const numero = Number(valor)

    return (
      valor !== "" &&
      numero >= 0 &&
      numero <= 100
    )

  }



  async function handleSubmit() {


    setErro("")


    if (!nome.trim()) {

      setErro("Digite o nome do jogador.")

      return

    }



    if (
      !validarValor(overall) ||
      !validarValor(chute) ||
      !validarValor(passe) ||
      !validarValor(fisico)
    ) {

      setErro("Os atributos devem estar entre 0 e 100.")

      return

    }



    await onSubmit({

      nome,

      overall: Number(overall),

      chute: Number(chute),

      passe: Number(passe),

      fisico: Number(fisico),

    })

  }




  return (

    <Card className="w-full max-w-xl p-8">


      <h1 className="text-3xl font-bold text-center mb-8">
        ⚽ Jogador
      </h1>



      {erro && (

        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">

          {erro}

        </div>

      )}



      <div className="space-y-5">


        <Input

          placeholder="Nome"

          value={nome}

          onChange={(e) => setNome(e.target.value)}

        />



        <div className="grid grid-cols-2 gap-4">


          <Input

            type="number"

            placeholder="Overall"

            value={overall}

            onChange={(e) => setOverall(e.target.value)}

          />



          <Input

            type="number"

            placeholder="Chute"

            value={chute}

            onChange={(e) => setChute(e.target.value)}

          />



          <Input

            type="number"

            placeholder="Passe"

            value={passe}

            onChange={(e) => setPasse(e.target.value)}

          />



          <Input

            type="number"

            placeholder="Físico"

            value={fisico}

            onChange={(e) => setFisico(e.target.value)}

          />


        </div>



        <Button

          className="w-full"

          onClick={handleSubmit}

        >

          {buttonText}

        </Button>


      </div>


    </Card>

  )

}