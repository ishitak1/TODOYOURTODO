import { Container, Box, Divider, Heading, Center } from "@chakra-ui/react";
import { Header } from "../components/Header";
import Pomodoro from "../components/Pomodoro";

export default function pomodoro() {
  return (
    <Container minH="100vh">
      <Header />

      <Box marginTop={8}>
        <Heading size="lg">Pomodoro Timer 🍅</Heading>
        <Divider paddingTop="20px" />
        <Center>
          <Pomodoro />
        </Center>
      </Box>
    </Container>
  );
}
