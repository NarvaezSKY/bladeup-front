import { useEffect, useState } from "react";
import { useClientStore } from "../../shared/ClientStore";

export const useClientHomeData = () => {
  const { barbers, services, getAllBarbers, getAllServices } = useClientStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllBarbers();
      await getAllServices();
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    username: "Usuario",
    services: services || [],
    barbers: barbers || [],
    loading,
  };
};
