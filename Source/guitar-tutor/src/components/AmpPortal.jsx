import React, { useEffect, useCallback, useMemo, useState } from "react";
import { render, createPortal } from "react-dom";

const AmpPortal = () => {
  const [isOpen, setOpenState] = useState(false);
  const open = useCallback(() => setOpenState(true));
  const close = useCallback(() => setOpenState(false));

  return (
    <div>
      <h1>Portals in React</h1>
      <button onClick={open}>Open</button>
      <button onClick={close}>Close</button>
      {isOpen && (
        <NewWindow close={close}>
          Example <button onClick={close}>Close</button>
        </NewWindow>
      )}
    </div>
  );
};

const NewWindow = ({ children, close }) => {
  const newWindow = useMemo(() =>
    window.open(
      "about:blank",
      "newWin",
      `width=400,height=300,left=${window.screen.availWidth / 2 - 200},top=${
        window.screen.availHeight / 2 - 150
      }`
    )
  );
  newWindow.onbeforeunload = () => {
    close();
  };
  useEffect(() => () => newWindow.close());
  return createPortal(children, newWindow.document.body);
};

render(<AmpPortal />, document.getElementById("root"));
