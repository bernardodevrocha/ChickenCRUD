"use client";

import { useFormState } from "react-dom";
import { createIngredient, updateIngredient } from "./actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  ingredient?: {
    id: string;
    name: string;
    quantity: string | null;
    unit: string | null;
  };
};

export default function IngredientForm({ ingredient }: Props) {
  const router = useRouter();
  const action = ingredient
    ? (prev: unknown, formData: FormData) =>
        updateIngredient(ingredient.id, prev, formData)
    : createIngredient;
  const [state, formAction] = useFormState(action, null);

  const error =
    state && typeof state === "object" && "error" in state
      ? (state as { error?: string }).error
      : null;
  const ok =
    state &&
    typeof state === "object" &&
    "ok" in state &&
    (state as { ok?: boolean }).ok;

  useEffect(() => {
    if (ok) {
      if (ingredient) router.push(`/dashboard/ingredients/${ingredient.id}`);
      else router.push("/dashboard/ingredients");
      router.refresh();
    }
  }, [ok, ingredient, router]);

  return (
    <form action={formAction} className="card space-y-4 max-w-md">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">{error}</p>
      )}
      {ok && (
        <p className="text-sm text-green-700 bg-green-50 p-2 rounded-lg">
          Salvo com sucesso!
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome *
        </label>
        <input
          type="text"
          name="name"
          defaultValue={ingredient?.name}
          className="input"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade
          </label>
          <input
            type="text"
            name="quantity"
            defaultValue={ingredient?.quantity ?? ""}
            className="input"
            placeholder="ex: 2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unidade
          </label>
          <input
            type="text"
            name="unit"
            defaultValue={ingredient?.unit ?? ""}
            className="input"
            placeholder="ex: xícaras"
          />
        </div>
      </div>
      <button type="submit" className="btn-primary">
        {ingredient ? "Salvar alterações" : "Criar ingrediente"}
      </button>
    </form>
  );
}
