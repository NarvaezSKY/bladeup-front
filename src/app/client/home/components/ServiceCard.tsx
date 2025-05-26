import { Button, Card, CardBody, CardFooter, Image } from "@heroui/react";
import ReusableModal from "../../shared/components/ConfirmModal";
import { useState } from "react";
import { useAppointment } from "../hooks/useAppointment";
import { IService } from "@/core/client/domain/make-appointment";

interface ServiceCardProps {
  item: IService[];
}

export const ServiceCard = ({ item }: ServiceCardProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const { makeClientAppointment } = useAppointment();

  return (
    <div>
      {item.length === 0 ? (
        <p className="text-center text-gray-500 my-8">
          Este barbero aún no ha publicado servicios.
        </p>
      ) : (
        item.map((service) => (
          <Card
            key={service._id}
            className="w-full max-w-sm mx-auto my-4"
            shadow="md"
          >
            <CardBody className="flex items-center justify-center">
              <Image
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </CardBody>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-xl font-bold mt-2">${service.price}</p>
            </div>
            <CardFooter>
              <Button
                color="secondary"
                radius="full"
                size="sm"
                variant="solid"
                className="w-full"
                onClick={() => {
                  setSelectedService(service);
                  console.log("Selected service:", service);
                  setOpenModal(true);
                }}
              >
                Solicitar cita
              </Button>
            </CardFooter>
          </Card>
        ))
      )}

      <ReusableModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        modalTitle={"Solicitar cita"}
      >
        <h2>¿Quieres solicitar una cita?</h2>
        <p>Servicio: {selectedService?.name}</p>
        <p>Precio: ${selectedService?.price}</p>

        <Button
          color="secondary"
          radius="full"
          size="sm"
          variant="solid"
          className="w-full mt-2"
          onClick={() => {
            makeClientAppointment({
              barber: selectedService?.barber || "",
              service: selectedService?._id || "",
            });
            setOpenModal(false);
          }}
        >
          Solicitar cita
        </Button>
        <Button
          color="default"
          radius="full"
          size="sm"
          variant="bordered"
          className="w-full mt-2"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Cancelar
        </Button>
      </ReusableModal>
    </div>
  );
};
