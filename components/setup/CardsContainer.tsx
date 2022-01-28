interface Props {
  children: React.ReactNode;
}

export const CardsContainer = ({ children }: Props) => (
  <section className="container mb-4 flex w-full snap-x gap-4 overflow-x-auto px-8 pb-4">
    {children}
  </section>
);
