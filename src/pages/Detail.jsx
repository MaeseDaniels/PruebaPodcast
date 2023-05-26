import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import usePodcast from "../hooks/usePodcast";
import SideBar from "../components/SideBar/sideBar";
import "../styles/Detail.css";
import EpisodeList from "../components/EpisodeList/episodeList";
import Episode from "../components/Episode/episode";

const Detail = () => {
  const { podcastId, episode } = useParams();
  const navigate = useNavigate();
  const {
    GetPodcastDetail,
    podcastDetailState,
    GetPodcastList,
    podcastListState,
  } = usePodcast();

  const RenderInfo = () => {
    let res = <></>;
    if (episode) {
      res = podcastDetailState.data ? (
        <Episode
          episode={podcastDetailState.data.results.find(
            (el) => el.trackId == episode
          )}
        />
      ) : (
        <></>
      );
    } else {
      res = podcastDetailState.data ? (
        <EpisodeList episodes={podcastDetailState.data} />
      ) : (
        <></>
      );
    }
    return res;
  };

  useEffect(() => {
    if (podcastId && !podcastDetailState.isLoading) {
      GetPodcastList();
      GetPodcastDetail(podcastId);
    }
  }, [podcastId]);

  return (
    <div className="container">
      <div className="parent">
        <div className="sidebar-container">
          <div className="back-button">
            <button type="button" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
          {podcastListState.isSuccess ? (
            <SideBar
              podcastInfo={podcastListState.data.feed.entry.find((el) => {
                return el.id.attributes["im:id"] == podcastId;
              })}
            />
          ) : null}
        </div>
        <RenderInfo />
      </div>
    </div>
  );
};

export default Detail;
