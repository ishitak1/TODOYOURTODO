import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const Pomodoro = () => {
  const [time, setTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [sec, setSec] = useState(0);
  const [start, setStart] = useState(null);
  const id = useRef(null);
  function decFun() {
    time - 5 < 0 ? alertOption() : setTime((prevCount) => prevCount - 5);
  }

  const times = [
    { color: "blue", time: 1 },
    { color: "yellow", time: 15 },
    { color: "orange", time: 25 },
    { color: "pink", time: 35 },
  ];

  function alertOption() {
    setTime(0);
    setSeconds(0);
    alert("Timer cannot be less than 00:00 Min!");
  }

  useEffect(() => {
    document.title = `${time < 10 ? "0" + time : time} : ${
      seconds < 10 ? "0" + seconds : seconds - 1
    } - Pomodoro Timer`;
  }, [sec]);

  useEffect(() => {
    if (start) {
      startTimer();
    } else if (!start) {
      setStart(null);
      stopTimer();
    }
  }, [start]);

  const startTimer = () => {
    let interval = setInterval(() => {
      setSec((prev) => prev + 1);
    }, 1000);
    id.current = interval;
  };
  useEffect(() => {
    if (sec != 0 && start) {
      if (seconds == 0 && time == 0) {
        alert("Timer is up!");
        stopTimer();
        setStart(false);
      } else if (seconds == 0) {
        setSeconds(59);
        setTime((time) => time - 1);
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }
  }, [sec]);

  const stopTimer = () => {
    setSeconds(0);
    setTime(0);
    clearInterval(id.current);
  };

  return (
    <VStack pt={24}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={12}
      >
        <Box>
          <IconButton
            aria-label="Minus-Icon"
            icon={<MinusIcon />}
            size="md"
            onClick={() => {
              decFun();
            }}
          />
        </Box>
        <Box>{time < 10 ? "0" + time : time}</Box>
        <Box>:</Box>
        <Box>{seconds < 10 ? "0" + seconds : seconds}</Box>

        <Box>
          <IconButton
            aria-label="Add-Icon"
            icon={<AddIcon />}
            size="md"
            onClick={() => {
              setTime((prevCount) => prevCount + 5);
            }}
          />
        </Box>
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={[4, null, 12]}
        mt={{ base: "8 !important", md: 4 }}
      >
        {times.map((item) => (
          <Button
            size="md"
            colorScheme={item.color}
            variant="outline"
            onClick={() => {
              setTime(item.time);
            }}
          >
            {item.time} min
          </Button>
        ))}
      </Stack>
      <Center>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => {
            setStart((prev) => !prev);
          }}
          mt={{ base: "8 !important", md: 4 }}
          disabled={time == 0 && seconds == 0}
        >
          {start ? "Stop" : "Start"}
        </Button>
      </Center>
    </VStack>
  );
};

export default Pomodoro;
