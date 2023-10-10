
import { useState } from "react"
import { Column, Id } from "../types"
import ColumnContainer from "./ColumnContainer"
import { useAutoAnimate } from '@formkit/auto-animate/react';

const KanbanBoard = () => {

	const [column,setColumn] = useState<Column[]>([])
	const [animationParent] = useAutoAnimate()

	console.log(column)

	const addColumn = () => {
		const columntoAdd:Column={
			id:crypto.randomUUID(),
			title:`Column ${column.length+1}`	
			}

		setColumn([...column,columntoAdd])

	}


	function deleteColumn(id:Id){
        setColumn((prev=>prev.filter(col=>col.id!==id)))
    }
	return (
		<>

		<div ref={animationParent} className="flex gap-12">
			{
				column.map((col)=>(
					<ColumnContainer key={col.id} deleteColumn={deleteColumn} column={col}/>
				))
			}
		</div>

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



		
		</>
	)
}

export default KanbanBoard