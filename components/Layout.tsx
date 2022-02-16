interface Props {
  children: React.ReactNode;
  className?: string;
}
export const Layout = ({ children, className }: Props): JSX.Element => (
  <>
    <div
      className={
        "dark:bg-blue-gray-dark flex min-h-screen w-screen flex-col items-center justify-center bg-gray-100 text-gray-800 dark:text-white " +
        className
      }
    >
      {children}
    </div>
  </>
);
