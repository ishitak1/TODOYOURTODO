import { Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const Header: FC = () => {
  const router = useRouter();
  return (
    <HStack
      as="header"
      p={4}
      spacing={4}
      w="full"
      align="center"
      justify="space-between"
    >
      {/* <Text fontSize="2xl" fontWeight="bold">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text> */}

      {router.pathname === "/pomodoro" ? (
        <Link href="/">
          <Text mr={10} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
            Todo
          </Text>
        </Link>
      ) : (
        <Link href="/pomodoro">
          <Text mr={10} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
            Pomodoro
          </Text>
        </Link>
      )}

      <DarkModeSwitch />
    </HStack>
  );
};
