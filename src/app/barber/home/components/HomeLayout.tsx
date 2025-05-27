import DefaultLayout from "@/layouts/default";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  CardFooter,
  Button,
  Divider,
  Image,
} from "@heroui/react";
import { useBarberHomeData } from "../hooks/useHome";
import { useState } from "react";
import { IGetAllServicesRes } from "@/core/client/domain/get-all-services";
import ReusableModal from "@/app/client/shared/components/ConfirmModal";
import { UploadServiceForm } from "./UploadService";
import { DeleteServiceForm } from "./DeleteServiceForm";

const BarberHome = () => {
  const { appointments, services, handleUpdateAppointmentStatus } =
    useBarberHomeData();
  const [selectedService, setSelectedService] =
    useState<IGetAllServicesRes | null>(null);
  const [modalMode, setModalMode] = useState<
    "upload" | "edit" | "delete" | null
  >(null);

  return (
    <DefaultLayout>
      <div className="min-h-screen p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold my-2">Mis servicios</h1>
          <Button
            variant="bordered"
            color="secondary"
            onClick={() => {
              setModalMode("upload");
              setSelectedService(null);
            }}
          >
            Subir nuevo servicio
          </Button>
        </div>
        <Divider className="my-2" />
        <div className="w-full overflow-x-auto pb-2 mt-4 ">
          <div className="flex gap-3 min-w-full flex-nowrap  ">
            {services.map((item, index) => (
              <Card
                key={index}
                shadow="sm"
                className="min-w-[260px] max-w-[260px] bg-default-200 flex-shrink-0  border-1 border-secondary"
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    alt={item.name}
                    className="object-cover h-[100px]"
                    radius="lg"
                    shadow="sm"
                    width={300}
                    height={300}
                    src={item.imageUrl}
                  />
                </CardBody>
                <CardFooter className="flex flex-col justify-center items-start p-2 gap-1">
                  <b>{item.name}</b>
                  <b className="truncate w-full">{item.description}</b>
                  <p className="text-default-500">${item.price}</p>
                  <div className="flex justify-between items-center w-full">
                    {/* <Button
                      variant="bordered"
                      color="warning"
                      radius="full"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => {
                        setSelectedService(item);
                        setModalMode("edit");
                      }}
                    >
                      <p className="text-lg">Editar</p>
                    </Button> */}
                    <Button
                      variant="bordered"
                      color="danger"
                      radius="full"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => {
                        setSelectedService(item);
                        setModalMode("delete");
                      }}
                    >
                      <p className="text-lg">Eliminar</p>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <Divider className="my-2" />
        <h1 className="text-3xl font-bold my-2">Últimas solicitudes</h1>
        <div className="flex flex-col gap-4">
          {appointments.length === 0 && <p>No hay citas pendientes</p>}
          {appointments.map((item, index) => (
            <Card key={index} shadow="sm">
              <CardHeader className="gap-4 items-center">
                <Avatar radius="full" size="lg" />
                <div>
                  <h4 className="font-semibold text-large">
                    {item.client.name} {item.client.lastName}
                  </h4>
                  {item.service?.name && (
                    <p className="text-default-500 text-sm">
                      Solicitó: {item.service.name}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardBody className="text-default-600 text-sm pt-0 px-6 pb-4">
                Descripción del servicio solicitado: {item.service?.description}
              </CardBody>
              <CardFooter className="flex justify-between items-center p-4">
                <p className="text-default-700 font-bold">
                  Precio del servicio: ${item.service?.price}
                </p>
                {item.status === "pending" && (

                  <div className="flex gap-2">
                    <Button
                      color="secondary"
                      size="sm"
                      radius="full"
                      onClick={() =>
                        handleUpdateAppointmentStatus(item._id, "accepted")
                      }
                    >
                      Aceptar
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      radius="full"
                      onClick={() =>
                        handleUpdateAppointmentStatus(item._id, "rejected")
                      }
                    >
                      Rechazar
                    </Button>
                  </div>
                )}
                {
                  item.status === "accepted" && (
                    <div>
                      <Button
                        color="secondary"
                        variant="bordered"
                        isDisabled
                        size="sm"
                        radius="full"

                      >
                        Aceptada
                      </Button>
                      <Button
                        color="success"
                        onClick={() => handleUpdateAppointmentStatus(item._id, "completed")}
                        size="sm"
                        radius="full"

                      >
                        Marcar como completada
                      </Button>
                    </div>

                  )
                }
                {
                  item.status === "rejected" && (
                    <p className="text-red-600 font-semibold">Rechazada</p>
                  )
                }
                {
                  item.status === "completed" && (
                    <p className="text-blue-600 font-semibold">Completada</p>
                  )
                }
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <ReusableModal
        isOpen={modalMode !== null}
        onClose={() => {
          setModalMode(null);
          setSelectedService(null);
        }}
        onSubmit={() => {
          setModalMode(null);
          setSelectedService(null);
        }}
        modalTitle={
          modalMode === "upload"
            ? "Subir nuevo servicio"
            : modalMode === "edit"
              ? "Editar servicio"
              : modalMode === "delete"
                ? "Eliminar servicio"
                : ""
        }
      >
        {modalMode === "upload" && (
          <UploadServiceForm
            method="upload"
            onClose={() => {
              (document.activeElement as HTMLElement | null)?.blur();
              setModalMode(null);
            }}
          />
        )}

        {modalMode === "edit" && selectedService && (
          <UploadServiceForm
            method="edit"
            initialValues={selectedService}
            onClose={() => {
              (document.activeElement as HTMLElement | null)?.blur();
              setModalMode(null);
            }}
          />
        )}

        {modalMode === "delete" && selectedService && (
          <DeleteServiceForm
            service={selectedService}
            onclose={() => {
              setModalMode(null);
              setSelectedService(null);
            }}
          />
        )}
      </ReusableModal>
    </DefaultLayout>
  );
};

export default BarberHome;
