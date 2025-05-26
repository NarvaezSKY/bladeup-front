import axiosInstance from "@/axios/instance";
import { IAppointmentRepository } from "../domain/apponitment.repository";

const updateAppointmentStatus = async (id: string, status: string): Promise<void> => {
    try {
      const response = await axiosInstance.put(`/appointments/update/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error("Error during update appointment status:", error);
      throw error;
    }
  };

export const appointmentRepository:IAppointmentRepository = {
    updateAppointmentStatus
}