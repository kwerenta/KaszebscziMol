import { Backdrop } from "./Backdrop";

export interface ModalProps {
  children: React.ReactNode;
  handleClose?: () => void;
  show: boolean;
}
export const Modal = ({ children, show, handleClose }: ModalProps) => {
  if (!show) return null;
  return <Backdrop handleClose={handleClose}>{children}</Backdrop>;
};
