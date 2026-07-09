import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";



// GET - Buscar presenças de uma partida
export async function GET(
  request: NextRequest
) {

  const supabase = await createClient();


  const { searchParams } = new URL(request.url);

  const partida_id = searchParams.get("partida_id");



  if (!partida_id) {

    return NextResponse.json(
      {
        message: "Partida não informada"
      },
      {
        status: 400
      }
    );

  }



  const { data, error } = await supabase
    .from("presencas")
    .select(`
      id,
      jogador_id,
      jogadores (
        id,
        nome,
        overall
      )
    `)
    .eq(
      "partida_id",
      Number(partida_id)
    );



  if (error) {

    return NextResponse.json(
      {
        message: error.message
      },
      {
        status: 500
      }
    );

  }



  return NextResponse.json(data);

}








// POST - Confirmar presença
export async function POST(
  request: NextRequest
) {


  const supabase = await createClient();



  const body = await request.json();



  const {
    partida_id
  } = body;




  if (!partida_id) {

    return NextResponse.json(
      {
        message: "Partida não informada"
      },
      {
        status: 400
      }
    );

  }




  const authHeader = request.headers.get(
    "Authorization"
  );



  if (!authHeader) {

    return NextResponse.json(
      {
        message: "Token não enviado"
      },
      {
        status: 401
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





  if (userError || !user) {

    return NextResponse.json(
      {
        message:"Usuário não autenticado"
      },
      {
        status:401
      }
    );

  }





  const {
    data:jogador,

    error:jogadorError

  } = await supabase
    .from("jogadores")
    .select("id")
    .eq(
      "usuario_id",
      user.id
    )
    .single();





  if (jogadorError || !jogador) {

    return NextResponse.json(
      {
        message:"Jogador não encontrado"
      },
      {
        status:404
      }
    );

  }






  const {
    data,

    error

  } = await supabase
    .from("presencas")
    .insert({

      partida_id,

      jogador_id:jogador.id

    })
    .select()
    .single();





  if(error){

    return NextResponse.json(
      {
        message:error.message
      },
      {
        status:500
      }
    );

  }





  return NextResponse.json(data);


}









// DELETE - Cancelar presença
export async function DELETE(
  request:NextRequest
){

  const supabase = await createClient();



  const body = await request.json();



  const {
    partida_id
  } = body;




  if(!partida_id){

    return NextResponse.json(
      {
        message:"Partida não informada"
      },
      {
        status:400
      }
    );

  }





  const authHeader = request.headers.get(
    "Authorization"
  );



  if(!authHeader){

    return NextResponse.json(
      {
        message:"Token não enviado"
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
        message:"Usuário não autenticado"
      },
      {
        status:401
      }
    );

  }






  const {
    data:jogador,

    error:jogadorError

  } = await supabase
    .from("jogadores")
    .select("id")
    .eq(
      "usuario_id",
      user.id
    )
    .single();





  if(jogadorError || !jogador){

    return NextResponse.json(
      {
        message:"Jogador não encontrado"
      },
      {
        status:404
      }
    );

  }







  const {
    error

  } = await supabase

    .from("presencas")

    .delete()

    .eq(
      "partida_id",
      partida_id
    )

    .eq(
      "jogador_id",
      jogador.id
    );






  if(error){

    return NextResponse.json(
      {
        message:error.message
      },
      {
        status:500
      }
    );

  }





  return NextResponse.json(
    {
      message:"Presença cancelada"
    }
  );


}