import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  modalTitle: string;
}

export default function ReusableModal({
  isOpen,
  onClose,
  children,
  modalTitle,
}: ReusableModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
