"use client";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [Errores, setErrores] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const FormDAta = new FormData(e.currentTarget);
      const logueo = await signIn("credentials", {
        email: FormDAta.get("email"),
        password: FormDAta.get("password"),
        redirect: false,
      });
      if (logueo?.error) return setErrores(logueo.error as string);
      if (logueo?.ok) return router.push("/dashboard");
    };
  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-950 px-8 py-10 w-3/12"
    >
      {Errores && (
        <div className="bg-red-700 text-white p-2 mb-2">{Errores}</div>
      )}
      <h1 className="text-4xl font-bold mb-7">Login</h1>
      <label className="text-slate-300">Email:</label>
      <input
        type="text"
        placeholder="jonhcena@gmail.com"
        className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        name="email"
      />
      <label className="text-slate-300">Contraseña:</label>
      <input
        type="password"
        placeholder="jonh cena"
        className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        name="password"
      />
      <button className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
        Ingresar
      </button>
    </form>
  </div>
  )
}

export default Login;