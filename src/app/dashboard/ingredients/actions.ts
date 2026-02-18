"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ingredientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  quantity: z.string().optional(),
  unit: z.string().optional(),
});

export async function createIngredient(_prev: unknown, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Não autorizado" };
  const parsed = ingredientSchema.safeParse({
    name: formData.get("name"),
    quantity: formData.get("quantity") || undefined,
    unit: formData.get("unit") || undefined,
  });
  if (!parsed.success) {
    return { error: Object.values(parsed.error.flatten().fieldErrors).flat().join(" ") };
  }
  await prisma.ingredient.create({
    data: { ...parsed.data, userId: session.user.id },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/ingredients");
  return { ok: true };
}

export async function updateIngredient(id: string, _prev: unknown, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Não autorizado" };
  const parsed = ingredientSchema.safeParse({
    name: formData.get("name"),
    quantity: formData.get("quantity") || undefined,
    unit: formData.get("unit") || undefined,
  });
  if (!parsed.success) {
    return { error: Object.values(parsed.error.flatten().fieldErrors).flat().join(" ") };
  }
  await prisma.ingredient.updateMany({
    where: { id, userId: session.user.id },
    data: parsed.data,
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/ingredients");
  revalidatePath(`/dashboard/ingredients/${id}`);
  return { ok: true };
}

export async function deleteIngredient(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Não autorizado" };
  await prisma.ingredient.deleteMany({
    where: { id, userId: session.user.id },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/ingredients");
  return { ok: true };
}
