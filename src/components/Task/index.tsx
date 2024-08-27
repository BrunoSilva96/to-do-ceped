import { Feather } from "@expo/vector-icons";
import { Container, TaskText, TaskDone, TaskDelete } from "./styles";

type Props = {
	title: string;
	status: boolean;
	onCheck?: () => void;
	onRemove?: () => void;
};

export function Task({ title, status, onCheck, onRemove }: Props) {
	return (
		<Container>
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
