"use client";
import Card from "./Card";

interface CardData {
  headline: string;
  headlineHref?: string;
  copyText: string;
  logoSrc: string;
  logoAlt: string;
}

interface CardsSectionProps {
  cardsData: CardData[];
}

function CardsSection({ cardsData }: CardsSectionProps) {
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            headline={card.headline}
            headlineHref={card.headlineHref}
            copyText={card.copyText}
            logoSrc={card.logoSrc}
            logoAlt={card.logoAlt}
            delay={index * 0.2} // Stagger the animation
          />
        ))}
      </div>
    </section>
  );
}

export default CardsSection;
