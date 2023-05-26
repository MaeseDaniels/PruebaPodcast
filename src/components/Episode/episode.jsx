const Episode = ({ episode }) => {
  return (
    <div>
      <h3>{episode.trackName}</h3>
      <p>{episode.description}</p>
      <audio src={episode.previewUrl} controls />
    </div>
  );
};

export default Episode;
