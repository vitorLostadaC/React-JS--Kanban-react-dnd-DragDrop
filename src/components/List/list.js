import React, { useState, useContext } from "react";
import BoardContext from "../Board/context";
import { MdAdd } from "react-icons/md";
import { Container, ColorPicker } from "./listStyles";
import Card from "../Card/card";
import produce from "immer";
import { useDrop } from "react-dnd";
import uuid from "uuid/dist/v4";
//Popup imports
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function List({ data, index: listIndex }) {
  const { move } = useContext(BoardContext);
  const { lists } = useContext(BoardContext);
  const { setLists } = useContext(BoardContext);

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [task, setTask] = useState({
    id: uuid(), //mudar posteriormente
    title: "",
    description: "",
    color: "#342543",
    users: [
      {
        img: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1485665415623x323958275606855740%2FAA_icon.png?w=&h=&auto=compress&dpr=1&fit=max",
      },
    ],
    date: "",
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      if (data.cards.length == 0) {
        switch (listIndex) {
          case 0:
            if (monitor.targetId == "T8") {
              move(item.indexList, 0, item.index, 0); //mudar a função

              item.index = 0;
              item.indexList = 0;
            }
            break;
          case 1:
            if (monitor.targetId == "T15") {
              move(item.indexList, 1, item.index, 0); //mudar a função

              item.index = 0;
              item.indexList = 1;
            }
            break;
          case 2:
            if (monitor.targetId == "T20") {
              move(item.indexList, 2, item.index, 0); //mudar a função

              item.index = 0;
              item.indexList = 2;
            }
            break;
        }
      }
    },
  });

  function resetTask() {
    setTask((prevState) => ({
      ...prevState,
      title: "",
      description: "",
      color: "#342543",
      users: [
        {
          img: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1485665415623x323958275606855740%2FAA_icon.png?w=&h=&auto=compress&dpr=1&fit=max",
        },
      ],
      date: "",
    }));
  }

  function validation() {
    if (task.title == "" || task.description == "" || task.date == "") {
      handleOpenError();
    } else {
      handleClickAddTask();
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenError = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickAddTask = () => {
    setLists(
      produce(lists, (draft) => {
        draft[listIndex].cards.push(task);
      })
    );
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Adicionar Tarefa</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="title"
            label="Titulo da tarefa"
            type="text"
            name="title"
            onChange={(value) =>
              setTask((prevState) => ({
                ...prevState,
                title: value.target.value,
              }))
            }
            fullWidth
          />

          <TextField
            required
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            name="description"
            onChange={(value) =>
              setTask((prevState) => ({
                ...prevState,
                description: value.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            id="limiteDate"
            label="Data Limite"
            type="date"
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
            onChange={(value) =>
              setTask((prevState) => ({
                ...prevState,
                date: formateDate(value.target.value),
              }))
            }
          />
          <ColorPicker>
            <input
              type="color"
              defaultValue="#ff0000"
              onChange={(value) =>
                setTask((prevState) => ({
                  ...prevState,
                  color: value.target.value,
                }))
              }
            ></input>
          </ColorPicker>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={validation} color="primary">
            Adicionar Tarefa
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
          Erro!
        </DialogTitle>
        <DialogContent dividers>Preencha corretamente os dados</DialogContent>
        <Button onClick={handleCloseDialog} color="primary">
          Ok
        </Button>
      </Dialog>
      <Container ref={dropRef}>
        <header>
          <h2 className="list-title">{data.title}</h2>
          <button
            className="list-button"
            type="button"
            onClick={() => {
              handleClickOpen();
              resetTask();
            }}
          >
            <MdAdd size={25} color="#fff" />
          </button>
        </header>

        <ul>
          {data.cards.length}

          {data.cards.map((cards, index) => (
            <Card
              default={false}
              key={cards.id}
              index={index}
              data={cards}
              indexList={listIndex}
              formateDateFunction={formateDate}
            />
          ))}
        </ul>
      </Container>
    </>
  );
}

function formateDate(date) {
  let formateDate = date.replace("-", ",");
  formateDate = formateDate.replace("-", ",");
  formateDate = new Date(formateDate);

  let day = formateDate.getDate().toString(),
    dayF = day.length == 1 ? "0" + day : day,
    month = (formateDate.getMonth() + 1).toString(),
    monthF = month.length == 1 ? "0" + month : month,
    year = formateDate.getFullYear();
  return dayF + "/" + monthF + "/" + year;
}
