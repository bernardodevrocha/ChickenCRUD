import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-kitchen-50 to-kitchen-100">
      <Suspense fallback={<div className="card w-full max-w-md animate-pulse h-80 rounded-xl" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
