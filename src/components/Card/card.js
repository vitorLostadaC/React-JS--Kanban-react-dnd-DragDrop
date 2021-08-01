import React, { useRef, useContext, useState } from "react";
import BoardContext from "../Board/context";
import {
  Container,
  Users,
  HeaderStyled,
  DateExport,
  Description,
  ColorPicker,
} from "./cardStyles";
import { MdAspectRatio } from "react-icons/md";
import { useDrag, useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import uuid from "uuid/dist/v4";
import produce from "immer";
/*            Dialog Imports                            */
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30px",
    height: "30px",
    fontSize: "0.8em",
    backgroundColor: "#ccc",
    fontWeight: "bold",
  },
}));

export default function Card(props) {
  const classes = useStyles();
  const ref = useRef();
  const { move } = useContext(BoardContext);
  const { lists } = useContext(BoardContext);
  const { setLists } = useContext(BoardContext);

  const [isOpen, IsOpen] = useState(false);
  const [openDialogError, setOpenDialogError] = useState(false);

  const [task, setTask] = useState({
    id: uuid(),
    title: props.data.title,
    description: props.data.description,
    color: props.data.color,
    users: props.data.users,
    date: props.data.date,
  });

  const handleClickOpen = () => {
    IsOpen(true);
  };

  function validation() {
    if (task.title == "" || task.description == "" || task.date == "") {
      handleOpenError();
    } else {
      handleClickModifyTask();
    }
  }

  const handleOpenError = () => {
    setOpenDialogError(true);
  };

  const handleCloseDialog = () => {
    setOpenDialogError(false);
  };

  const handleClose = () => {
    IsOpen(false);
  };

  const handleDeleteTask = () => {
    setLists(
      produce(lists, (draft) => {
        draft[props.indexList].cards.splice(props.index, 1);
      })
    );
    handleClose();
  };

  const handleClickModifyTask = () => {
    setLists(
      produce(lists, (draft) => {
        draft[props.indexList].cards.splice(props.index, 1, task);
      })
    );

    IsOpen(false);
  };

  function dateLimite() {
    if (props.indexList != lists.length - 1) {
      let today = new Date();
      let formatedDate = formateDate(props.data.date);

      if (
        today.getYear() == formatedDate.getYear() &&
        today.getMonth() == formatedDate.getMonth() &&
        today.getDate() == formatedDate.getDate()
      ) {
        return true; //Activity due date is equal to today´s date
      } else {
        if (formatedDate < today) {
          return false; //Activity due date is late
        }
      }
    }
  }

  function formateDate(date) {
    let formateDate = date.replace("/", ",");
    formateDate = formateDate.replace("/", ",");
    let day = formateDate.slice(0, 2),
      month = formateDate.slice(3, 5),
      year = formateDate.slice(6, 10);

    formateDate = new Date(year, month - 1, day);
    return formateDate;
  }

  function formateDateType(date, type) {
    let formateDate = date.replace("/", type);
    formateDate = formateDate.replace("/", type);
    let day = formateDate.slice(0, 2),
      month = formateDate.slice(3, 5),
      year = formateDate.slice(6, 10);

    formateDate = year + type + month + type + day;

    return formateDate;
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: {
      id: props.data.id,
      index: props.index,
      indexList: props.indexList,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedListIndex = item.indexList;
      const targetListIndex = props.indexList;

      const draggedIndex = item.index; //estou mechendo
      const targetIndex = props.index; //estou passando por cima

      if (draggedIndex == targetIndex && draggedListIndex == targetListIndex) {
        // se eu estiver na mesma posição
        return;
      } else {
        const targetSize = ref.current.getBoundingClientRect(); // tamanho do bloco
        const targetCenter = (targetSize.bottom - targetSize.top) / 2; //meio dele

        const draggedOffset = monitor.getClientOffset();
        const draggedTop = draggedOffset.y - targetSize.top;

        if (draggedIndex < targetIndex && draggedTop < targetCenter) {
          return;
        }

        if (draggedIndex > targetIndex && draggedTop > targetCenter) {
          return;
        }

        var result = move(
          draggedListIndex,
          targetListIndex,
          draggedIndex,
          targetIndex
        );

        if (result) {
          item.index = targetIndex;
          item.indexList = targetListIndex;
        }
      }
    },
  });

  dragRef(dropRef(ref));

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Alterar Tarefa</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="taskTitle"
            label="TitulO"
            type="text"
            name="taskTitle"
            defaultValue={props.data.title}
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
            id="taskHiched"
            label="Descrição"
            type="text"
            name="description"
            defaultValue={props.data.description}
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
            defaultValue={formateDateType(props.data.date, "-")}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
            onChange={(value) =>
              setTask((prevState) => ({
                ...prevState,
                date: props.formateDateFunction(value.target.value),
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
          <Button onClick={handleDeleteTask} color="primary">
            Excluir Tarefa
          </Button>
          <Button onClick={validation} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogError}
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
      <Container
        ref={ref}
        isDragging={isDragging}
        onClick={handleClickOpen}
        color={props.data.color}
      >
        <HeaderStyled>
          <h3 className="card-title">
            <span>{props.data.title}</span>
          </h3>
          {dateLimite()}
          <DateExport className="card-date" state={dateLimite()}>
            {props.data.date}
          </DateExport>
        </HeaderStyled>

        {props.data.description && (
          <Description>
            <p>{props.data.description}</p>
          </Description>
        )}

        {typeof props.data.users !== "undefined" && (
          <Users>
            <AvatarGroup
              max={3}
              spacing={9}
              classes={{
                avatar: classes.root,
              }}
            >
              {props.data.users.map((user, index) => {
                return (
                  <Avatar
                    style={{
                      height: "30px",
                      width: "30px",
                    }}
                    src={user.img}
                  />
                );
              })}
            </AvatarGroup>
          </Users>
        )}
      </Container>
    </>
  );
}
