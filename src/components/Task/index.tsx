import { Feather } from "@expo/vector-icons";
import { Container, TaskText, TaskDone, TaskDelete } from "./styles";
import { TaskProps, RootStackParamList } from "../../utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TaskContext } from "../../context/TaskContext";

type Props = NativeStackScreenProps<RootStackParamList>;

export function Task(props: TaskProps) {
	const navigation = useNavigation<Props["navigation"]>();
	const { selectTask } = useContext(TaskContext);

	function handlePress() {
		navigation.navigate("Details");
		selectTask(props);
	}

	return (
		<Container onPress={() => handlePress()}>
			<TaskDone onPress={props.onCheck} style={props.status ? { backgroundColor: "#0E9577" } : {}}>
				{!props.status && <Feather name='square' size={24} color='white' />}
				{props.status && <Feather name='check-square' size={24} color='white' />}
			</TaskDone>

			<TaskText>{props.title}</TaskText>

			<TaskDelete onPress={props.onRemove}>
				<Feather name='trash-2' size={24} color='white' />
			</TaskDelete>
		</Container>
	);
}
