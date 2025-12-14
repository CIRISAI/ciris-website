"use client";
import CardImage from "./CardImage";

interface CardData {
  headline: string;
  subheadline: string;
  imageUrl?: string;
  copyText: string;
  logoSrc?: string;
  logoAlt?: string;
}

interface CardsSectionProps {
  cardsData: CardData[];
  centered?: boolean;
}

function CardsSectionImage({ cardsData, centered = false }: CardsSectionProps) {
  const gridCols = cardsData.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  const containerClass = centered || cardsData.length === 2 ? "max-w-4xl mx-auto" : "";

  return (
    <section className={`container mx-auto ${containerClass}`}>
      <div className={`grid grid-cols-1 gap-4 ${gridCols}`}>
        {cardsData.map((card, index) => (
          <CardImage
            key={index}
            headline={card.headline}
            subheadline={card.subheadline}
            imageUrl={card.imageUrl}
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

export default CardsSectionImage;
