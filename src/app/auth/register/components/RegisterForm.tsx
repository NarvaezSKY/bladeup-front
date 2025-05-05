import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { FaExclamationCircle } from "react-icons/fa";
import { useRegisterForm } from "../hooks/useRegister";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
  } = useRegisterForm();

  const roles = [
    { value: "client", label: "Cliente", key: "client" },
    { value: "barber", label: "Barbero", key: "barber" },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-[60vh] pb-8 md:py-10">
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center">
            <div className="mb-2">
              <h2 className={title()}>Registrarse</h2>
            </div>
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <a
                className="text-primary hover:underline font-semibold"
                href="/login"
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre de Usuario */}
            <div className="relative my-2">
              <Input
                id="username"
                label="Nombre de Usuario"
                type="text"
                {...register("username", {
                  required: "El nombre de usuario es requerido",
                })}
                fullWidth
                errorMessage={errors.username?.message}
                isInvalid={!!errors.username}
              />
              {!!errors.username && (
                <div className="absolute top-2 right-3 flex items-center text-red-500 pointer-events-none">
                  <FaExclamationCircle />
                </div>
              )}
            </div>

            {/* Correo Electrónico */}
            <div className="relative my-2">
              <Input
                id="email"
                label="Correo Electrónico"
                type="email"
                {...register("email", {
                  required: "El correo es requerido",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El correo no tiene un formato válido",
                  },
                })}
                fullWidth
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
              />
              {!!errors.email && (
                <div className="absolute top-2 right-3 flex items-center text-red-500 pointer-events-none">
                  <FaExclamationCircle />
                </div>
              )}
            </div>

            {/* Contraseña */}
            <div className="relative my-2">
              <Input
                id="password"
                label="Contraseña"
                type="password"
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
                fullWidth
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
              />
              {!!errors.password && (
                <div className="absolute top-2 right-3 flex items-center text-red-500 pointer-events-none">
                  <FaExclamationCircle />
                </div>
              )}
            </div>

            {/* Rol */}
            <div className="relative my-2">
              <Select
                className="max-w-full"
                items={roles}
                label="Rol"
                placeholder="Selecciona un rol"
                {...register("role", {
                  required: "El rol es requerido",
                })}
              >
                {(rol) => <SelectItem key={rol.key}>{rol.label}</SelectItem>}
              </Select>
              {!!errors.role && (
                <div className="absolute top-2 right-3 flex items-center text-red-500 pointer-events-none">
                  <FaExclamationCircle />
                </div>
              )}
            </div>

            {/* Botón */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
};
