import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";



interface Params {

  params: Promise<{
    id:string;
  }>;

}









// BUSCAR UMA PARTIDA

export async function GET(

  request:NextRequest,

  {params}:Params

){


  const supabase = await createClient();


  const {id} = await params;





  const {

    data,

    error

  } = await supabase

    .from("partidas")

    .select("*")

    .eq(

      "id",

      Number(id)

    )

    .single();







  if(error){


    return NextResponse.json(

      {
        error:error.message
      },

      {
        status:404
      }

    );

  }







  return NextResponse.json(data);


}











// EDITAR PARTIDA

export async function PUT(

  request:NextRequest,

  {params}:Params

){


  const supabase = await createClient();


  const {id} = await params;


  const body = await request.json();







  const {

    data,

    error

  } = await supabase

    .from("partidas")

    .update(body)

    .eq(

      "id",

      Number(id)

    )

    .select()

    .single();







  if(error){


    return NextResponse.json(

      {
        error:error.message
      },

      {
        status:500
      }

    );

  }







  return NextResponse.json(data);


}











// EXCLUIR PARTIDA

export async function DELETE(

  request:NextRequest,

  {params}:Params

){


  const supabase = await createClient();



  const {id} = await params;


  const partidaId = Number(id);







  // Pegar token enviado pelo cliente

  const authHeader = request.headers.get(
    "Authorization"
  );






  if(!authHeader){


    return NextResponse.json(

      {
        error:"Token não enviado"
      },

      {
        status:401
      }

    );

  }







  const token = authHeader.replace(

    "Bearer ",

    ""

  );








  const {

    data:{
      user
    },

    error:userError

  } = await supabase.auth.getUser(token);








  if(userError || !user){


    return NextResponse.json(

      {
        error:"Usuário não autenticado"
      },

      {
        status:401
      }

    );

  }








  // Verificar administrador

  const {

    data:jogador,

    error:jogadorError

  } = await supabase

    .from("jogadores")

    .select("admin")

    .eq(

      "usuario_id",

      user.id

    )

    .single();








  if(

    jogadorError ||

    jogador?.admin !== true

  ){


    return NextResponse.json(

      {
        error:"Apenas administradores podem excluir partidas"
      },

      {
        status:403
      }

    );

  }









  // Apagar estatísticas da partida

  const {

    error:estatisticasError

  } = await supabase

    .from("estatisticas_partidas")

    .delete()

    .eq(

      "partida_id",

      partidaId

    );







  if(estatisticasError){


    return NextResponse.json(

      {
        error:estatisticasError.message
      },

      {
        status:500
      }

    );

  }









  // Apagar presenças

  const {

    error:presencasError

  } = await supabase

    .from("presencas")

    .delete()

    .eq(

      "partida_id",

      partidaId

    );







  if(presencasError){


    return NextResponse.json(

      {
        error:presencasError.message
      },

      {
        status:500
      }

    );

  }









  // Apagar partida

  const {

    error

  } = await supabase

    .from("partidas")

    .delete()

    .eq(

      "id",

      partidaId

    );








  if(error){


    return NextResponse.json(

      {
        error:error.message
      },

      {
        status:500
      }

    );

  }








  return NextResponse.json({

    success:true

  });


}