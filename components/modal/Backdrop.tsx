interface Props {
  children: React.ReactNode;
  handleClose?: () => void;
}

export const Backdrop = ({ children, handleClose }: Props) => (
  <div
    onClick={handleClose}
    className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-20 bg-clip-padding backdrop-blur-[2px]"
  >
    {children}
  </div>
);
