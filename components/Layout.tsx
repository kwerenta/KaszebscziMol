interface Props {
  children: React.ReactNode;
}
export const Layout = ({ children }: Props): JSX.Element => (
  <>
    <main className="bg-gray-100 dark:bg-blue-gray-dark text-gray-800 dark:text-white h-screen w-screen flex items-center justify-center">
      {children}
    </main>
  </>
);
