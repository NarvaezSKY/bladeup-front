import { useForm } from "react-hook-form";
import { useAuthStore } from "@/app/shared/store/AuthStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IRegisterReq } from '../../../../core/auth/domain/register/register.req';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const form = useForm<IRegisterReq>();
  const { register: registerUser } = useAuthStore();

  const onSubmit = async (data: IRegisterReq) => {
    const isSuccess = await registerUser({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
    });

    if (!isSuccess) {
      toast.error("Error en el registro. Por favor verifica los datos.");
      return;
    }

    toast.success("Registro exitoso. Por favor inicia sesión.");
    navigate("/login", { replace: true });
  };

  return {
    ...form,
    onSubmit,
  };
};
