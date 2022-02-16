interface Props {
  children: React.ReactNode;
}

export const CardsContainer = ({ children }: Props) => (
  <div>
    <section className="container mb-4 flex snap-x gap-4 overflow-x-auto px-8 pb-4">
      {children}
    </section>
  </div>
);
