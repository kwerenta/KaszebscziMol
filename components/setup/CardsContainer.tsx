interface Props {
  children: React.ReactNode;
}

export const CardsContainer = ({ children }: Props) => (
  <section className="container flex flex-wrap justify-center gap-4">
    {children}
  </section>
);
