import { StatusBar } from "expo-status-bar";
import {
	FlatList,
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert
} from "react-native";
import { Task } from "./src/components/Task";
import { CardNumber } from "./src/components/CardNumber";
import { CardInOpen } from "./src/components/CardInOpen";
import { CardDone } from "./src/components/CardDone";
import { InputAddTask } from "./src/components/InputAddTask";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function App() {
	const [tasks, setTasks] = useState<{ description: string; check: boolean }[]>([]);
	const [taskText, setTaskText] = useState("");
	const [countTask, setCountTask] = useState(0);

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
				<CardNumber />
				<CardInOpen />
				<CardDone />
			</View>

			<Text>Tarefas: {countTask}</Text>
			<FlatList
				data={tasks}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => <Task />}
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
