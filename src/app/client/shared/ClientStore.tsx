import { create } from "zustand";
import { clientRepository } from "../../../core/client/infrastructure/client.repository";

import {
  getAllServicesUseCase,
  getAllBarbersUseCase,
  getAllClientAppointmentsUseCase,
  makeAppointmentUseCase,
  getServicesByBarberUseCase,
} from "@/core/client/application";
import { IGetAllServicesRes } from "@/core/client/domain/get-all-services";
import { IGetAllBarbersRes } from "@/core/client/domain/get-all-barbers";
import {
  IAppointmentRes,
  IMakeAppointmentReq,
  IService,
} from "@/core/client/domain/make-appointment";

type State = {
  services: IGetAllServicesRes[] | null;
  barbers: IGetAllBarbersRes[] | null;
  loading: boolean;
  error: string | null;
  appointments: IAppointmentRes[] | null;
  servicesByBarber: IService[] | null;
};

type Actions = {
  getAllServices: () => Promise<void>;
  getAllBarbers: () => Promise<void>;
  getAllClientAppointments: () => Promise<void>;
  makeAppointment: (data: IMakeAppointmentReq) => Promise<void>;
  getServicesByBarber: (barberId: string) => Promise<void>;
};
type Store = State & Actions;

export const useClientStore = create<Store>((set) => ({
  services: null,
  barbers: null,
  loading: false,
  error: null,
  appointments: null,
  servicesByBarber: null,

  getAllServices: async () => {
    set({ loading: true });
    try {
      const response = await getAllServicesUseCase(clientRepository)();
      set({ services: response, error: null });
    } catch (error) {
      set({ error: "Error fetching services" });
    } finally {
      set({ loading: false });
    }
  },
  getAllBarbers: async () => {
    set({ loading: true });
    try {
      const response = await getAllBarbersUseCase(clientRepository)();
      set({ barbers: response, error: null });
    } catch (error) {
      set({ error: "Error fetching barbers" });
    } finally {
      set({ loading: false });
    }
  },
  getAllClientAppointments: async () => {
    set({ loading: true });
    try {
      const response =
        await getAllClientAppointmentsUseCase(clientRepository)();
      set({ appointments: response, error: null });
    } catch (error) {
      set({ error: "Error fetching appointments" });
    }
  },
  makeAppointment: async (data) => {
    set({ loading: true });
    try {
      const response = await makeAppointmentUseCase(clientRepository)(data);
      console.log("Appointment made successfully:", response);
    } catch (error) {
      set({ error: "Error fetching appointments" });
    } finally {
      set({ loading: false });
    }
  },

  getServicesByBarber: async (barberId) => {
    set({ loading: true });
    try {
      const response = await getServicesByBarberUseCase(
        clientRepository,
        barberId
      )();
      set({ servicesByBarber: response, error: null });
    } catch (error) {
      set({ error: "Error fetching services by barber" });
    } finally {
      set({ loading: false });
    }
  },
}));
