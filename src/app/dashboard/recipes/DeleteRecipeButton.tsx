"use client";

import { useTransition } from "react";
import { deleteRecipe } from "./actions";
import { useRouter } from "next/navigation";

export default function DeleteRecipeButton({
  recipeId,
  recipeTitle,
}: {
  recipeId: string;
  recipeTitle: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Excluir a receita "${recipeTitle}"?`)) return;
    startTransition(async () => {
      await deleteRecipe(recipeId);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="btn-danger text-sm"
    >
      {isPending ? "Excluindo..." : "Excluir"}
    </button>
  );
}
