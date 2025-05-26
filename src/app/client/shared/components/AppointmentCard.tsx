import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@heroui/react";
import { format } from "date-fns";
import ReusableModal from "./ConfirmModal";
import React from "react";
import { Select, SelectItem } from "@heroui/select";
import { useAppointment } from "../../home/hooks/useAppointment";

interface AppointmentCardProps {
  appointment: {
    _id: string;
    client?: { name?: string; lastName?: string };
    barber?: { name?: string; lastName?: string };
    service?: {
      name?: string;
      description?: string;
      price?: number;
      imageUrl?: string;
    };
    status: string;
    date: string;
  };
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const [open, setOpen] = React.useState(false);
  const { handleUpdateAppointmentStatus } = useAppointment();
  const { client, barber, service, status, date } = appointment;
  const statusMap: Record<string, string> = {
    accepted: "Aceptado",
    rejected: "Rechazado",
    cancelled: "Cancelado",
    pending: "Pendiente",
  };
  const statusColorMap: Record<string, "secondary" | "success" | "warning" | "danger"> = {
  pending: "secondary",
  accepted: "success",
  rejected: "warning",
  cancelled: "danger",
};

  return (
    <Card className="w-[280px] min-w-[280px] max-w-[280px] flex-shrink-0 border border-secondary bg-default-50 shadow-sm">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-sm text-default-500 font-semibold">Servicio</p>
        <h4 className="font-bold text-large">
          {service?.name ?? "Este servicio ya no está disponible"}
        </h4>
        <p className="text-sm text-default-500">
          {service?.description ?? "Este servicio fue eliminado por el barbero"}
        </p>
      </CardHeader>

      <CardBody className="overflow-visible p-0 flex items-center justify-center">
        <Image
          alt={service?.name ?? "Imagen del servicio"}
          className="object-cover h-[100px]"
          radius="lg"
          shadow="sm"
          width={300}
          height={300}
          src={service?.imageUrl ?? "/placeholder.png"}
        />
      </CardBody>

      <CardBody className="px-4 py-2 space-y-1">
        <div className="text-sm">
          <strong>Cliente:</strong> {client?.name ?? "N/A"}{" "}
          {client?.lastName ?? ""} (Tú)
        </div>
        <div className="text-sm">
          <strong>Barbero:</strong> {barber?.name ?? "N/A"}{" "}
          {barber?.lastName ?? ""}
        </div>
        <div className="text-sm">
          <strong>Fecha:</strong>{" "}
          {date ? format(new Date(date), "dd MMM yyyy, HH:mm") : "Sin fecha"}
        </div>
        <div className="text-sm">
          <strong>Precio:</strong>{" "}
          {service?.price !== undefined
            ? `$${service.price.toLocaleString()}`
            : "N/A"}
        </div>
      </CardBody>

      <CardFooter className="px-4 py-2 flex justify-end">
        <Button
          color={statusColorMap[status] ?? "secondary"}
          variant="ghost"
          radius="full"
          size="sm"
          className="w-full"
          disabled={status !== "pending"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <b className="text-sm">{statusMap[status] ?? "Estado desconocido"}</b>
        </Button>
      </CardFooter>
      <ReusableModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        modalTitle="Cancelar cita"
        onSubmit={() => {}}
      >
        <div>
          <h1>Cambiar estado de la cita</h1>
          <Select
          variant="bordered"
          className="w-full mt-2"
            onChange={(e) => {
              handleUpdateAppointmentStatus(appointment._id, e.target.value);
              setOpen(false);
            }}
          >
            <SelectItem key="cancelled">Cancelar</SelectItem>
          </Select>
        </div>
      </ReusableModal>
    </Card>
  );
};
