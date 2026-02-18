import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteRecipeButton from "./DeleteRecipeButton";

export default async function RecipesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const recipes = await prisma.recipe.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Receitas</h1>
        <Link href="/dashboard/recipes/new" className="btn-primary">
          Nova receita
        </Link>
      </div>
      {recipes.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">
          Nenhuma receita ainda.{" "}
          <Link href="/dashboard/recipes/new" className="text-kitchen-600 font-medium hover:underline">
            Criar primeira receita
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {recipes.map((r) => (
            <li
              key={r.id}
              className="card flex items-center justify-between gap-4"
            >
              <Link
                href={`/dashboard/recipes/${r.id}`}
                className="flex-1 min-w-0"
              >
                <h2 className="font-semibold text-gray-800 truncate">
                  {r.title}
                </h2>
                {r.description && (
                  <p className="text-sm text-gray-500 truncate mt-0.5">
                    {r.description}
                  </p>
                )}
                <div className="flex gap-3 mt-1 text-xs text-gray-400">
                  {r.prepTime != null && (
                    <span>Prep: {r.prepTime} min</span>
                  )}
                  {r.cookTime != null && (
                    <span>Cozimento: {r.cookTime} min</span>
                  )}
                  {r.servings != null && (
                    <span>{r.servings} porções</span>
                  )}
                </div>
              </Link>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/dashboard/recipes/${r.id}/edit`}
                  className="btn-secondary text-sm"
                >
                  Editar
                </Link>
                <DeleteRecipeButton recipeId={r.id} recipeTitle={r.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
