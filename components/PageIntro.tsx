type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone: "gold" | "violet" | "emerald" | "rose";
};

export function PageIntro({ eyebrow, title, description, tone }: PageIntroProps) {
  return (
    <section className={`section page-intro page-intro-${tone}`}>
      <div className="container page-intro-shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
