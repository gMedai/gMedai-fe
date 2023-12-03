import { useRouter } from "next/router";
import { useState } from "react";
import { LoginQR } from "./login-qr";
import { Box, Typography } from "@mui/material";
import { LoginWating } from "./login-wating";

export const LoginModal = () => {
  const [isSendRequest, setIsSendRequest] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return !isSendRequest ? (
    <LoginQR setIsSendRequest={setIsSendRequest} />
  ) : (
    <LoginWating setIsLogin={setIsLogin} />
  );
};
