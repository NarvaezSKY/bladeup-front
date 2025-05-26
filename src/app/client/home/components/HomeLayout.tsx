import DefaultLayout from "@/layouts/default";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
  Divider,
} from "@heroui/react";
import { useClientHome } from "../hooks/useHome";
import { useAppointment } from "../hooks/useAppointment";
import ReusableModal from "../../shared/components/ConfirmModal";
import { useState } from "react";
import { IGetAllServicesRes } from "../../../../core/client/domain/get-all-services";
import { Appointments } from "./Appointments";

const ClientHome = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] =
    useState<IGetAllServicesRes | null>(null);
  const { username, services, barbers } = useClientHome();
  const { makeClientAppointment } = useAppointment();
  return (
    <DefaultLayout>
      <div className="flex flex-col min-h-screen p-2 bg-transparent rounded-lg">
        <h1 className="text-4xl font-bold my-2">Bienvenido, {username}</h1>
        <Appointments />
        <Divider className="my-4" />

        <div>
          <section className="col-span-2 p-4 rounded shadow ">
            <h2 className="text-xl font-semibold mb-4">
              Últimos servicios publicados
            </h2>
            <div className="my-2  rounded-lg p-4">
              <Divider className="my-2" />
              <div className="w-full overflow-x-auto pb-2 mt-4 ">
                <div className="flex gap-3 min-w-full flex-nowrap  ">
                  {services.map((item, index) => (
                    <Card
                      key={index}
                      shadow="sm"
                      className="min-w-[260px] max-w-[260px] bg-default-200 flex-shrink-0"
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
                        <p>
                          Ofrecido por: {item.barber.name}{" "}
                          {item.barber.lastName}
                        </p>
                        <Button
                          variant="solid"
                          color="secondary"
                          radius="full"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => {
                            setSelectedService(item);
                            setOpenModal(true);
                          }}
                        >
                          ¡Pide una cita!
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <Divider className="my-4" />
          <aside className="p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Servicios de BladeUp</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[
                {
                  title: "Servicios de barbería",
                  subtitle: "Fades, cortes y más",
                  tracks: "15 servicios",
                  img: "https://peluqueriacruz.com/wp-content/uploads/2024/02/joven-peluqueria-corte-pelo-1024x683.jpg",
                },
                {
                  title: "Servicios de peluquería",
                  subtitle: "Color, cepillado, estilo",
                  tracks: "12 servicios",
                  img: "https://eccu.edu.mx/beauty/wp-content/uploads/2020/12/32d055a9aa13c212e3587d65a89c17d1609d6372.XL2_.jpg",
                },
                {
                  title: "Otros servicios",
                  subtitle: "Cuidado facial, cejas",
                  tracks: "8 servicios",
                  img: "https://i.pinimg.com/236x/e1/22/29/e12229711226d55900b1b7b7d0628e59.jpg",
                },
              ].map((item, index) => (
                <Card key={index} className="w-full max-w-sm">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">
                      {item.tracks}
                    </p>
                    <small className="text-default-500">{item.subtitle}</small>
                    <h4 className="font-bold text-large">{item.title}</h4>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 flex items-center justify-center">
                    <Image
                      alt={item.title}
                      className="object-cover rounded-lg"
                      src={item.img}
                      width={320}
                      height={200}
                    />
                  </CardBody>
                </Card>
              ))}
            </div>
          </aside>

          <Divider className="my-4" />
        </div>
        <section className="mt-6 p-4 rounded shadow ">
          <h2 className="text-xl font-semibold mb-4">Barberos Blade Up!</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 flex-nowrap min-w-full px-2">
            {barbers.map((barber, index) => (
              <Card
                key={index}
                className="min-w-[300px] max-w-[300px] flex-shrink-0 bg-default-200"
              >
                <CardHeader className="justify-between pb-2">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      className="m-4"
                    />
                    <div className="flex flex-col gap-1 items-start justify-center ml-2">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {barber.name}
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        {barber.lastName}
                      </h5>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-4 pt-0 pb-4 text-small text-default-400">
                  <p>{barber.active}</p>
                </CardBody>
                <CardFooter className="px-4 pt-0">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      Se unió en:{" "}
                      {new Intl.DateTimeFormat("es-CO", {
                        dateStyle: "long",
                        timeZone: "America/Bogota",
                      }).format(new Date(barber.creationDate))}
                    </h4>

                    <h5 className="text-small tracking-tight text-default-400">
                      Estado: {barber.isBarberActive ? "Activo" : "Inactivo"}
                    </h5>
                    <Button
                      color="secondary"
                      radius="full"
                      size="sm"
                      variant="solid"
                      className="w-full mt-2"
                    >
                      Ver perfil
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <ReusableModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        modalTitle={"Solicitar cita"}
      >
        <h2>
          ¿Quieres solicitar una cita con {selectedService?.barber.name}{" "}
          {selectedService?.barber.lastName}?
        </h2>
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
              barber: selectedService?.barber._id || "",
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
    </DefaultLayout>
  );
};

export default ClientHome;
