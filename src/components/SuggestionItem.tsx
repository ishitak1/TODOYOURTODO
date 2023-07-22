import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import type { FC } from "react";
import { useRecoilState } from "recoil";
import { suggestionState } from "../recoil/suggestions";
import { todoState } from "../recoil/todos";

interface SuggestionItemProps {
  text: string;
}

export const SuggestionItem: FC<SuggestionItemProps> = ({ text }) => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [suggestions, setSuggestions] = useRecoilState(suggestionState);

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
      <Button
        colorScheme="red"
        onClick={() => {
          setSuggestions(
            suggestions.filter((suggestion) => suggestion !== text)
          );
        }}
      >
        <Icon as={CloseIcon} />
      </Button>

      <Text color="white" fontSize={{ base: "lg", md: "xl" }}>
        {text}
      </Text>

      <Button
        colorScheme="green"
        onClick={() => {
          setTodos([
            ...todos,
            {
              text,
              isCompleted: false,
            },
          ]);
          setSuggestions(
            suggestions.filter((suggestion) => suggestion !== text)
          );
        }}
      >
        <Icon as={CheckCircleIcon} />
      </Button>
    </HStack>
  );
};
