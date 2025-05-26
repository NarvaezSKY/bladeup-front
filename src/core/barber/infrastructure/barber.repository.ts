import { IBarberRepository } from "../domain/barber.repository";
import axiosInstance from "@/axios/instance";


const createService = async (data: FormData) => {
  try {
    const response = await axiosInstance.post("/barber-services", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during create service:", error);
    throw error;
  }
};


const getMyServices = async () => {
  try {
    const response = await axiosInstance.get("/barber-services/me");
    return response.data;
  } catch (error) {
    console.error("Error during get my services:", error);
    throw error;
  }
};

const getServicesByBarber = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/barber-services/barber/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error during get services by barber:", error);
    throw error;
  }
};

const getBarberAppointments = async () => {
  try {
    const response = await axiosInstance.get("/appointments/barber=pending");
    return response.data;
  } catch (error) {
    console.error("Error during get barber appointments:", error);
    throw error;
  }
};

const deleteService = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/barber-services/delete/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error during delete service:", error);
    throw error;
  }
};


export const barberRepository: IBarberRepository = {
  createService,
  getMyServices,
  getServicesByBarber,
  getBarberAppointments,
  deleteService
};