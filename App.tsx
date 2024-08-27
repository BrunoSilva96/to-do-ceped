import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View, Text, Alert } from "react-native";
import { Task } from "./src/components/Task";
import { CardNumber } from "./src/components/CardNumber";
import { InputAddTask } from "./src/components/InputAddTask";
import { useEffect, useState } from "react";

export default function App() {
	const [tasks, setTasks] = useState<{ description: string; check: boolean }[]>([]);
	const [taskText, setTaskText] = useState("");
	const [countTask, setCountTask] = useState(0);
	const [countTasksDone, setCountTaskDone] = useState(0);

	function handleTask() {
		if (taskText == "") {
			return Alert.alert("Erro", "Tarefa está sem descrição.");
		}

		if (tasks.some((task) => task.description === taskText)) {
			return Alert.alert("Erro", "Tarefa já existe.");
		}

		const newTask = { description: taskText, check: false };

		setTasks([...tasks, newTask]);
		setTaskText("");
	}

	function handleTaskChangeStatus(taskToChange: { description: string; check: boolean }) {
		const updatedTasks = tasks.filter((task) => task !== taskToChange);
		const newTask = {
			description: taskToChange.description,
			check: !taskToChange.check
		};
		updatedTasks.push(newTask);
		setTasks(updatedTasks);
	}

	function handleTaskDelete(taskToDelete: { description: string; check: boolean }) {
		Alert.alert("Atenção", `Deseja realmente remover a tarefa ${taskToDelete.description}?`, [
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

	return (
		<View style={styles.container}>
			<StatusBar style='auto' />

			<InputAddTask
				onPress={handleTask}
				onChangeText={setTaskText}
				value={taskText}></InputAddTask>

			<View style={{ flexDirection: "row", gap: 16 }}>
				<CardNumber title={"Cadastradas"} num={countTask} color={"#1e1e1e"} />
				<CardNumber title={"Em aberto"} num={0} color={"#e88a1a"} />
				<CardNumber title={"Finalizadas"} num={0} color={"#0e9577"} />
			</View>

			<Text>Tarefas: {countTask}</Text>
			<FlatList
				data={tasks}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<Task
						title={item.description}
						status={item.check}
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
