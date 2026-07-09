"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { supabase } from "@/lib/supabase";



interface Props {

  partidaId:number;

  jaConfirmado:boolean;

}



export default function ConfirmPresenceButton({

  partidaId,

  jaConfirmado

}:Props){



  const [confirmado,setConfirmado] = useState(
    jaConfirmado
  );


  const [loading,setLoading] = useState(false);

  const router = useRouter();







  async function alterarPresenca(){


    try{


      setLoading(true);



      const {

        data:{
          session
        }

      } = await supabase.auth.getSession();







      if(!session){

        alert("Usuário não autenticado");

        return;

      }







      const response = await fetch(

        "/api/presencas",

        {

          method:

          confirmado

          ? "DELETE"

          : "POST",





          headers:{

            "Content-Type":"application/json",


            Authorization:

            `Bearer ${session.access_token}`

          },





          body:JSON.stringify({

            partida_id:partidaId

          })

        }

      );








      const data = await response.json();







      if(!response.ok){

        alert(data.message || "Erro");

        return;

      }







      setConfirmado(!confirmado);



      router.refresh();




    }


    catch(error){

      console.log(error);

      alert("Erro de conexão");

    }


    finally{

      setLoading(false);

    }


  }









  return (

    <Button

      className="
        w-full
        cursor-pointer
      "

      disabled={loading}

      onClick={alterarPresenca}

    >

      {

        loading

        ?

        "Aguarde..."

        :

        confirmado

        ?

        "❌ Retirar presença"

        :

        "✅ Confirmar presença"

      }


    </Button>

  );


}