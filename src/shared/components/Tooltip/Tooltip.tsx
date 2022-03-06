import React from "react";
import { Tooltip } from "@material-ui/core";

const abbreviationOfWord = ({ word, maxLength }: any) => {
  return word.length < maxLength ? word : `${word.slice(0, maxLength)}...`;
};

export default ({ word, maxLength, placement = "bottom", className }: any) => {
  if (!word) return "";
  if (word?.length < maxLength) return word;
  return (
    <Tooltip title={word} placement={placement}>
      <span className={className}>
        {abbreviationOfWord({ word: String(word), maxLength })}
      </span>
    </Tooltip>
  );
};
