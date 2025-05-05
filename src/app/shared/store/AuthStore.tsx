import { create } from "zustand";

import { ILoginReq, ILoginRes } from "@/core/auth/domain/login";
import { loginUseCase } from "@/core/auth/application/login.use-case";
import { authRepository } from "@/core/auth/infraestructure/auth.repository";
import { IRegisterReq } from "@/core/auth/domain/register";

type State = {
  userId: string | null;
  loginError: string | null;
  token: string | null;
  role: string | null;
};

type Actions = {
  login: (data: ILoginReq) => Promise<ILoginRes | void>;
  register: (data: IRegisterReq) => Promise<any>;
  logout: () => void;
};

type Store = State & Actions;

export const useAuthStore = create<Store>((set) => ({
  userId: null,
  loginError: null,
  token: sessionStorage.getItem("token") || null,
  role: sessionStorage.getItem("role") || null,
  login: async (data: ILoginReq) => {
    try {
      const response = await loginUseCase(authRepository)(data);
      sessionStorage.setItem("token", response.token);
      set({ userId: response.userId, token: response.token, loginError: null, role: response.role });
    } catch (error) {
      if (error instanceof Error && (error as any).response?.data?.message) {
        set({ loginError: (error as any).response.data.message });
      } else {
        set({ loginError: "An unknown error occurred" });
      }
    }
  },
  
  register: async (data: IRegisterReq) => {
    try {
      const response = await authRepository.register(data);

      return response;
    } catch (error) {
      console.error("Error during register:", error);
    }
  },

  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    set({ userId: null, token: null, loginError: null });
  },
}));
