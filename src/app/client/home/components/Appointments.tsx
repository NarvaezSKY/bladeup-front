import { Divider } from "@heroui/react";
import { useClientStore } from "../../shared/ClientStore";
import { AppointmentCard } from "../../shared/components/AppointmentCard";

export const Appointments = () => {
  const { appointments } = useClientStore();

  return (
    <div className="my-2 bg-default-100 border-3 border-secondary-400 rounded-lg p-4">
      <Divider className="my-2" />
      <h1 className="text-2xl font-bold mt-4 mb-4">Mis citas:</h1>

      <div className="w-full overflow-x-auto pb-2 mt-4 ">
        <div className="flex gap-4 min-w-full flex-nowrap px-2 ">
          {appointments && appointments.length > 0 ? (
            appointments.map((item) => (
              <AppointmentCard key={item._id} appointment={item} />
            ))
          ) : (
            <p className="text-default-500">
              Aún no has solicitado ningun servicio.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
