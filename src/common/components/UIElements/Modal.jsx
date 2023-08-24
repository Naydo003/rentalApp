import React, { useEffect } from "react";
import ReactPortal from "@/common/utilities/ReactPortal";

function Modal({ children, isOpen, handleClose }) {

  // Adds event listener wjich triggers close when escape key pressed. Effect includes cleanup return to remove event listener on unmount.
  useEffect(() => {
    const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  // Disables scroll on page under modal and resets it on unmount
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null;

  return (
    <ReactPortal>
      <>
        <div className='fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50' />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-fit p-10 max-w-[800px] bg-white">
        {/* <div className="fixed rounded w-80 h-80 flex flex-col min-w-fit overflow-hidden p-5 bg-zinc-800 inset-y-32 inset-x-32"> */}
          <div>
            <button onClick={handleClose} className="">
              Close
            </button>
          </div>
          <div className="modal-content max-h-[500px] overflow-scroll">{children}</div>
        </div>
      </>
      
      
    </ReactPortal>
  );
}
export default Modal;