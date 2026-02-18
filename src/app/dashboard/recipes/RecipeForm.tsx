"use client";

import { useFormState } from "react-dom";
import { createRecipe, updateRecipe } from "./actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  recipe?: {
    id: string;
    title: string;
    description: string | null;
    prepTime: number | null;
    cookTime: number | null;
    servings: number | null;
    instructions: string | null;
  };
};

export default function RecipeForm({ recipe }: Props) {
  const router = useRouter();
  const action = recipe
    ? (prev: unknown, formData: FormData) => updateRecipe(recipe.id, prev, formData)
    : createRecipe;
  const [state, formAction] = useFormState(action, null);

  const error = state && typeof state === "object" && "error" in state ? (state as { error?: string }).error : null;
  const ok = state && typeof state === "object" && "ok" in state && (state as { ok?: boolean }).ok;

  useEffect(() => {
    if (ok) {
      if (recipe) router.push(`/dashboard/recipes/${recipe.id}`);
      else router.push("/dashboard/recipes");
      router.refresh();
    }
  }, [ok, recipe, router]);

  return (
    <form action={formAction} className="card space-y-4 max-w-xl">
      {error && typeof error === "string" && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">{error}</p>
      )}
      {ok && (
        <p className="text-sm text-green-700 bg-green-50 p-2 rounded-lg">
          Salvo com sucesso!
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título *
        </label>
        <input
          type="text"
          name="title"
          defaultValue={recipe?.title}
          className="input"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <input
          type="text"
          name="description"
          defaultValue={recipe?.description ?? ""}
          className="input"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tempo de preparo (min)
          </label>
          <input
            type="number"
            name="prepTime"
            min={0}
            defaultValue={recipe?.prepTime ?? ""}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tempo de cozimento (min)
          </label>
          <input
            type="number"
            name="cookTime"
            min={0}
            defaultValue={recipe?.cookTime ?? ""}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Porções
          </label>
          <input
            type="number"
            name="servings"
            min={1}
            defaultValue={recipe?.servings ?? ""}
            className="input"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Modo de preparo
        </label>
        <textarea
          name="instructions"
          rows={6}
          defaultValue={recipe?.instructions ?? ""}
          className="input"
        />
      </div>
      <button type="submit" className="btn-primary">
        {recipe ? "Salvar alterações" : "Criar receita"}
      </button>
    </form>
  );
}
