interface Props {
  children: React.ReactNode;
}

export const CardsContainer = ({ children }: Props) => (
  <section className="container w-full overflow-x-auto snap-x flex gap-4 mb-4 pb-4 px-8">
    {children}
  </section>
);
