import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    "use server";
    
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // We'll let the API set the cookie and handle it
      if (data.token) {
        redirect("/admin/dashboard");
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      redirect("/login?error=invalid");
    }
  }

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-center text-gray-900">
            TaskGo Admin
          </h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Digite suas credenciais para acessar o painel
          </p>
        </CardHeader>
        <CardContent>
          <form action={handleLogin} className="space-y-4">
            <div>
              <Input
                name="username"
                type="text"
                placeholder="Usuário"
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="Senha"
                required
                className="w-full"
              />
            </div>
            {error === "invalid" && (
              <p className="text-sm text-red-500 text-center">
                Credenciais inválidas
              </p>
            )}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}