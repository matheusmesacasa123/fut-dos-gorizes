import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="max-w-6xl mx-auto flex gap-6 items-center">

        <Link 
          href="/dashboard"
          className="font-bold text-xl"
        >
          ⚽ Fut dos Gorizes
        </Link>

        <Link href="/jogadores">
          👥 Jogadores
        </Link>

        <Link href="/partidas">
          📅 Partidas
        </Link>

        <Link href="/ranking">
          🏆 Ranking
        </Link>

      </div>
    </nav>
  )
}