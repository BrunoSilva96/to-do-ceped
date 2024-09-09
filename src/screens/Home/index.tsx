import { FlatList, StyleSheet, View, Text, Alert } from "react-native";
import { Task } from "../../components/Task";
import { CardNumber } from "../../components/CardNumber";
import { InputAddTask } from "../../components/InputAddTask";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { TaskProps } from "../../utils/types";

export default function Home() {
	const { tasks, createTask, setTasks } = useContext(TaskContext);

	const [taskText, setTaskText] = useState("");
	const [countTask, setCountTask] = useState(0);
	const [countTasksDone, setCountTaskDone] = useState(0);
	const [countTasksOpen, setCountTaskOpen] = useState(0);

	function handleTask() {
		if (taskText == "") {
			return Alert.alert("Erro", "Tarefa está sem descrição.");
		}

		if (tasks.some((task) => task.title === taskText)) {
			return Alert.alert("Erro", "Tarefa já existe.");
		}

		createTask(taskText);
		setTaskText("");
	}

	function handleTaskChangeStatus(taskToChange: TaskProps) {
		const updatedTasks = tasks.filter((task) => task.title !== taskToChange.title);
		const newTask = {
			id: taskToChange.id,
			title: taskToChange.title,
			status: !taskToChange.status
		};
		updatedTasks.push(newTask);
		setTasks(updatedTasks);
	}

	function handleTaskDelete(taskToDelete: TaskProps) {
		Alert.alert("Atenção", `Deseja realmente remover a tarefa ${taskToDelete.title}?`, [
			{
				text: "Sim",
				onPress: () => {
					const updatedTasks = tasks.filter((task) => task !== taskToDelete);
					setTasks(updatedTasks);
				}
			},
			{
				text: "Cancelar",
				style: "cancel"
			}
		]);
	}

	useEffect(() => {
		let totalTasks = tasks.length;

		setCountTask(totalTasks);
	}, [tasks]);

	useEffect(() => {
		let totalTasksDone = tasks.filter((task) => task.status === true).length;
		setCountTaskDone(totalTasksDone);
	}, [tasks]);

	useEffect(() => {
		let totalTasksOpen = tasks.filter((task) => task.status === false).length;
		setCountTaskOpen(totalTasksOpen);
	}, [tasks]);

	return (
		<View style={styles.container}>
			<InputAddTask
				onPress={handleTask}
				onChangeText={setTaskText}
				value={taskText}></InputAddTask>

			<View style={{ flexDirection: "row", gap: 16 }}>
				<CardNumber title={"Cadastradas"} num={countTask} color={"#1e1e1e"} />
				<CardNumber title={"Em aberto"} num={countTasksOpen} color={"#e88a1a"} />
				<CardNumber title={"Finalizadas"} num={countTasksDone} color={"#0e9577"} />
			</View>

			<Text>Tarefas: {countTask}</Text>
			<FlatList
				data={tasks}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<Task
						id={item.id}
						title={item.title}
						status={item.status}
						onCheck={() => handleTaskChangeStatus(item)}
						onRemove={() => handleTaskDelete(item)}
					/>
				)}
				ListEmptyComponent={() => (
					<View>
						<Text>Você ainda não cadastrou tarefas.</Text>
						<Text>Crie uma tarefa para começar!</Text>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#28385E",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 16,
		paddingTop: 64,
		gap: 16
	}
});
