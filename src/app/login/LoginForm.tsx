"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="card w-full max-w-md">
      <h1 className="text-2xl font-bold text-kitchen-800 mb-6">Entrar</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
            {error}
          </p>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Entrar
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Não tem conta?{" "}
        <Link href="/register" className="text-kitchen-600 font-medium hover:underline">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
