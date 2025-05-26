import { ICreateServiceReq } from "@/core/barber/domain/create-service";
import {
  Form,
  Input,
  Button,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useBarberHomeData } from "../hooks/useHome";

interface Props {
  //   userId: string;
  method: "upload" | "edit";
  initialValues?: Partial<ICreateServiceReq>;
  serviceId?: string;
  onClose?: () => void;
}

export function UploadServiceForm({
  //   userId,
  method,
  //   serviceId,
  initialValues,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateServiceReq>({
    defaultValues: initialValues,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    loading: isUploading,
    error: uploadError,
    uploadService,
  } = useBarberHomeData();

  const onSubmit = async (data: ICreateServiceReq) => {
    if (!selectedFile) {
      return alert("Debes subir una imagen.");
    }

    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));

    formData.append("image", selectedFile);

    if (method === "upload") {
      await uploadService(formData);
      if (onClose) onClose();
    }

    reset();
    setSelectedFile(null);
  };

  useEffect(() => {
    if (initialValues) {
      console.log("initialValues", initialValues);
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const isLoading = isUploading;
  const error = uploadError;

  return (
    <Form
      className="w-full max-w-2xl space-y-4"
      onReset={() => reset()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Select
        isRequired
        id="category"
        label="Category"
        placeholder="Selecciona una categoría"
        size="md"
        variant="bordered"
        {...register("category", { required: "Este campo es obligatorio" })}
        errorMessage={errors.category?.message}
        isInvalid={!!errors.category}
      >
        <SelectItem key="Corte clásico">Corte clásico</SelectItem>
        <SelectItem key="Fade">Fade</SelectItem>
        <SelectItem key="Diseño">Diseño</SelectItem>
        <SelectItem key="Barba">Barba</SelectItem>
        <SelectItem key="Color">Color</SelectItem>
        <SelectItem key="Tratamiento">Tratamiento</SelectItem>
        <SelectItem key="Otro">Otro</SelectItem>
      </Select>

      <Input
        isRequired
        label="Nombre"
        placeholder="Nombre"
        variant="bordered"
        {...register("name", { required: "Este campo es obligatorio" })}
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
      />

      <Textarea
        isRequired
        label="Descripción"
        placeholder="Descripción"
        variant="bordered"
        {...register("description", {
          required: "Este campo es obligatorio",
        })}
        errorMessage={errors.description?.message}
        isInvalid={!!errors.description}
      />
      <Input
        isRequired
        label="Precio"
        placeholder="$"
        variant="bordered"
        {...register("price", { required: "Este campo es obligatorio" })}
        errorMessage={errors.price?.message}
        isInvalid={!!errors.price}
      />

      <Input
        type="file"
        label="Imagen"
        variant="bordered"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setSelectedFile(file);
          } else {
            setSelectedFile(null);
          }
        }}
        {...(selectedFile ? {} : { placeholder: "Selecciona una imagen" })}
        errorMessage={!selectedFile ? "Este campo es obligatorio" : undefined}
        isInvalid={!selectedFile}
      />

      {error && <span className="text-danger text-sm -mt-2">{error}</span>}

      <div className="flex gap-4">
        <Button
          color="secondary"
          isDisabled={isLoading}
          type="submit"
          onClick={() => {
            onClose;
          }}
        >
          {isLoading
            ? "Cargando..."
            : method === "edit"
              ? "Actualizar"
              : "Subir"}
        </Button>
        <Button type="reset" variant="bordered">
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
