import { create } from "zustand";

import { ILoginReq, ILoginRes } from "@/core/auth/domain/login";
import {
  loginUseCase,
  registerUseCase,
  verifyUseCase,
} from "@/core/auth/application";
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
  verify: () => Promise<void>;
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
      set({
        userId: response.id,
        token: response.token,
        loginError: null,
        role: response.role,
      });
    } catch (error) {
      if (error instanceof Error && (error as any).response?.data?.message) {
        set({ loginError: (error as any).response.data.message });
      } else {
        set({ loginError: "Something went wrong" });
      }
    }
  },

  register: async (data: IRegisterReq) => {
    try {
      console.log("Registering user with data:", data);
      const response = await registerUseCase(authRepository)(data);
      return response;
    } catch (error) {
      console.error("Error during register:", error);
    }
  },

  verify: async () => {
    try {
      const response = await verifyUseCase(authRepository)();
      if (response) {
        console.log("User verified:", response.user.userId);
        set({ userId: response.user.userId, role: response.user.role });
      }
    } catch (error) {
      set({ userId: null, role: null, token: null });
      sessionStorage.removeItem("token");
      console.error("Error during verify:", error);
    }
  },

  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    set({ userId: null, token: null, loginError: null });
  },
}));
