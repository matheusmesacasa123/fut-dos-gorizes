"use client";

import PlayerForm from "@/components/PlayerForm";

export default function NovoJogador() {


  async function salvarJogador(player: any) {

    const response = await fetch("/api/jogadores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });


    if (!response.ok) {

      alert("Erro ao cadastrar jogador!");

      return;

    }


    alert("Jogador cadastrado com sucesso!");


    window.location.href = "/jogadores";

  }



  return (

    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-8">

      <PlayerForm
        buttonText="💾 Salvar Jogador"
        onSubmit={salvarJogador}
      />

    </main>

  );

}