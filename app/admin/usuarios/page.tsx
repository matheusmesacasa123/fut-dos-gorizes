import { UserCog } from "lucide-react";

import { requireAdmin } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase-admin";
import UsuariosAdmin, { type Usuario } from "@/components/UsuariosAdmin";

export default async function UsuariosPage() {
  await requireAdmin();

  const admin = createAdminClient();

  const { data: jogadores } = await admin
    .from("jogadores")
    .select("nome, admin, usuario_id")
    .order("nome", { ascending: true });

  const { data: authList } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const emailPorId = new Map(
    (authList?.users ?? []).map((u) => [u.id, u.email ?? ""]),
  );

  const usuarios: Usuario[] = (jogadores ?? [])
    .filter((j) => j.usuario_id)
    .map((j) => ({
      usuario_id: j.usuario_id as string,
      nome: j.nome,
      admin: j.admin === true,
      email: emailPorId.get(j.usuario_id as string) ?? "",
    }));

  return (
    <main className="app-page">
      <div className="content-shell">
        <div className="mb-8 flex items-center gap-4">
          <span className="icon-tile">
            <UserCog size={20} />
          </span>

          <div>
            <p className="page-kicker">Admin</p>
            <h1 className="page-title">Usuários</h1>
          </div>
        </div>

        <UsuariosAdmin usuarios={usuarios} />
      </div>
    </main>
  );
}
