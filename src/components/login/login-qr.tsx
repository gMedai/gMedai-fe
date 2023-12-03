import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as QRCode from "qrcode";
import authenService from "@services/authenService";

export interface LoginProps {
  setIsSendRequest: (x: boolean) => void;
}

export function LoginQR({ setIsSendRequest }) {
  const TIMEOUT = 5 * 60;
  const [visableQR, setVisableQR] = useState(true);
  const [invitationUrl, setInvitaitonUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //fetch invation url from web server
  useEffect(() => {
    (async () => {
      const res = await authenService.getLoginUrl();
      const { invitationUrl } = res;
      setInvitaitonUrl(invitationUrl);
    })();
  }, []);

  //generate QR Code
  useEffect(() => {
    if (!invitationUrl) return;
    const generateQrCode = () => {
      if (invitationUrl && visableQR) {
        QRCode.toCanvas(canvasRef.current, invitationUrl, function (error) {
          if (error) console.error(error);
          console.log("success!");
        });
      }
    };
    generateQrCode();
  }, [invitationUrl, visableQR]);

  //long polling
  useEffect(() => {
    if (!invitationUrl || !visableQR) return;
    const listenerEventLogin = async () => {
      console.log("requesting...");
      try {
        const res = await authenService.loginWithQRCode(TIMEOUT);
        const { message } = res.data;
        if (message === "send_proof_request") {
          setIsSendRequest(true);
        } else {
          setVisableQR(false);
        }
      } catch (err) {
        setVisableQR(false);
      }
    };
    listenerEventLogin();

    return () => {};
  }, [TIMEOUT, invitationUrl, setIsSendRequest, visableQR]);

  return invitationUrl ? (
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
        Scan the QR code with SChat to log in
      </Typography>

      <canvas ref={canvasRef}></canvas>

      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        Request will expire in 5 minutes
      </Typography>
    </Box>
  ) : (
    <></>
  );
}
