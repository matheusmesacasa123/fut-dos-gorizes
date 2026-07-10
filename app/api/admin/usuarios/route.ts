import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

// Edita um usuário existente (somente admin).
// Body: { usuario_id: string, email?: string, senha?: string, admin?: boolean }
export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { data: jogadorLogado } = await supabase
    .from("jogadores")
    .select("admin")
    .eq("usuario_id", user.id)
    .single();

  if (!jogadorLogado?.admin) {
    return NextResponse.json(
      { error: "Apenas administradores." },
      { status: 403 },
    );
  }

  const { usuario_id, email, senha, admin: tornarAdmin } = await request.json();

  if (!usuario_id) {
    return NextResponse.json(
      { error: "usuario_id é obrigatório." },
      { status: 400 },
    );
  }

  if (typeof senha === "string" && senha.length > 0 && senha.length < 6) {
    return NextResponse.json(
      { error: "A senha deve ter ao menos 6 caracteres." },
      { status: 400 },
    );
  }

  const admin = createAdminClient();

  // Atualiza email/senha no auth.
  const patch: { email?: string; password?: string } = {};
  if (typeof email === "string" && email.length > 0) patch.email = email;
  if (typeof senha === "string" && senha.length > 0) patch.password = senha;

  if (patch.email || patch.password) {
    const { error } = await admin.auth.admin.updateUserById(usuario_id, patch);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  // Atualiza flag de admin na tabela jogadores.
  if (typeof tornarAdmin === "boolean") {
    const { error } = await admin
      .from("jogadores")
      .update({ admin: tornarAdmin })
      .eq("usuario_id", usuario_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

// Exclui um usuário e tudo vinculado a ele (somente admin).
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { data: jogadorLogado } = await supabase
    .from("jogadores")
    .select("admin")
    .eq("usuario_id", user.id)
    .single();

  if (!jogadorLogado?.admin) {
    return NextResponse.json(
      { error: "Apenas administradores." },
      { status: 403 },
    );
  }

  const { usuario_id } = await request.json();

  if (!usuario_id) {
    return NextResponse.json(
      { error: "usuario_id é obrigatório." },
      { status: 400 },
    );
  }

  const admin = createAdminClient();

  // Descobre o jogador vinculado (para apagar as dependências por jogador_id).
  const { data: jogador } = await admin
    .from("jogadores")
    .select("id, admin")
    .eq("usuario_id", usuario_id)
    .maybeSingle();

  // Admins não podem ser excluídos.
  if (jogador?.admin) {
    return NextResponse.json(
      { error: "Administradores não podem ser excluídos." },
      { status: 400 },
    );
  }

  if (jogador) {
    const jid = jogador.id;

    // Tudo que referencia o jogador.
    await admin.from("presencas").delete().eq("jogador_id", jid);
    await admin.from("estatisticas_jogadores").delete().eq("jogador_id", jid);
    await admin.from("estatisticas_partidas").delete().eq("jogador_id", jid);
    await admin.from("historico_overall").delete().eq("jogador_id", jid);
    await admin
      .from("avaliacoes_partidas")
      .delete()
      .or(`jogador_id.eq.${jid},avaliador_id.eq.${jid}`);

    const { error: delJog } = await admin
      .from("jogadores")
      .delete()
      .eq("id", jid);
    if (delJog) {
      return NextResponse.json({ error: delJog.message }, { status: 500 });
    }
  }

  // Solicitação de cadastro (também cai por cascade ao remover o auth user).
  await admin.from("solicitacoes_cadastro").delete().eq("usuario_id", usuario_id);

  // Remove o usuário do auth.
  const { error: delUser } = await admin.auth.admin.deleteUser(usuario_id);
  if (delUser) {
    return NextResponse.json({ error: delUser.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
