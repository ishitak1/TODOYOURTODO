import { CheckCircleIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  HStack,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "../recoil/todos";
import { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  index: number;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todos, setTodos] = useRecoilState(todoState);
  const [todoInput, setTodoInput] = useState(todo.text);

  const deleteTodo = () => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = () => {
    const todo = todos[index];
    const newTodo = {
      ...todo,
      text: todoInput,
    };
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    newTodos.splice(index, 0, newTodo);
    setTodos(newTodos);
    setIsEditing(false);
  };

  const completeTodo = () => {
    const todo = todos[index];
    const newTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    newTodos.splice(index, 0, newTodo);
    setTodos(newTodos);
  };

  return (
    <HStack
      w="full"
      px={{ base: 4, md: 10 }}
      py={4}
      justify="space-between"
      rounded="lg"
      _dark={{
        bg: "whiteAlpha.200",
      }}
      bg="gray.800"
    >
      <Button onClick={() => completeTodo()} colorScheme="green">
        <Icon as={CheckCircleIcon} />
      </Button>

      {isEditing ? (
        <FormControl id="todo">
          <Input
            value={todoInput}
            onChange={(e) => {
              e.preventDefault();
              setTodoInput(e.target.value);
            }}
            color="white"
          />
        </FormControl>
      ) : (
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color={todo.isCompleted ? "green.500" : "white"}
          textDecoration={todo.isCompleted ? "line-through" : "none"}
        >
          {todo.text}
        </Text>
      )}

      {isEditing ? (
        <Button onClick={() => editTodo()}>Done</Button>
      ) : (
        <Flex gap={2}>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Icon as={EditIcon} />
          </Button>

          <Button onClick={() => deleteTodo()} colorScheme="red">
            <Icon as={DeleteIcon} />
          </Button>
        </Flex>
      )}
    </HStack>
  );
};
