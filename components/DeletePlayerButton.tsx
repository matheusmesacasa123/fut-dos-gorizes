"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { deletePlayer } from "@/services/playerService";

export default function DeletePlayerButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmacao = confirm(
      "Tem certeza que deseja excluir este jogador?"
    );

    if (!confirmacao) return;

    await deletePlayer(id.toString());

    router.push("/jogadores");
    router.refresh();
  }

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
    >
      🗑️ Excluir
    </Button>
  );
}