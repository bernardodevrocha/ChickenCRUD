import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import RecipeForm from "../../RecipeForm";

export default async function EditRecipePage({
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
          href={`/dashboard/recipes/${id}`}
          className="text-kitchen-600 hover:underline text-sm font-medium"
        >
          ← Voltar para receita
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Editar: {recipe.title}
      </h1>
      <RecipeForm
        recipe={{
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          servings: recipe.servings,
          instructions: recipe.instructions,
        }}
      />
    </div>
  );
}
