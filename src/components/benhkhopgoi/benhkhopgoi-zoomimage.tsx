import { tr } from "date-fns/locale";
import { useState } from "react";
import React, { CSSProperties } from "react";
import { Button } from "@mui/material";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchProps,
  useControls,
} from "react-zoom-pan-pinch";

interface CustomTransformWrapperProps extends ReactZoomPanPinchProps {
  wrapperStyle?: CSSProperties;
}

const css = `
.react-transform-component {
  width: 100%;
  height: 100%;
}
.aaaaa {
  background: yellow;
  width: 10px;
}

`;

const CustomTransformWrapper: React.FC<CustomTransformWrapperProps> = ({
  wrapperStyle,
  ...rest
}) => {
  return (
    <div style={{ width: "100%", height: "100%", ...wrapperStyle }}>
      <TransformWrapper {...rest} />
    </div>
  );
};

function ZoomImage({
  src,
  width,
  height,
  rotate,
  magnifierHeight = 100,
  magnifieWidth = 100,
  zoomLevel = 1.5,
  handleRemove,
}) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <style>{css}</style>
      <CustomTransformWrapper wrapperStyle={{ width: "100%", height: "100%" }}>
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={src}
            style={{
              background: "yellow",
              width: "100%",
              aspectRatio: "1/1",
              transform: `rotate(${rotate}deg)`,
            }}
            alt="test"
          />
        </TransformComponent>
      </CustomTransformWrapper>
    </div>
  );
}

export default ZoomImage;
