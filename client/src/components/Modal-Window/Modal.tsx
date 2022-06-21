import React, { FC } from "react"

interface Props {
  isOpen: boolean
}

const Modal: FC<Props> = ({ isOpen, children }) => (
  <div className={`modal ${isOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
    {children}
  </div>
)

export default Modal
