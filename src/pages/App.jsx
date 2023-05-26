import "../styles/App.css";
import usePodcast from "../hooks/usePodcast";
import { useEffect, useState } from "react";
import Card from "../components/Card/card";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const { GetPodcastList, podcastListState } = usePodcast();

  const [search, setSearch] = useState("");

  const [podcastFound, setPodcastFound] = useState();

  const searchFilter = (search) => {
    let res = podcastListState.data.feed.entry.filter(
      (el) =>
        el["im:name"].label.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        el["im:artist"].label.toLowerCase().indexOf(search.toLowerCase()) >= 0
    );
    setPodcastFound(res.length);
    return res;
  };

  const RenderList = ({ search }) => {
    return searchFilter(search).map((el, i) => (
      <Card
        key={i}
        name={el["im:name"].label}
        author={el["im:artist"].label}
        src={el["im:image"][0].label}
        onClick={() => {
          navigate(`/podcast/${el.id.attributes["im:id"]}`);
        }}
      />
    ));
  };

  useEffect(() => {
    GetPodcastList();
  }, []);

  return (
    <div className="App">
      <div>
        <div className="input-container">
          <p className="podcastfound">{podcastFound}</p>
          <input
            className="searcher"
            type="text"
            placeholder="Find podcast..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="container">
          <div className="list">
            {podcastListState.data ? <RenderList search={search} /> : "Loading"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
