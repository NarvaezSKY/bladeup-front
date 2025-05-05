import { IAuthRepository } from "../domain/auth.repository";
import { ILoginReq } from "../domain/login";
import { IRegisterReq } from "../domain/register";

import axiosInstance from "@/axios/instance";


const login = async (data: ILoginReq) => {
    try {

        const response = await axiosInstance.post("/auth/login", data);
        
        console.log("Login response:", response.data);

        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }

}

const register = async (data: IRegisterReq) => {
    try {
        const response = await axiosInstance.post("/auth/register/user", data);

        return response.data;
    } catch (error) {
        console.error("Error during register:", error);
        throw error;
    }

}

export const authRepository: IAuthRepository = {
    login,
    register
}