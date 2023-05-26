import { useLocation, useNavigate } from "react-router";
import { formatTableDate, millisToMInSecFormat } from "../../utils/functions";
import "./styles.css";

const EpisodeList = ({ episodes }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <div>
        <h2>Episodes: {episodes.resultCount}</h2>
      </div>
      <div>
        {episodes && (
          <table className="episode-list">
            <thead>
              <tr>
                <td>Title</td>
                <td>Date</td>
                <td>Duration</td>
              </tr>
            </thead>
            <tbody>
              {episodes.results?.map((el, index) =>
                index > 0 ? (
                  <tr key={index}>
                    <td
                      key={`td1${index}`}
                      className="episode-list__title"
                      onClick={() => {
                        navigate(`${location.pathname}/episode/${el.trackId}`);
                      }}
                    >
                      {el.trackName}
                    </td>
                    <td key={`td2${index}`}>
                      {formatTableDate(el.releaseDate)}
                    </td>
                    <td key={`td3${index}`}>
                      {millisToMInSecFormat(el.trackTimeMillis)}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EpisodeList;
