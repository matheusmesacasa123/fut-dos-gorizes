import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";


// ===============================
// BUSCAR JOGADOR POR ID
// ===============================

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const jogadorId = Number(id);

    if (isNaN(jogadorId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("jogadores")
      .select("*")
      .eq("id", jogadorId)
      .single();

    if (error) {
      console.error("❌ Erro ao buscar jogador:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(data);

  } catch (err: any) {
    console.error("🔥 Erro GET:", err);

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}



// ===============================
// EDITAR JOGADOR
// ===============================

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const jogadorId = Number(id);

    if (isNaN(jogadorId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await request.json();

    console.log("🟡 Atualizando jogador:", jogadorId);
    console.log("Dados:", body);

    const { data, error } = await supabase
      .from("jogadores")
      .update(body)
      .eq("id", jogadorId)
      .select()
      .single();

    if (error) {
      console.error("❌ Erro Supabase:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(data);

  } catch (err: any) {
    console.error("🔥 Erro PUT:", err);

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}



// ===============================
// EXCLUIR JOGADOR
// ===============================

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const jogadorId = Number(id);

    if (isNaN(jogadorId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    console.log("🟡 Deletando jogador:", jogadorId);

    const { data, error } = await supabase
      .from("jogadores")
      .delete()
      .eq("id", jogadorId)
      .select();

    if (error) {
      console.error("❌ Erro Supabase:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Jogador deletado com sucesso!",
      jogador: data,
    });

  } catch (err: any) {
    console.error("🔥 Erro DELETE:", err);

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}