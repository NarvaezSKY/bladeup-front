import { create } from "zustand";
import { appointmentRepository } from "../../../core/appointment/infrastructure/appointment.repository";
import { updateAppointmentStatusUseCase } from "../../../core/appointment/application";

type State = {
  updateError: string | null;
};

type Actions = {
  updateAppointmentStatus: (id: string, status: string) => Promise<void>;
};

type Store = State & Actions;

export const useAppointmentStore = create<Store>((set) => ({
  updateError: null,

  updateAppointmentStatus: async (id: string, status: string) => {
    try {
      await updateAppointmentStatusUseCase(appointmentRepository)(id, status);
      set({ updateError: null });
    } catch (error) {
      if (error instanceof Error && (error as any).response?.data?.message) {
        set({ updateError: (error as any).response.data.message });
      } else {
        set({ updateError: "Something went wrong" });
      }
    }
  },
}));
