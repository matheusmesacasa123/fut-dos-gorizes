import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


interface Params {

  params: Promise<{
    id: string;
  }>;

}



// BUSCAR UMA PARTIDA
export async function GET(
  request: NextRequest,
  { params }: Params
) {

  const { id } = await params;


  const { data, error } = await supabase
    .from("partidas")
    .select("*")
    .eq("id", Number(id))
    .single();



  if (error) {

    return NextResponse.json(
      error,
      {
        status: 404,
      }
    );

  }


  return NextResponse.json(data);

}



// EDITAR PARTIDA
export async function PUT(
  request: NextRequest,
  { params }: Params
) {


  const { id } = await params;

  const body = await request.json();



  const { data, error } = await supabase
    .from("partidas")
    .update(body)
    .eq("id", Number(id))
    .select()
    .single();



  if (error) {

    return NextResponse.json(
      error,
      {
        status: 500,
      }
    );

  }



  return NextResponse.json(data);

}



// EXCLUIR PARTIDA
export async function DELETE(
  request: NextRequest,
  { params }: Params
) {


  const { id } = await params;



  const { error } = await supabase
    .from("partidas")
    .delete()
    .eq("id", Number(id));



  if (error) {

    return NextResponse.json(
      error,
      {
        status: 500,
      }
    );

  }



  return NextResponse.json({
    success: true,
  });

}