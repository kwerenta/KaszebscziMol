interface Props {
  children: React.ReactNode;
}
export const Layout = ({ children }: Props): JSX.Element => (
  <>
    <main className="dark:bg-blue-gray-dark flex min-h-screen w-screen items-center justify-center bg-gray-100 text-gray-800 dark:text-white">
      {children}
    </main>
  </>
);
