interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className, onClick }: Props) => (
  <div
    className={
      "group bg-blue-gray-dark dark:bg-blue-gray-light flex w-64 shrink-0 snap-center flex-col items-center gap-4 rounded-2xl p-4 text-white shadow-md dark:text-black " +
      className
    }
    onClick={onClick}
  >
    {children}
  </div>
);
