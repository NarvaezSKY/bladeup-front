import { IMakeAppointmentReq } from "@/core/client/domain/make-appointment";
import { useClientStore } from "../../shared/ClientStore";
import { toast } from "sonner";

export const useAppointment = () => {
  const {
    services,
    barbers,
    loading,
    error,
    appointments,
    getAllServices,
    getAllBarbers,
    getAllClientAppointments,
    makeAppointment,
  } = useClientStore();

  const makeClientAppointment = (data: IMakeAppointmentReq) => {
    try {
      makeAppointment(data);
      toast.success("Appointment made successfully!");
    } catch (error) {
      if (error instanceof Error && (error as any).response?.data?.message) {
        toast.error((error as any).response.data.message);
      } else {
        toast.error("Something went wrong while making the appointment");
      }
    }
  };


  return {
    services,
    barbers,
    loading,
    error,
    appointments,
    getAllServices,
    getAllBarbers,
    getAllClientAppointments,
    makeClientAppointment,
  };
};
