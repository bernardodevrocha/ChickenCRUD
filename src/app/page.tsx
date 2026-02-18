import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-kitchen-50 to-kitchen-100">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-kitchen-800 mb-2">
          Gerenciador de Cozinha
        </h1>
        <p className="text-kitchen-700 mb-8">
          Organize suas receitas e ingredientes em um só lugar.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/login" className="btn-primary">
            Entrar
          </Link>
          <Link href="/register" className="btn-secondary">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
