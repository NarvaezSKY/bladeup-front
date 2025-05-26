import { useClientStore } from '../../shared/ClientStore';


export const useBarberServices = () => {
    const {  getServicesByBarber, servicesByBarber } = useClientStore();

    const fetchServicesByBarber = async (barberId: string) => {
        try {
            await getServicesByBarber(barberId);
        } catch (error) {
            console.error("Error fetching services by barber:", error);
        }
    };

    return {
        fetchServicesByBarber,
        servicesByBarber: servicesByBarber || [],
    };
 
}
