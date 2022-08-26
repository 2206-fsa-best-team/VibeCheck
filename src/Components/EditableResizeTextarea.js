import React from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

export const EditableResizeTextarea = React.forwardRef((props, ref) => {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      resize="none"
      ref={ref}
      minRows={1}
      transition="height none"
      as={ResizeTextarea}
      {...props}
    />
  );
});
