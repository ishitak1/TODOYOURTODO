import {
  Button,
  chakra,
  Heading,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { SuggestionItem } from "../components/SuggestionItem";
import { TodoItem } from "../components/TodoItem";
import { suggestionState } from "../recoil/suggestions";
import { todoInputState } from "../recoil/todoInput";
import { todoState } from "../recoil/todos";

const Index = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [todoInput, setTodoInput] = useRecoilState(todoInputState);
  const [suggestions, setSuggestions] = useRecoilState(suggestionState);
  const [loading, setLoading] = useState(false);

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        text: todoInput,
        isCompleted: false,
      },
    ]);
    setTodoInput("");
  };

  const generateMoreTodos = async () => {
    setLoading(true);
    const response = await axios.post("/api/generateTodos", {
      todos,
    });

    const newSuggestions = response.data.data
      .split("\n")
      .filter((s) => s.length > 0)
      .map((s) => s.substring(1));

    setSuggestions(newSuggestions);
    setLoading(false);
  };

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Container minH="100vh">
      <Header />

      <chakra.form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
        display="flex"
        alignItems="center"
        w={{ md: "full" }}
        maxW="3xl"
        mt={{ base: 5, md: 20 }}
        alignSelf="self-start"
        gap={6}
        px={{ base: 4, md: 20 }}
      >
        <Input
          value={todoInput}
          onChange={(e) => {
            e.preventDefault();
            setTodoInput(e.target.value);
          }}
          bg="white"
          placeholder="Enter a todo"
          size="lg"
          w="full"
          textTransform="capitalize"
          textColor="black"
          _placeholder={{
            color: "gray.500",
          }}
          _focus={{
            outline: "none",
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTodo();
            }
          }}
        />

        <Button
          disabled={todoInput.length === 0}
          bg="green.400"
          color="white"
          px={8}
          h={12}
          _hover={{
            bg: "green.500",
          }}
          _active={{
            bg: "green.600",
          }}
          _focus={{
            outline: "none",
          }}
          type="submit"
        >
          Add Todo
        </Button>
      </chakra.form>

      <VStack spacing={4} mt={20} w="full" px={{ base: 4, md: 20 }}>
        {todos.map((todo, index) => (
          <TodoItem todo={todo} index={index} key={index} />
        ))}
      </VStack>

      {todos.length > 0 && (
        <>
          <Button onClick={() => generateMoreTodos()} mt={6}>
            Generate more todos
          </Button>

          <Heading size="lg" mt={10}>
            Suggestions
          </Heading>

          {loading && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="green.500"
              size="xl"
              mt={4}
            />
          )}

          {suggestions.length === 0 ? (
            <>
              {!loading && (
                <Heading size="md" mt={4}>
                  No suggestions yet
                </Heading>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setTodos([
                    ...todos,
                    ...suggestions.map((suggestion) => ({
                      text: suggestion,
                      isCompleted: false,
                    })),
                  ]);
                  setSuggestions([]);
                }}
                mt={4}
              >
                Use all suggestions
              </Button>

              <Button onClick={() => setSuggestions([])} mt={4}>
                Clear suggestions
              </Button>
            </>
          )}

          <VStack spacing={4} mt={20} w="full" px={{ base: 4, md: 20 }}>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem text={suggestion} key={index} />
            ))}
          </VStack>
        </>
      )}
    </Container>
  );
};

export default Index;
