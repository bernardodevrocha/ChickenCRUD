"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const recipeSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  prepTime: z.coerce.number().min(0).optional(),
  cookTime: z.coerce.number().min(0).optional(),
  servings: z.coerce.number().min(1).optional(),
  instructions: z.string().optional(),
});

export async function createRecipe(_prev: unknown, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Não autorizado" };
  const parsed = recipeSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    prepTime: formData.get("prepTime") || undefined,
    cookTime: formData.get("cookTime") || undefined,
    servings: formData.get("servings") || undefined,
    instructions: formData.get("instructions") || undefined,
  });
  if (!parsed.success) {
    return { error: Object.values(parsed.error.flatten().fieldErrors).flat().join(" ") };
  }
  await prisma.recipe.create({
    data: { ...parsed.data, userId: session.user.id },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/recipes");
  return { ok: true };
}

export async function updateRecipe(id: string, _prev: unknown, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Não autorizado" };
  const parsed = recipeSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    prepTime: formData.get("prepTime") || undefined,
    cookTime: formData.get("cookTime") || undefined,
    servings: formData.get("servings") || undefined,
    instructions: formData.get("instructions") || undefined,
  });
  if (!parsed.success) {
    return { error: Object.values(parsed.error.flatten().fieldErrors).flat().join(" ") };
  }
  await prisma.recipe.updateMany({
    where: { id, userId: session.user.id },
    data: parsed.data,
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/recipes");
  revalidatePath(`/dashboard/recipes/${id}`);
  return { ok: true };
}

export async function deleteRecipe(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Não autorizado" };
  await prisma.recipe.deleteMany({
    where: { id, userId: session.user.id },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/recipes");
  return { ok: true };
}
