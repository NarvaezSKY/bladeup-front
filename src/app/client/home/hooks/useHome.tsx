import { useEffect, useState } from "react";
import { useClientStore } from "../../shared/ClientStore";
import { useAuthStore } from "@/app/shared/store/AuthStore";

export const useClientHome = () => {
  const { barbers, services, getAllBarbers, getAllServices, getAllClientAppointments  } = useClientStore();
  const { role } = useAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllBarbers();
      await getAllServices();
      await getAllClientAppointments();
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    username: role,
    services: services || [],
    barbers: barbers || [],
    loading,
  };
};
