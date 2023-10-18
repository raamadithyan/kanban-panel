import { Task } from "../types"

interface TaskProps {
task:Task;
}

function TaskCard({task}:TaskProps) {
	return (
		<div 
			className="
				bg-rose-800 p-2.5 h-[100px]
				rounded-xl
				">
			{task.content}
		</div>
	)
}

export default TaskCard