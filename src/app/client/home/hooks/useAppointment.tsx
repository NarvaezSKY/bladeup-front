import { IMakeAppointmentReq } from "@/core/client/domain/make-appointment";
import { useClientStore } from "../../shared/ClientStore";
import { useAppointmentStore } from "@/app/shared/store/Appointment";
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
  const { updateAppointmentStatus } = useAppointmentStore();

  const makeClientAppointment = (data: IMakeAppointmentReq) => {
    try {
      makeAppointment(data).then(() => {
        getAllClientAppointments();
      });

      console.log(appointments);
      toast.success("Cita agendada con éxito");
    } catch (error) {
      if (error instanceof Error && (error as any).response?.data?.message) {
        toast.error((error as any).response.data.message);
      } else {
        toast.error(
          "Error al agendar la cita, por favor intente nuevamente más tarde."
        );
      }
    }
  };

  const handleUpdateAppointmentStatus = async (
    appointmentId: string,
    status: string
  ) => {
    try {
      await updateAppointmentStatus(appointmentId, status);
      toast.success("Estado de la cita actualizado con éxito");
      await getAllClientAppointments();
      console.log(appointments);
    } catch (error) {
      toast.error("Error updating appointment status");
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
    handleUpdateAppointmentStatus,
  };
};
