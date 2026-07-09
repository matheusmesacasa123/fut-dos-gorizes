import { createClient } from "@/lib/supabase-server";


export async function verificarAdmin() {


  const supabase = await createClient();



  const {
    data: {
      user
    }
  } = await supabase.auth.getUser();



  console.log("USUARIO LOGADO:", user);



  if(!user){

    console.log("SEM USUARIO");
    return false;

  }



  const { data: jogador, error } = await supabase

    .from("jogadores")

    .select("nome, usuario_id, admin")

    .eq(
      "usuario_id",
      user.id
    )

    .single();



  console.log("JOGADOR ENCONTRADO:", jogador);
  console.log("ERRO:", error);



  if(!jogador){

    return false;

  }



  return jogador.admin === true;


}