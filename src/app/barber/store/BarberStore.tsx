import { create } from "zustand";

import { ICreateServiceReq } from "@/core/barber/domain/create-service";

import { barberRepository } from "@/core/barber/infrastructure/barber.repository";
import { createServiceUseCase } from "../../../core/barber/application/create-service.use-case";

type State = {
  services: ICreateServiceReq[];
  error: string | null;
  loading: boolean;
};

type Actions = {
  createService: (data: ICreateServiceReq) => Promise<void>;
};

type Store = State & Actions;

export const useBarberStore = create<Store>((set) => ({
  services: [],
  error: null,
  loading: false,
  createService: async (data: ICreateServiceReq) => {
    set({ loading: true });
    try {
      const response = await createServiceUseCase(barberRepository)(data);
      set((state) => ({
        services: [...state.services, response],
        error: null,
      }));
    } catch (error) {
      set({ error: "Error creating service" });
    } finally {
      set({ loading: false });
    }
  },
}));
