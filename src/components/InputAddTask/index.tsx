import { Feather } from "@expo/vector-icons";
import { InputContainer, Input, InputButton } from "./styles";

type Props = {
	onPress: () => void;
	onChangeText: (text: string) => void;
	value: string;
};

export function InputAddTask({ onPress, onChangeText, value }: Props) {
	return (
		<InputContainer>
			<Input
				placeholder='Digite aqui sua tarefa.'
				placeholderTextColor='white'
				keyboardType='default'
				value={value}
				onChangeText={onChangeText}
			/>
			<InputButton onPress={onPress}>
				<Feather name='plus-square' size={24} color='white' />
			</InputButton>
		</InputContainer>
	);
}
