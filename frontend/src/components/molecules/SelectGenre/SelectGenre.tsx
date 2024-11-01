import React from "react";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { TextInput } from "../TextInput/TextInput";

type SelectGenreProps = {
  className?: string;
};

export const SelectGenre = () => {
  return (
    <div className=" pl-6 pt-6 ">
      <p className="text-xl pb-6">Genre</p>
      <TextInput className="w-36"></TextInput>
      <Checkbox labelText="horror" />
      <Checkbox labelText="comedy" />
      <Checkbox labelText="action" />
      <Checkbox labelText="drama" />
      <Checkbox labelText="thriller" />
      <Checkbox labelText="romance" />
    </div>
  );
};
