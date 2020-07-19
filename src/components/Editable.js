import React, { useState } from "react";
import Latex from "react-latex";

export default function Editable({
  text,
  type,
  placeholder,
  children,
  ...props
}) {
  const [isEditing, setEditing] = useState(false);

  //event handler for pressing any key while editing
  const handleKeyDown = (event, type) => {
    //handle on key press
  };
  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div onDoubleClick={() => setEditing(true)}>
          <Latex>{String.raw`${
            text
          }`}</Latex>
        </div>
      )}
    </section>
  );
}
