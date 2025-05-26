import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { FaExclamationCircle } from "react-icons/fa";
import { useRegisterForm } from "../hooks/useRegister";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { Button } from "@heroui/react";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    watch,
  } = useRegisterForm();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const password = watch("password");

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmError("Las contraseñas no coinciden");
    } else {
      setConfirmError(null);
    }
  };

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
                className="text-secondary hover:underline font-semibold"
                href="/login"
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => {
              if (confirmPassword !== password) {
                setConfirmError("Las contraseñas no coinciden");
                return;
              }
              setConfirmError(null);
              onSubmit(data);
            })}
          >
            <div className="relative my-2">
              <Input
                id="name"
                label="Nombres"
                type="text"
                variant="bordered"
                {...register("name", {
                  required: "Tu nombre es requerido",
                })}
                fullWidth
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
              />
              {!!errors.name && (
                <div className="absolute top-2 right-3 flex items-center text-red-500 pointer-events-none">
                  <FaExclamationCircle />
                </div>
              )}
            </div>

            <div className="relative my-2">
              <Input
                id="lastName"
                label="Apellidos"
                type="text"
                variant="bordered"
                {...register("lastName", {
                  required: "Tus apellidos son requeridos",
                })}
                fullWidth
                errorMessage={errors.lastName?.message}
                isInvalid={!!errors.lastName}
              />
              {!!errors.lastName && (
                <div className="absolute top-2 right-3 flex items-center text-red-500 pointer-events-none">
                  <FaExclamationCircle />
                </div>
              )}
            </div>

            <div className="relative my-2">
              <Input
                id="email"
                label="Correo Electrónico"
                type="email"
                variant="bordered"
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

            <div className="relative my-2">
              <Input
                id="password"
                label="Contraseña"
                type="password"
                variant="bordered"
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
            <div className="relative my-2">
              <Input
                id="confirmPassword"
                label="Confirmar contraseña"
                type="password"
                variant="bordered"
                value={confirmPassword}
                onChange={handleConfirmChange}
                fullWidth
                errorMessage={confirmError ?? undefined}
                isInvalid={!!confirmError}
              />
              {!!confirmError && (
                <div className="absolute top-2 right-2 flex items-center pointer-events-none">
                  <FaExclamationCircle color="white"/>
                </div>
              )}
            </div>
            <div className="relative my-2">
              <Select
                className="max-w-full"
                items={roles}
                label="Rol"
                variant="bordered"
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

            <div>
              <Button
                type="submit"
                variant="bordered"
                color="secondary"
                size="lg"
                fullWidth
              >
                Registrarse
              </Button>
            </div>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
};
