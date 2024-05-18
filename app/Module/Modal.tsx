import { Box, Modal } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  children: ReactNode;
  setModal: Dispatch<SetStateAction<boolean>>;
  modal: boolean;
  sizeWidthPorcentage: number;
  sizeHeightPorcentage: number;
};

export default function ModalModule({
  setModal,
  modal,
  children,
  sizeHeightPorcentage,
  sizeWidthPorcentage,
}: Props) {
  return (
    <Modal
      open={modal}
      onClose={() => setModal((prev) => !prev)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#233244",
          borderRadius: "10px",
          padding: "20px",
          maxHeight: `${sizeHeightPorcentage}%`,
          width: `${sizeWidthPorcentage}%`,
          border: "none",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
