"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"


export default function DeleteGameButton({
  id,
}: {
  id: number
}) {


  const router = useRouter()



  async function excluir() {


    const confirmar = confirm(
      "Deseja excluir essa partida?"
    )


    if (!confirmar) return



    const response = await fetch(
      `/api/partidas/${id}`,
      {
        method: "DELETE",
      }
    )



    if (!response.ok) {

      alert("Erro ao excluir partida")

      return

    }



    router.push("/partidas")

    router.refresh()

  }




  return (

    <Button

      variant="destructive"

      onClick={excluir}

      className="
        w-full
        h-full
        flex
        justify-center
        items-center
        cursor-pointer
      "

    >

      🗑️ Excluir

    </Button>

  )

}