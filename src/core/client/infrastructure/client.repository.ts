import axiosInstance from "@/axios/instance";

import { IClientRepository } from "../domain/client.repository";
import { IGetAllBarbersRes } from "../domain/get-all-barbers";
import { IGetAllServicesRes } from "../domain/get-all-services";
import { IMakeAppointmentReq, IAppointmentRes } from "../domain/make-appointment";

const getAllBarbers = async (): Promise<IGetAllBarbersRes[]> => {
  try {
    const response = await axiosInstance.get("/barbers");
    return response.data;
  } catch (error) {
    console.error("Error during get all barbers:", error);
    throw error;
  }
};

const getAllServices = async (): Promise<IGetAllServicesRes[]> => {
  try {
    const response = await axiosInstance.get("/barber-services");
    return response.data;
  } catch (error) {
    console.error("Error during get all services:", error);
    throw error;
  }
};

const makeAppointment = async (data: IMakeAppointmentReq): Promise<IAppointmentRes> => {
  try {
    const response = await axiosInstance.post("/appointments", data);
    return response.data;
  } catch (error) {
    console.error("Error during make appointment:", error);
    throw error;
  }
};

const getAllClientAppointments = async (): Promise<IAppointmentRes[]> => {
  try {
    const response = await axiosInstance.get("/appointments/client=pending");
    return response.data;
  } catch (error) {
    console.error("Error during get all appointments:", error);
    throw error;
  }
};


export const clientRepository: IClientRepository = {
  getAllBarbers,
  getAllServices,
  makeAppointment,
  getAllClientAppointments
};