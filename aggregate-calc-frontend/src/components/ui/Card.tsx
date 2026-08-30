import "./Card.css";

type CardProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

function Card({
  title,
  icon,
  children,
}: CardProps) {
  return (
    <section className="card">
      <div className="card-header">

  <span className="card-icon">
    {icon}
  </span>

  <h2 className="card-title">
    {title}
  </h2>

</div>

      <div className="card-content">
        {children}
      </div>
    </section>
  );
}

export default Card;