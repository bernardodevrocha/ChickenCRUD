"use client";

import { useTransition } from "react";
import { deleteIngredient } from "./actions";
import { useRouter } from "next/navigation";

export default function DeleteIngredientButton({
  ingredientId,
  ingredientName,
}: {
  ingredientId: string;
  ingredientName: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Excluir o ingrediente "${ingredientName}"?`)) return;
    startTransition(async () => {
      await deleteIngredient(ingredientId);
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
