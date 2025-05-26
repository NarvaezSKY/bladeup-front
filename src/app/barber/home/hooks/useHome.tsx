import { useEffect, useState } from "react";
import { useBarberStore } from "../../store/BarberStore";
import { toast } from "sonner";

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
      toast.success("Service uploaded successfully!");
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
      toast.success("Service deleted successfully!");
      await getMyServices();
    } catch (error) {
      toast.error("Error deleting service");
    }
    setLoading(false);
  };
  return {
    username: "Barber",
    services: services || [],
    loading,
    createNewService,
    uploadService,
    error,
    handleDeleteService,
    appointments: appointments || [],
  };
};
