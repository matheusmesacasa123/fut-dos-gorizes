"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { supabase } from "@/lib/supabase";



export default function DeleteGameButton({

  id,

}: {

  id:number;

}) {


  const router = useRouter();







  async function excluir(){


    try {



      const {

        data:{
          session
        }

      } = await supabase.auth.getSession();







      if(!session){


        toast.error(
          "Usuário não autenticado"
        );


        return;


      }








      const response = await fetch(

        `/api/partidas/${id}`,

        {


          method:"DELETE",



          headers:{


            Authorization:

            `Bearer ${session.access_token}`


          }



        }

      );








      if(!response.ok){


        const data = await response.json();


        console.log(

          "ERRO DELETE PARTIDA:",

          data

        );



        toast.error(

          data.error ||

          data.message ||

          "Erro ao excluir partida"

        );



        return;


      }









      toast.success(

        "Partida excluída"

      );




      router.push(

        "/partidas"

      );



      router.refresh();




    }

    catch(error){



      console.log(

        "ERRO DELETE:",

        error

      );



      toast.error(

        "Erro de conexão"

      );



    }



  }









  return (


    <AlertDialog>



      <AlertDialogTrigger


        render={


          <Button


            variant="destructive"


            className="
              h-12
              w-full
              cursor-pointer
              font-black
            "


          />


        }


      >



        <Trash2 size={18} />



        Excluir




      </AlertDialogTrigger>








      <AlertDialogContent>



        <AlertDialogHeader>



          <AlertDialogMedia className="text-destructive">


            <Trash2 />


          </AlertDialogMedia>








          <AlertDialogTitle>


            Excluir partida?


          </AlertDialogTitle>








          <AlertDialogDescription>


            Essa ação remove a partida e não pode ser desfeita.


          </AlertDialogDescription>





        </AlertDialogHeader>








        <AlertDialogFooter>



          <AlertDialogCancel>


            Cancelar


          </AlertDialogCancel>








          <AlertDialogAction


            variant="destructive"


            onClick={excluir}


          >



            Excluir




          </AlertDialogAction>






        </AlertDialogFooter>






      </AlertDialogContent>






    </AlertDialog>


  );


}