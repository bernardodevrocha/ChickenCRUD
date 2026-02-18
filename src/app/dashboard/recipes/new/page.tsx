import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import RecipeForm from "../RecipeForm";

export default async function NewRecipePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Nova receita</h1>
      <RecipeForm />
    </div>
  );
}
