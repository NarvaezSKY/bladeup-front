import { Input } from "@heroui/input";
import { FaExclamationCircle } from "react-icons/fa";
import { Toaster } from "sonner";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useLoginForm } from "../hooks/useLogin";

export default function LoginForm() {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-[60vh] pb-8 md:py-10">
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center">
            <h2 className={title()}>Iniciar sesión</h2>
            <p className="mt-2 text-gray-600">
              Inicia sesión para acceder a tu cuenta.
            </p>
            <p className="text-gray-600">
              ¿No tienes una cuenta?{" "}
              <a
                className="text-primary hover:underline font-semibold"
                href="/register"
              >
                Regístrate aquí
              </a>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative my-2">
              <Input
                id="email"
                label="Nombre de usuario"
                type="input"
                {...register("username", {
                  required: "El nombre de usuario es requerido",
                })}
                fullWidth
                errorMessage={errors.username?.message}
                isInvalid={!!errors.username}
              />
              {errors.username && (
                <div className="absolute top-2 right-3 flex items-center text-red-500 pointer-events-none">
                  <FaExclamationCircle />
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                id="password"
                label="Contraseña"
                type="password"
                {...register("password", {
                  required: "La contraseña es requerida",
                })}
                fullWidth
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
              />
              {errors.password && (
                <div className="absolute top-2 right-3 flex items-center text-red-500 pointer-events-none">
                  <FaExclamationCircle />
                </div>
              )}
            </div>

            <div className="my-2">
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                type="submit"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </section>
      <Toaster richColors position="top-center" />
    </DefaultLayout>
  );
}
