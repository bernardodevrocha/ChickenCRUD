import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import IngredientForm from "../../IngredientForm";

export default async function EditIngredientPage({
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
          href={`/dashboard/ingredients/${id}`}
          className="text-kitchen-600 hover:underline text-sm font-medium"
        >
          ← Voltar para ingrediente
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Editar: {ingredient.name}
      </h1>
      <IngredientForm
        ingredient={{
          id: ingredient.id,
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        }}
      />
    </div>
  );
}
