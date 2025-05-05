import { IBarberRepository } from "../domain/barber.repository";
import { ICreateServiceReq } from "../domain/create-service";
import axiosInstance from "@/axios/instance";


const createService = async (data: ICreateServiceReq) => {
    try {
        const response = await axiosInstance.post("/services", data);
        return response.data;
    } catch (error) {
        console.error("Error during create service:", error);
        throw error;
    }
};


export const barberRepository: IBarberRepository = {
    createService,
};