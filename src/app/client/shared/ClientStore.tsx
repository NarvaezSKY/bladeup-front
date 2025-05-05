import {create} from "zustand";
import { clientRepository } from '../../../core/client/infrastructure/client.repository';

import { getAllServicesUseCase, getAllBarbersUseCase } from "@/core/client/application";
import { IGetAllServicesRes } from "@/core/client/domain/get-all-services";
import { IGetAllBarbersRes } from "@/core/client/domain/get-all-barbers";


type State={
    services: IGetAllServicesRes[] | null;
    barbers: IGetAllBarbersRes[] | null;
    loading: boolean;
    error: string | null;
}

type Actions={
    getAllServices: () => Promise<IGetAllBarbersRes[] | void>;
    getAllBarbers: () => Promise<IGetAllBarbersRes[] | void>;
}
type Store=State & Actions;

export const useClientStore = create<Store>((set) => ({
    services: null,
    barbers: null,
    loading: false,
    error: null,
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
}));