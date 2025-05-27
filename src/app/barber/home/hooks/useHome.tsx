import { useEffect, useState } from "react";
import { useBarberStore } from "../../store/BarberStore";
import { toast } from "sonner";
import { useAppointmentStore } from "@/app/shared/store/Appointment";

export const useBarberHomeData = () => {
  const {
    services,
    createService,
    getBarberAppointments,
    getMyServices,
    appointments,
    error,
    deleteService,
  } = useBarberStore();

  const { updateAppointmentStatus } = useAppointmentStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getBarberAppointments();
      await getMyServices();

      setLoading(false);
    };
    fetchData();
  }, []);

  const createNewService = async (data: FormData) => {
    setLoading(true);
    await createService(data);
    setLoading(false);
  };

  const uploadService = async (data: FormData) => {
    setLoading(true);
    try {
      await createService(data);
      toast.success("Servicio creado exitosamente!");
      await getMyServices();
    } catch (error) {
      console.error("Error uploading service:", error);
    }
    setLoading(false);
  };

  const handleDeleteService = async (id: string) => {
    setLoading(true);
    try {
      await deleteService(id);
      toast.success("Servicio eliminado exitosamente!");
      await getMyServices();
    } catch (error) {
      toast.error("Error deleting service");
    }
    setLoading(false);
  };

  const handleUpdateAppointmentStatus = async (id: string, status: string) => {
    try {
      await updateAppointmentStatus(id, status);
      toast.success("Estado de cita actualizado exitosamente!");
      await getBarberAppointments();
    } catch (error) {
      toast.error("Error updating appointment status");
    }
  };

  return {
    username: "Barber",
    services: services || [],
    loading,
    createNewService,
    uploadService,
    error,
    handleDeleteService,
    handleUpdateAppointmentStatus,
    appointments: appointments || [],
  };
};
