import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const [recipesCount, ingredientsCount] = await Promise.all([
    prisma.recipe.count({ where: { userId: session.user.id } }),
    prisma.ingredient.count({ where: { userId: session.user.id } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Olá, {session.user.name || "chef"}!
      </h1>
      <div className="grid sm:grid-cols-2 gap-6">
        <Link
          href="/dashboard/recipes"
          className="card block hover:shadow-md transition-shadow border-kitchen-100"
        >
          <h2 className="text-lg font-semibold text-kitchen-800 mb-1">
            Receitas
          </h2>
          <p className="text-3xl font-bold text-kitchen-600">{recipesCount}</p>
          <p className="text-sm text-gray-500 mt-2">
            Ver e gerenciar receitas
          </p>
        </Link>
        <Link
          href="/dashboard/ingredients"
          className="card block hover:shadow-md transition-shadow border-kitchen-100"
        >
          <h2 className="text-lg font-semibold text-kitchen-800 mb-1">
            Ingredientes
          </h2>
          <p className="text-3xl font-bold text-kitchen-600">{ingredientsCount}</p>
          <p className="text-sm text-gray-500 mt-2">
            Lista de ingredientes / estoque
          </p>
        </Link>
      </div>
    </div>
  );
}
