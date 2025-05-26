import { IAuthRepository } from "../domain/auth.repository";
import { ILoginReq } from "../domain/login";
import { IRegisterReq } from "../domain/register";

import axiosInstance from "@/axios/instance";


const login = async (data: ILoginReq) => {
    try {
        const response = await axiosInstance.post("/auth/login", data);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }

}

const register = async (data: IRegisterReq) => {
    try {
        const response = await axiosInstance.post("/users/register", data);
        return response.data;
    } catch (error) {
        console.error("Error during register:", error);
        throw error;
    }
}

const verify = async () => {
    try {
        const response = await axiosInstance.get("/auth/verify");
        return response.data;
    } catch (error) {
        console.error("Error during verify:", error);
        throw error;
    }
}

export const authRepository: IAuthRepository = {
    login,
    register,
    verify,
}