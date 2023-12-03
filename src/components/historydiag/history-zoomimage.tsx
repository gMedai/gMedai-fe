import { Box, Modal } from "@mui/material";

export const ModalZoomImage = ({ imageUrl, onClose }) => {
  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={imageUrl}
          alt="Zoomed Image"
          style={{ width: "60vw", maxWidth: "650px", height: "60vw", maxHeight: "650px" }}
        />
      </Box>
    </Modal>
  );
};
