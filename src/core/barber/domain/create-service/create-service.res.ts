export interface ICreateServiceRes{
    id: string;
    serviceName: string;
    customPrice: number;
    customDescription: string;
    isActive: boolean;
    category: string;
    createdAt: string;
    updatedAt: string;
    barberId: string;
}