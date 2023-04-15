import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, styled, Typography, Zoom } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch } from "react-redux";
import { updateMe } from "@/redux/userSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom timeout={500} ref={ref} {...props} />;
});
const ModalStyled = styled(Dialog)(({ theme }) => ({
  ".MuiDialog-container": {
    ".MuiDialog-paper": {
      color: theme.palette.black.main,
      minWidth: "388px",
      borderRadius: "1.25rem",
      fontSize: "0.875rem",
      padding: "1.5rem",
      ".modal-title": {
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
      ".modal-content": {
        height: "calc(300px + 1.25rem*2)",
        background: theme.palette.background1.main,
        padding: "1.25rem",
        ".img-select": {
          color: theme.palette.blue1.main,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          borderRadius: ".5rem",
          border: "2px dashed rgb(196, 196, 207)",
        },
      },
      ".modal-bottom": {
        marginTop: "1.5rem",
        display: "flex",
        gap: ".5rem",
        justifyContent: "center",
        ".btn": {
          padding: ".5rem 1rem",
          border: "1px solid",
          borderRadius: ".25rem",
          "&.btn-cancel": {
            backgroundColor: theme.palette.background.main,
            color: theme.palette.blue1.main,
            borderColor: theme.palette.blue1.main,
          },
          "&.btn-confirm": {
            backgroundColor: theme.palette.blue1.main,
            color: theme.palette.background.main,
            borderColor: theme.palette.background.main,
          },
        },
      },
    },
  },
}));
const ModalImage = ({ isImage, open, setOpen, title, image }) => {
  const inputRef = React.useRef();
  const [imgAvatar, setImgAvatar] = React.useState("");
  const dispatch = useDispatch();
  const handleClose = () => {
    setImgAvatar("");
    setOpen(false);
  };
  const handleUpdateImage = async () => {
    if (imgAvatar) {
      const user = await dispatch(updateMe({ photo: imgAvatar }));
      unwrapResult(user);
      handleClose();
      toast.success("Ảnh đại diện đã được cập nhập");
    }
  };
  return (
    <ModalStyled
      className="hai"
      TransitionComponent={Transition}
      open={open}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box className="modal-title">
        <Typography>{title}</Typography>
        <CloseOutlinedIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
      </Box>
      <Box className="box-border" sx={{ height: "1.5rem" }}></Box>
      <Box className="modal-content" onClick={() => inputRef.current.click()}>
        <Box className="img-select">
          {isImage || imgAvatar ? (
            <img
              src={imgAvatar ? URL.createObjectURL(imgAvatar) : image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <>
              <input
                onChange={(e) => {
                  setImgAvatar(e.target.files[0]);
                }}
                ref={inputRef}
                hidden
                type="file"
                name="photo"
                accept="image/png, image/jpeg"
              ></input>
              <Typography>Chọn vào khung này.</Typography>
            </>
          )}
        </Box>
      </Box>
      {!isImage && (
        <Box className="modal-bottom">
          <button className="btn btn-cancel" onClick={handleClose}>
            Hủy bỏ
          </button>
          <button className="btn btn-confirm" onClick={handleUpdateImage}>
            Lưu thay đổi
          </button>
        </Box>
      )}
    </ModalStyled>
  );
};

export default ModalImage;
