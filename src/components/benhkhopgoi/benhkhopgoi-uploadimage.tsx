import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import ImageUpload from "../image/uploadimage.png";
import Dropzone from "react-dropzone";
import benhkhopgoiService from "@services/benhkhopgoiService";
import "../../styles/button.module.scss";
import ZoomImage from "./benhkhopgoi-zoomimage";
import { IconButton, Tooltip } from "@mui/material";
import { RotateLeft, RotateRight } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

export const BenhKhopGoiUploadImage = (props) => {
  const [dataModel, setDataModel] = useState(null);

  async function loadModelBenh() {
    const response = await benhkhopgoiService.postLoadModelKhopGoi();
    setDataModel(response);
  }
  if (!dataModel) loadModelBenh();

  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [twoimage, setTwoImage] = useState(null);
  const [clickImage, setClickImage] = useState(1);
  const [resultModel, setResultModel] = useState(null);

  const [urlimg, setURL] = useState(null);
  const [errors, setErrors] = useState("");
  const [values, setValues] = useState({
    sex: "nam",
    age: " ",
    category: "x4",
  });
  const checkAllFields = () => {
    for (const key in values) {
      if (values.hasOwnProperty(key) && values[key].trim() === "") {
        return false;
      }
    }
    if (!file) {
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    let newErrors = "";
    if (
      event.target.name === "age" &&
      (isNaN(event.target.value) || event.target.value < 0 || event.target.value > 150)
    ) {
      newErrors = "Tuổi không hợp lệ";
    }

    setErrors(newErrors);
  };

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 3000);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    try {
      props.handleImageChange(null);

      const datasend = {
        image: file,
        // datainfor: values,
      };
      const datares: any = await benhkhopgoiService.postChuandoanKhopGoi(datasend);

      if (!isClicked) {
        {
          datares ? setIsClicked(false) : setIsClicked(true);
        }
      }
      props.handleImageChange(datares);
      if (datares) {
        setResultModel(datares);
      }
    } catch (error) {}
  };

  const [swapImages, setSwapImages] = useState(false);

  const handleClickSwap = () => {
    setSwapImages(!swapImages);
  };

  const [rotation, setRotation] = useState(0);

  const handleRotateLeft = () => {
    setRotation((rotation - 90) % 360);
  };

  const handleRotateRight = () => {
    setRotation((rotation + 90) % 360);
  };

  useEffect(() => {
    if (!resultModel) {
      setTwoImage(null);
      setClickImage(1);
      return;
    }

    setTwoImage(resultModel.image1);
    setClickImage(1);
  }, [resultModel]);
  const handleClickChangeTwoImage2 = () => {
    twoimage
      ? clickImage == 1
        ? (setTwoImage(resultModel.image2), setClickImage(2))
        : (setTwoImage(resultModel.image1), setClickImage(1))
      : "";
  };
  const handleDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0].type.startsWith("image/")) {
      const newFile = acceptedFiles[0];
      setURL(URL.createObjectURL(acceptedFiles[0]));
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile(reader.result); // Store the data URL in state
      };

      reader.readAsDataURL(newFile);
    }
  }, []);

  const handleRemove = useCallback(() => {
    URL.revokeObjectURL(urlimg);
    setURL(null);
    setFile(null);
    setIsClicked(null);
    setTwoImage(null);
    setClickImage(1);
    setResultModel(null);
    setSwapImages(false);
    setRotation(0);

    props.handleImageChange(null);
  }, []);

  return (
    <Card
      {...props}
      sx={{
        height: "auto",
        width: "100%",
        marginTop: "-28px",
        // backgroundColor:'#e9ecef'
      }}
    >
      <CardContent>
        <div
          style={{
            border: urlimg ? "0px dashed #25A1E7" : "3px dashed #25A1E7",
            borderRadius: "10px",
            height: " 100%",
            width: " 100%",
          }}
        >
          {!file ? (
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    aspectRatio: "1/1",
                    width: "100%",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      height: " 100%",
                    }}
                  >
                    <Avatar
                      src={ImageUpload.src}
                      sx={{
                        height: 64,
                        width: 64,
                        margin: "0 auto ",
                      }}
                    />
                    <p style={{ margin: "0 auto" }}>Kéo thả hoặc nhấp để tải lên ảnh</p>
                  </div>
                </div>
              )}
            </Dropzone>
          ) : (
            <div
              style={{
                height: " 100%",
                width: " 100%",
              }}
            >
              {resultModel ? (
                resultModel.result1 === "NONE" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: " 100%",
                      aspectRatio: "1/1",
                      color: "fff",
                      border: "3px dashed #25A1E7",
                      backgroundColor: "rgb(96,91,91)",
                      fontSize: "20px",
                    }}
                  >
                    <p style={{ margin: "0 auto" }}>No results found. Please try another image</p>
                  </div>
                ) : resultModel.result2 === "NONE" ? (
                  <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    <ZoomImage
                      width="100%"
                      height="100%"
                      src={swapImages ? urlimg : resultModel.image1}
                      rotate={rotation}
                      handleRemove={handleRemove}
                    />

                    <img
                      style={{
                        width: "15%",
                        aspectRatio: "1/1",
                        position: "absolute",
                        bottom: 30,
                        left: 30,
                        border: "2px solid #fff",
                        borderRadius: "5px",
                      }}
                      src={swapImages ? resultModel.image1 : urlimg}
                      alt=""
                      onClick={handleClickSwap}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(234, 234, 234, 0.5)",
                        padding: "5px",
                        borderRadius: "5px",
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <Tooltip sx={{ marginRight: "8px", color: "#000" }} title="Rotate Left">
                        <IconButton onClick={handleRotateLeft}>
                          <RotateLeft />
                        </IconButton>
                      </Tooltip>

                      <Tooltip sx={{ color: "#000" }} title="Rotate Right">
                        <IconButton onClick={handleRotateRight}>
                          <RotateRight />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                ) : (
                  <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    <ZoomImage
                      width="100%"
                      height="100%"
                      src={swapImages ? urlimg : twoimage ? twoimage : resultModel.image1}
                      rotate={rotation}
                      handleRemove={handleRemove}
                    />

                    <img
                      style={{
                        width: "15%",
                        aspectRatio: "1/1",
                        position: "absolute",
                        bottom: 30,
                        left: 30,
                        border: "2px solid #fff",
                        borderRadius: "5px",
                      }}
                      src={!swapImages ? urlimg : twoimage ? twoimage : resultModel.image1}
                      alt=""
                      onClick={handleClickSwap}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(234, 234, 234, 0.5)",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "2px solid #000",
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <Tooltip sx={{ marginRight: "8px", color: "#fff" }} title="Rotate Left">
                        <IconButton onClick={handleRotateLeft}>
                          <RotateLeft />
                        </IconButton>
                      </Tooltip>

                      <Tooltip sx={{ marginLeft: "4px", color: "#fff" }} title="Rotate Right">
                        <IconButton onClick={handleRotateRight}>
                          <RotateRight />
                        </IconButton>
                      </Tooltip>
                    </div>
                    {!swapImages && (
                      <Button
                        sx={{
                          backgroundColor: "#01B29D",
                          color: "black",
                          position: "absolute",
                          bottom: "0px",
                          right: "0px",
                        }}
                        onClick={handleClickChangeTwoImage2}
                      >
                        <p style={{}}>&gt;&gt;</p>
                      </Button>
                    )}
                  </div>
                )
              ) : (
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                  <img
                    style={{ width: "100%", aspectRatio: "1/1" }}
                    src={urlimg}
                    alt="Uploaded image"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <Divider />

      <CardActions>
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Grid item md={6} xs={12}>
            {file ? (
              <Button
                sx={{ backgroundColor: "#25A1E7" }}
                variant="contained"
                size="medium"
                fullWidth
                disabled={isClicked}
                onClick={onSubmit}
              >
                Chẩn đoán
              </Button>
            ) : (
              <Button
                disabled
                color="primary"
                variant="contained"
                size="medium"
                fullWidth
                onClick={onSubmit}
              >
                Chẩn đoán
              </Button>
            )}
          </Grid>
          {file && (
            <Grid item md={6} xs={12}>
              <Button
                // color="primary"
                sx={{ backgroundColor: "#032B91" }}
                variant="contained"
                size="medium"
                fullWidth
                onClick={handleRemove}
              >
                Xóa hình ảnh
              </Button>
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
};
