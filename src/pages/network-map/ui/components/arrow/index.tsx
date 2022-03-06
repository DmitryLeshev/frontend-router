import React, { useRef } from "react";
import { makeStyles, createStyles } from "@material-ui/core";

import { Stage, Layer, Circle, Shape } from "react-konva";
import { ITheme } from "shared/ui/theme/theme";
import clsx from "clsx";

type ArrowProps = {
  isSelected: boolean;
  points: [DOMRect | null, DOMRect | null];
};

const Arrow: React.FC<ArrowProps> = ({ isSelected, points }) => {
  const classes = useStyles();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const offset = 12;

  let firstCenter: { x: number; y: number } | null = null;
  let secondCenter: { x: number; y: number } | null = null;

  const [firstEl, secondEl] = points;

  if (firstEl && secondEl) {
    firstCenter = {
      x: firstEl.x + firstEl.width / 2 ?? 0,
      y: firstEl.y + firstEl.height / 2 ?? 0,
    };
    secondCenter = {
      x: secondEl.x + secondEl.width / 2 ?? 0,
      y: secondEl.y + secondEl.height / 2 ?? 0,
    };
  }

  return (
    <div
      ref={wrapperRef}
      className={clsx(classes.wrapper, { [classes.isSelected]: isSelected })}
    >
      <Stage
        width={wrapperRef.current?.clientWidth}
        height={wrapperRef.current?.clientHeight}
      >
        <Layer>
          {/* {firstCenter && (
            <Circle
              x={firstCenter.x}
              y={firstCenter.y}
              stroke="red"
              radius={5}
            />
          )}
          {secondCenter && (
            <Circle
              x={secondCenter.x}
              y={secondCenter.y}
              stroke="red"
              radius={5}
            />
          )} */}
          {firstCenter && secondCenter && (
            <Shape
              sceneFunc={(context, shape) => {
                if (!firstCenter || !firstEl || !secondCenter || !secondEl)
                  return;
                context.beginPath();
                context.moveTo(
                  firstCenter.x - offset - firstEl.width / 2,
                  firstCenter.y
                );
                context.lineTo(wrapperRef.current?.clientHeight, firstCenter.y);
                context.closePath();

                context.moveTo(wrapperRef.current?.clientHeight, firstCenter.y);
                context.lineTo(
                  wrapperRef.current?.clientHeight,
                  secondCenter.y
                );
                context.closePath();
                context.moveTo(
                  wrapperRef.current?.clientHeight,
                  secondCenter.y
                );
                context.lineTo(
                  secondCenter.x + offset + secondEl.width / 2,
                  secondCenter.y
                );
                context.closePath();
                // context.moveTo(
                //   firstCenter.x - offset - firstEl.width / 2,
                //   secondCenter.y
                // );
                // context.lineTo(
                //   secondCenter.x + offset + firstEl.width / 2,
                //   secondCenter.y
                // );
                // context.quadraticCurveTo(
                //   random(1, 250),
                //   random(1, 250),
                //   random(1, wrapperRef.current?.clientWidth ?? 100),
                //   random(1, wrapperRef.current?.clientHeight ?? 100)
                // );
                // (!) Konva specific method, it is very important
                context.fillStrokeShape(shape);
              }}
              fill="#00D2FF"
              stroke="white"
              strokeWidth={4}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    wrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    isSelected: {},
  })
);

export { Arrow };
