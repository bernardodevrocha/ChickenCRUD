import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function IngredientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const { id } = await params;

  const ingredient = await prisma.ingredient.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!ingredient) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard/ingredients"
          className="text-kitchen-600 hover:underline text-sm font-medium"
        >
          ← Voltar para ingredientes
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{ingredient.name}</h1>
        <Link
          href={`/dashboard/ingredients/${ingredient.id}/edit`}
          className="btn-secondary"
        >
          Editar
        </Link>
      </div>
      <div className="card">
        <dl className="space-y-2">
          {(ingredient.quantity != null || ingredient.unit) && (
            <>
              {ingredient.quantity != null && (
                <div>
                  <dt className="text-sm text-gray-500">Quantidade</dt>
                  <dd className="font-medium">{ingredient.quantity}</dd>
                </div>
              )}
              {ingredient.unit != null && (
                <div>
                  <dt className="text-sm text-gray-500">Unidade</dt>
                  <dd className="font-medium">{ingredient.unit}</dd>
                </div>
              )}
            </>
          )}
        </dl>
      </div>
    </div>
  );
}
