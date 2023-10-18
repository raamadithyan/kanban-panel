
import { useState,useMemo } from "react"
import { Column, Id, Task } from "../types"
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
	const [tasks,setTasks] =useState<Task[]>([])

	 const [activeColumn, setActiveColumn] = useState<Column | null>(null);
	// const [activeTask, setActiveTask] = useState<Task | null>(null);

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

      function updateColumn(id: Id, title: string) {
    const newColumns = column.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumn(newColumns);
  }

  function createTask(columnId:Id){
  	const newTask:Task = {
  		id:crypto.randomUUID(),

  		columnId,
  		content:`Task ${tasks.length+1}`
  	}

  	setTasks([...tasks,newTask])

  }


  function deleteTask(id:Id) {
  	setTasks(prev=>prev.filter(task=>task.id!==id))
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
    // setActiveTask(null);

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
		<div ref={animationParent} className="flex gap-16  relative top-20 mx-16">
			{
				column.map((col)=>(
					<ColumnContainer  
					key={col.id}
					 column={col}
					 deleteColumn={deleteColumn} 
					 updateColumn={updateColumn}
					 createTask={createTask}
					 tasks={tasks.filter(task=>task.columnId===col.id)}
					 deleteTask={deleteTask}
					 />
				))
			}
		</div>
		

			</SortableContext>

		<button onClick={addColumn}
            
				className="
      h-[60px]
      w-[150px]
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
      justify-center
      gap-2
      fixed top-20 left-[50%] transform translate-x-[-50%] 
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
			 	 <ColumnContainer 
			 	 updateColumn={updateColumn}
			 	  column={activeColumn} 
			 	  deleteColumn={deleteColumn}
			 	  createTask={createTask}
			 	  tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
			 	  deleteTask={deleteTask}
			 	   />
			 	)}
			</DragOverlay>,document.body)

		}

			</DndContext>



		
		</>
	)



}




export default KanbanBoard;

