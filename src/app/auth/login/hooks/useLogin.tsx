import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthStore } from "@/app/shared/store/AuthStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export type LoginFormInputs = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<LoginFormInputs>();

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);

    try {
      await login(data);

      const { userId, loginError, role } = useAuthStore.getState();
      console.log("Login response:", { userId, loginError, role });

      if (userId) {
        toast.success("Inicio de sesión exitoso");
        clearErrors();
        if (role === "barber") {
          navigate("/home/barber", { replace: true });
        }
        if (role === "client") {
          navigate("/home/client", { replace: true });
        }
        

      } else {
        const message = loginError || "Nombre de usuario o contraseña incorrectos";
        toast.error(message);
        setError("email", { message });
        setError("password", { message });
      }
    } catch (error) {
      toast.error("Error inesperado");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
  };
};
