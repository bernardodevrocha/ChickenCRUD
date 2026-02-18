import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteIngredientButton from "./DeleteIngredientButton";

export default async function IngredientsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const ingredients = await prisma.ingredient.findMany({
    where: { userId: session.user.id },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ingredientes</h1>
        <Link href="/dashboard/ingredients/new" className="btn-primary">
          Novo ingrediente
        </Link>
      </div>
      {ingredients.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">
          Nenhum ingrediente ainda.{" "}
          <Link href="/dashboard/ingredients/new" className="text-kitchen-600 font-medium hover:underline">
            Adicionar primeiro ingrediente
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {ingredients.map((i) => (
            <li
              key={i.id}
              className="card flex items-center justify-between gap-4"
            >
              <Link
                href={`/dashboard/ingredients/${i.id}`}
                className="flex-1 min-w-0"
              >
                <span className="font-medium text-gray-800">{i.name}</span>
                {(i.quantity != null || i.unit) && (
                  <span className="text-gray-500 ml-2">
                    {[i.quantity, i.unit].filter(Boolean).join(" ")}
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/dashboard/ingredients/${i.id}/edit`}
                  className="btn-secondary text-sm"
                >
                  Editar
                </Link>
                <DeleteIngredientButton ingredientId={i.id} ingredientName={i.name} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
