"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

type User = { id?: string; email?: string | null; name?: string | null };

export default function DashboardNav({ user }: { user: User }) {
  return (
    <nav className="flex items-center gap-4">
      <Link
        href="/dashboard"
        className="text-gray-600 hover:text-kitchen-600 font-medium"
      >
        Início
      </Link>
      <Link
        href="/dashboard/recipes"
        className="text-gray-600 hover:text-kitchen-600 font-medium"
      >
        Receitas
      </Link>
      <Link
        href="/dashboard/ingredients"
        className="text-gray-600 hover:text-kitchen-600 font-medium"
      >
        Ingredientes
      </Link>
      <span className="text-gray-500 text-sm">
        {user.name || user.email}
      </span>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="btn-secondary text-sm"
      >
        Sair
      </button>
    </nav>
  );
}
