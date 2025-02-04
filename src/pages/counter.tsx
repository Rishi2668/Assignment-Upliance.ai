
import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const updateCount = (operation: "increment" | "decrement" | "reset") => {
    setCount((prevCount) => {
      switch (operation) {
        case "increment":
          return prevCount + 1;
        case "decrement":
          return Math.max(0, prevCount - 1);
        case "reset":
          return 0;
        default:
          return prevCount;
      }
    });
  };


  const springProps = useSpring({
    background: `linear-gradient(to right, rgb(94, 233, 48) ${count * 2}%, rgb(21, 189, 235) ${count * 2}%)`,
    config: { duration: 600 },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <animated.div
        style={{
          ...springProps,
          height: "70%",
          width: "70%",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" component="h2" gutterBottom>
          {count}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Counter
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => updateCount("increment")}>
            Increment
          </Button>
          <Button variant="contained" color="secondary" onClick={() => updateCount("reset")}>
            Reset
          </Button>
          <Button variant="contained" color="error" onClick={() => updateCount("decrement")}>
            Decrement
          </Button>
        </Box>
      </animated.div>
    </Box>
  );
};

export default Counter;

