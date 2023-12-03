import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import RotateRightIcon from "@mui/icons-material/RotateRight";

export interface LoginProps {
  setIsLogin: (x: boolean) => void;
}

export function LoginWating(props: LoginProps) {
  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#fff",
        borderRadius: 1,
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        Wating for you ...
      </Typography>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "404px",
          height: "404px",
        }}
      >
        <CircularProgress size={200} />
      </Stack>
    </Box>
  );
}
