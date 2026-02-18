import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const { id } = await params;

  const recipe = await prisma.recipe.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!recipe) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard/recipes"
          className="text-kitchen-600 hover:underline text-sm font-medium"
        >
          ← Voltar para receitas
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{recipe.title}</h1>
        <Link
          href={`/dashboard/recipes/${recipe.id}/edit`}
          className="btn-secondary"
        >
          Editar
        </Link>
      </div>
      <div className="card space-y-4">
        {recipe.description && (
          <p className="text-gray-600">{recipe.description}</p>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {recipe.prepTime != null && (
            <span>Tempo de preparo: {recipe.prepTime} min</span>
          )}
          {recipe.cookTime != null && (
            <span>Tempo de cozimento: {recipe.cookTime} min</span>
          )}
          {recipe.servings != null && (
            <span>Porções: {recipe.servings}</span>
          )}
        </div>
        {recipe.instructions && (
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">Modo de preparo</h2>
            <pre className="whitespace-pre-wrap font-sans text-gray-600">
              {recipe.instructions}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
