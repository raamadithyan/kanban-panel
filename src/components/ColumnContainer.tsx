import { Column,Id } from "../types"

interface Props {
    column:Column;
    
    deleteColumn:(id:Id)=>void;
}
const ColumnContainer = (props:Props) => {

    const {column,deleteColumn} = props;

    
  return (
  
    <div className="flex  gap-4 relative">

			
			<div className=" absolute top-0 flex items-center px-8 w-[350px] h-12 justify-between bg-neutral-900">
				<h2 className="font-bold">{column.title}</h2>
				<svg onClick={()=>deleteColumn(column.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

			</div>
			<div className=" flex flex-col justify-between  w-[350px] h-[500px] bg-neutral-800 rounded-md overflow-y-auto ">


				<div className=" flex flex-col gap-8  items-center    ">

				<div className="w-[300px] h-[100px] bg-green-800"></div>
				<div className="w-[300px] h-[100px] bg-green-800"></div>
				<div className="w-[300px] h-[100px] bg-green-800"></div>
				<div className="w-[300px] h-[100px] bg-green-800"></div>
				<div className="w-[300px] h-[100px] bg-green-800"></div>
				<div className="w-[300px] h-[100px] bg-green-800"></div>


				</div>

			</div>
			

			<button className=" absolute bottom-0 group hover:bg-neutral-800 flex items-center px-8 w-[350px] h-12 justify-start gap-2 bg-neutral-900">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" group-hover:text-green-400 w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
				<h2 className="group-hover:text-green-400">Add Task</h2>

			</button>
			


			






		</div>
  )
}

export default ColumnContainer