import React, { useEffect, useState } from "react";
import Item from "./Item";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ModalComp from "./ModalComp";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Category({ category, month }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalText, setModalText] =  useState([])
  useEffect(()=>{
    axios
      .get("/api/transactions/category/" + category._id +"/"+localStorage.id + "?month=" + (month + 1), {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
      .then((res) => {
        setModalText(res.data)
      });
  },[])

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {category._id} {month>=0 ?" in Month "+ (month+1): ""}
          </Typography>
          
          {modalText.map((t,index)=><ModalComp transaction={t} key={index}></ModalComp>)}
          
        </Box>
      </Modal>
      <Item className="category">
        <h3>
          <span onMouseEnter={handleOpen}>{category._id}</span>:{" "}
          <span className={category.totalSum>=500?"green":"red"}>{category.totalSum.toLocaleString()}$</span>
        </h3>
      </Item>
    </>
  );
}
