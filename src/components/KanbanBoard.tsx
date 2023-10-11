
import { useState,useMemo } from "react"
import { Column, Id } from "../types"
import { createPortal } from "react-dom";
import ColumnContainer from "./ColumnContainer"
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
	DndContext,
	DragStartEvent,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {SortableContext,arrayMove} from '@dnd-kit/sortable';


function KanbanBoard ()  {

	const [column,setColumn] = useState<Column[]>([])

	 const [activeColumn, setActiveColumn] = useState<Column | null>(null);
	const [activeTask, setActiveTask] = useState<Task | null>(null);

	const [animationParent] = useAutoAnimate()

	 const columnsId = useMemo(() => column.map((col) => col.id), [column]);

	console.log(column)

	const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

	


function addColumn () {
		const columntoAdd:Column={
			id:crypto.randomUUID(),
			title:`Column ${column.length+1}`	
			}

		setColumn([...column,columntoAdd])

	}


	function deleteColumn(id:Id){
        setColumn((prev=>prev.filter(col=>col.id!==id)))
        console.log("bruh")
    }

    function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    // if (event.active.data.current?.type === "Task") {
    //   setActiveTask(event.active.data.current.task);
    //   return;
    // }
  }

    function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    

    setColumn((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }


	return (
		<>
		<DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
		<SortableContext items={columnsId}>
		<div ref={animationParent} className="flex gap-12">
			{
				column.map((col)=>(
					<ColumnContainer key={col.id} deleteColumn={deleteColumn} column={col}/>
				))
			}
		</div>
		

			</SortableContext>

		<button onClick={addColumn}
            
				className="
      h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-gray-800
      border-1
      border-neutral-600
      p-4
      ring-rose-500
      hover:ring-2
      flex
      items-center
      gap-2
      "
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>


				Add Column
			</button>
			{ createPortal( <DragOverlay>
			{activeColumn &&
			 (
			 	 <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} />
			 	)}
			</DragOverlay>,document.body)

		}

			</DndContext>



		
		</>
	)



}




export default KanbanBoard;

