import "./styles.css";

const SideBar = ({ podcastInfo }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__img">
        <img
          src={podcastInfo["im:image"]
            .find((e) => e.attributes.height === "170")
            .label.toString()}
          alt="img"
        />
      </div>
      <div className="sidebar__name">
        <p>
          <b>{podcastInfo["im:name"].label}</b>
        </p>
        <p>
          by <span>{podcastInfo["im:artist"].label}</span>
        </p>
      </div>
      <div className="sidebar__description">
        <p>
          <b>Description: </b>
        </p>
        <p>{podcastInfo.summary.label}</p>
      </div>
    </div>
  );
};

export default SideBar;
