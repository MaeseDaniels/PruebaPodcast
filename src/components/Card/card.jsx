import "./styles.css";

const Card = ({ name, author, src, onClick }) => {
  return (
    <div className="card">
      <div className="card__img">
        <img src={src} alt="img" />
      </div>
      <p
        className="card__name action"
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        {name}
      </p>
      <p>{author}</p>
    </div>
  );
};

export default Card;
