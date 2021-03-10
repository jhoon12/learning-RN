import React, {useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import * as S  from './style';

interface prop {
  name: number;
}
interface ListInt {
  id: number;
  text: string;
}

const TodoList: React.FC<prop> = (props) => {
  const [text, setText] = useState<string>('');
  const [list, setList] = useState<ListInt[]>([{id: 1, text: '헬로알앤'}]);
  const addToDo = () => {
    setList(list.concat({text: text, id: Date.now()}));
    setText('');
  };
  const inputChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    setText(e.nativeEvent.text);
  };
  const deleteItem = (id: number) => {
    setList(list.filter((list) => list.id !== id));
  };

  return (
    <S.Container>
      <TextInput
        placeholder="할 일"
        onChange={inputChange}
        value={text}></TextInput>
      <Button onPress={addToDo} title="추가하기" />
      {list.map((ele) => {
        return (
          <>
            <Text>{ele.text}</Text>
            <S.DeleteBtn  onPress={() => deleteItem(ele.id)}>
              <Text >Press Here</Text>
            </S.DeleteBtn>
          </>
        );
      })}
    </S.Container>  
  );
};
export default TodoList;
