import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';


function createWrapperAndAppendToBody(wrapperId) {
  if (!document) return null
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

function ReactPortal({ children, wrapperId = "react-portal-wrapper" }) {
  const [wrapperElement, setWrapperElement] = useState(null);

  // tries to set element to the div which probably does not exist so then creates the div and saves it to the state variable.
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    // We need to know if we created the div, we don't want to remove a div that was already there.
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element (effect cleanup)
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }, [wrapperId]); // the wrapperId may change in props so would need the effect to update if this were to happen.

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal