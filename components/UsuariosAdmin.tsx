"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type Usuario = {
  usuario_id: string;
  nome: string;
  email: string;
  admin: boolean;
};

export default function UsuariosAdmin({ usuarios }: { usuarios: Usuario[] }) {
  const router = useRouter();

  const [editando, setEditando] = useState<Usuario | null>(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ehAdmin, setEhAdmin] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [aExcluir, setAExcluir] = useState<Usuario | null>(null);
  const [excluindo, setExcluindo] = useState(false);

  function abrir(u: Usuario) {
    setEditando(u);
    setEmail(u.email);
    setSenha("");
    setEhAdmin(u.admin);
  }

  function fechar() {
    setEditando(null);
  }

  async function salvar() {
    if (!editando || salvando) return;
    setSalvando(true);
    try {
      const res = await fetch("/api/admin/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: editando.usuario_id,
          email,
          senha: senha || undefined,
          admin: ehAdmin,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error ?? "Erro ao salvar o usuário.");
        return;
      }

      toast.success("Usuário atualizado.");
      fechar();
      router.refresh();
    } catch {
      toast.error("Erro de rede ao salvar o usuário.");
    } finally {
      setSalvando(false);
    }
  }

  async function excluir() {
    if (!aExcluir || excluindo) return;
    setExcluindo(true);
    try {
      const res = await fetch("/api/admin/usuarios", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id: aExcluir.usuario_id }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error ?? "Erro ao excluir o usuário.");
        return;
      }

      toast.success("Usuário excluído.");
      setAExcluir(null);
      router.refresh();
    } catch {
      toast.error("Erro de rede ao excluir o usuário.");
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <div className="space-y-3">
      {usuarios.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum usuário.</p>
      ) : (
        usuarios.map((u) => (
          <Card key={u.usuario_id} className="surface-card">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 truncate font-bold">
                    {u.nome}
                    {u.admin && (
                      <Badge className="gap-1 bg-accent text-accent-foreground">
                        <ShieldCheck size={12} />
                        Admin
                      </Badge>
                    )}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {u.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => abrir(u)}
                  className="h-9"
                >
                  <Pencil size={16} />
                  Editar
                </Button>

                {!u.admin && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setAExcluir(u)}
                    aria-label="Excluir usuário"
                    className="size-9"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}

      <AlertDialog
        open={editando !== null}
        onOpenChange={(aberto) => {
          if (!aberto) fechar();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Editar {editando?.nome}</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-4">
            <div className="field-stack">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field-stack">
              <Label htmlFor="edit-senha">Nova senha</Label>
              <Input
                id="edit-senha"
                type="password"
                placeholder="Deixe em branco para manter"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                className="size-4 accent-accent"
                checked={ehAdmin}
                onChange={(e) => setEhAdmin(e.target.checked)}
              />
              Tornar administrador
            </label>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={salvando}>Cancelar</AlertDialogCancel>
            <Button onClick={salvar} disabled={salvando}>
              {salvando && <Loader2 className="animate-spin" />}
              Salvar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={aExcluir !== null}
        onOpenChange={(aberto) => {
          if (!aberto && !excluindo) setAExcluir(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir usuário?</AlertDialogTitle>
            <AlertDialogDescription>
              Isso remove <strong>{aExcluir?.nome}</strong> ({aExcluir?.email}) e
              tudo vinculado a ele: jogador, presenças, estatísticas, avaliações,
              histórico e a conta de acesso. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={excluindo}>Cancelar</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={excluir}
              disabled={excluindo}
            >
              {excluindo && <Loader2 className="animate-spin" />}
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
