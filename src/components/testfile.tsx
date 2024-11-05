import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import styled from "styled-components";

type Item = {
  id: string;
  content: string;
};

const initialItems: Item[] = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' },
  { id: '4', content: 'Item 4' },
];

function DNDComponent() {
  const [items, setItems] = useState<Item[]>(initialItems);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <S.Container>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <S.OL ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, idx) => (
                <Draggable key={item.id} draggableId={item.id} index={idx}>
                  {(provided) => (
                    <S.LI
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </S.LI>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </S.OL>
          )}
        </Droppable>
      </DragDropContext>
    </S.Container>
  );
}

export default DNDComponent;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  OL: styled.ol`
    margin: 2rem;
    width: 300px;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid gray;
    padding: 1rem;
  `,

  LI: styled.li`
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding: 1rem;
    background-color: #a4a4a432;
  `,
};
