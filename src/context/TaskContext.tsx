import { ReactNode, createContext, useState } from "react";
import { TaskProps } from "../utils/types";

interface TaskContextProps {
	task: TaskProps;
	selectTask: (task: TaskProps) => void;
	clearTask: () => void;
}

interface TaskProviderProps {
	children: ReactNode;
}

export const TaskContext = createContext<TaskContextProps>({
	task: { id: 0, title: "", status: false },
	selectTask: () => {},
	clearTask: () => {}
});

function TaskProvider({ children }: TaskProviderProps) {
	const [task, setTask] = useState<TaskProps>({ id: 0, title: "", status: false });

	function selectTask(task: TaskProps) {
		setTask(task);
	}

	function clearTask() {
		setTask({ id: 0, title: "", status: false });
	}
	return (
		<TaskContext.Provider value={{ task, selectTask, clearTask }}>{children}</TaskContext.Provider>
	);
}

export default TaskProvider;
