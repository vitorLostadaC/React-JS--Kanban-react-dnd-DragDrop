import React, { useState } from "react";
import Boardcontext from "./context";
import List from "../List/list";
import { Container } from "./boardStyles";
import { loadLists } from "../api/api";
import produce from "immer";

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to) {
    var control = false;
    var modifieldList = produce(lists, (draft) => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    });

    modifieldList.map((values) => {
      values.cards.map((val) => {
        if (typeof val === "undefined") {
          control = true;
        }
      });
    });

    !control && setLists(modifieldList);
  }

  return (
    <Boardcontext.Provider value={{ lists, setLists, move }}>
      <Container color="blue">
        {lists.map((list, index) => (
          <List key={list.title} data={list} index={index} />
        ))}
      </Container>
    </Boardcontext.Provider>
  );
}
