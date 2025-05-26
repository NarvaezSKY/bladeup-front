import { create } from "zustand";

import { barberRepository } from "@/core/barber/infrastructure/barber.repository";
import {
  createServiceUseCase,
  deleteServiceUseCase,
  getBarberAppointmentsUseCase,
  getMyServicesUseCase,
} from "../../../core/barber/application";
import { IAppointmentRes } from "@/core/client/domain/make-appointment";
import { IGetAllServicesRes } from "@/core/client/domain/get-all-services";

type State = {
  services: IGetAllServicesRes[];
  error: string | null;
  loading: boolean;
  appointments: IAppointmentRes[];
};

type Actions = {
  createService: (data: FormData) => Promise<void>;
  getBarberAppointments: () => Promise<IAppointmentRes[]>;
  getMyServices: () => Promise<IGetAllServicesRes[]>;
  deleteService: (id: string) => Promise<void>;
};

type Store = State & Actions;

export const useBarberStore = create<Store>((set) => ({
  services: [],
  error: null,
  loading: false,
  appointments: [],
  createService: async (data: FormData) => {
    set({ loading: true });
    try {
      await createServiceUseCase(barberRepository)(data);
    } catch (error) {
      set({ error: "Error creating service" });
    } finally {
      set({ loading: false });
    }
  },

  getBarberAppointments: async () => {
    set({ loading: true });
    try {
      const response = await getBarberAppointmentsUseCase(barberRepository)();
      set({ appointments: response, error: null });
      return response;
    } catch (error) {
      set({ error: "Error fetching barber appointments" });
      return [];
    } finally {
      set({ loading: false });
    }
  },

  getMyServices: async () => {
    set({ loading: true });
    try {
      const response = await getMyServicesUseCase(barberRepository);
      set({ services: response, error: null });
      return response;
    } catch (error) {
      set({ error: "Error fetching my services" });
      return [];
    } finally {
      set({ loading: false });
    }
  },

  deleteService: async (id: string) => {
    set({ loading: true });
    try {
      await deleteServiceUseCase(barberRepository, id);
      set((state) => ({
        services: state.services.filter((service) => service._id !== id),
      }));
    } catch (error) {
      set({ error: "Error deleting service" });
    } finally {
      set({ loading: false });
    }
  },
}));
