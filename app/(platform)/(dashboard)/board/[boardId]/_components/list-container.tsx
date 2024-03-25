"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedLists, setOrderedLists] = useState(data);

  useEffect(() => {
    setOrderedLists(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list
    if (type === "list") {
      const items = reorder(orderedLists, source.index, destination.index).map(
        (list, index) => ({ ...list, order: index })
      );
      setOrderedLists(items);
      // TODO: trigger server action
    }

    // User moves a card
    if (type === "card") {
      let newOrderedList = [...orderedLists];

      // Source and destination list
      const sourceList = newOrderedList.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedList.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      // Check if cards exist on the source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exist on the destination list
      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        items.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = items;

        setOrderedLists(newOrderedList);
        // TODO: trigger server action
        // User moves the card to another list
      } else {
        const [removed] = sourceList.cards.splice(source.index, 1);
        removed.listId = destination.droppableId;
        destinationList.cards.splice(destination.index, 0, removed);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedLists(newOrderedList);
        // TODO: trigger server action
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedLists.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
