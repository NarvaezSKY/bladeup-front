import axiosInstance from "@/axios/instance";

import { IClientRepository } from "../domain/client.repository";
import { IGetAllBarbersRes } from "../domain/get-all-barbers";
import { IGetAllServicesRes } from "../domain/get-all-services";

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
    const response = await axiosInstance.get("/barberServices");
    return response.data;
  } catch (error) {
    console.error("Error during get all services:", error);
    throw error;
  }
};


export const clientRepository: IClientRepository = {
  getAllBarbers,
  getAllServices,
};