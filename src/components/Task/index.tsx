import { Feather } from "@expo/vector-icons";
import { Container, TaskText, TaskDone, TaskDelete } from "./styles";

import { TaskProps, RootStackParamList } from "../../utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList>;

export function Task({ id, title, status, onCheck, onRemove }: TaskProps) {
	const [task, setTask] = useState<TaskProps>({ id, title, status, onCheck, onRemove });
	const navigation = useNavigation<Props["navigation"]>();

	function handlePress() {
		navigation.navigate("Details", { id, title, status });
	}

	return (
		<Container onPress={() => handlePress()}>
			<TaskDone onPress={onCheck} style={status ? { backgroundColor: "#0E9577" } : {}}>
				{!status && <Feather name='square' size={24} color='white' />}
				{status && <Feather name='check-square' size={24} color='white' />}
			</TaskDone>

			<TaskText>{title}</TaskText>

			<TaskDelete onPress={onRemove}>
				<Feather name='trash-2' size={24} color='white' />
			</TaskDelete>
		</Container>
	);
}
