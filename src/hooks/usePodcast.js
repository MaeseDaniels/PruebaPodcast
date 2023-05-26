import { useState } from "react";
import { compRefresh } from "../utils/functions";
import {
  DAYS_TO_REFRESH_PODCASTLIST,
  LOCAL_ITEM__LIST,
} from "../utils/constants";

const usePodcast = () => {
  const [podcastListState, setPodcastListState] = useState({
    isLoading: false,
    isSuccess: false,
  });

  const [podcastDetailState, setPodcastDetailState] = useState({
    isLoading: false,
    isSuccess: false,
  });

  const GetPodcastList = () => {
    if (
      compRefresh(
        LOCAL_ITEM__LIST.podcastList,
        LOCAL_ITEM__LIST.podcastListDate,
        DAYS_TO_REFRESH_PODCASTLIST
      )
    ) {
      setPodcastListState({
        isLoading: false,
        isSuccess: true,
        data: JSON.parse(localStorage.getItem(LOCAL_ITEM__LIST.podcastList)),
      });
    } else {
      setPodcastListState({ isLoading: true, isSuccess: false });

      fetch(
        `https://api.allorigins.win/raw?url=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
      )
        .then((response) => {
          if (response.ok) return response.json();
        })
        .then((data) => {
          localStorage.setItem(
            LOCAL_ITEM__LIST.podcastList,
            JSON.stringify(data)
          );
          localStorage.setItem(
            LOCAL_ITEM__LIST.podcastListDate,
            new Date().getTime().toString()
          );
          setPodcastListState({
            isLoading: false,
            isSuccess: true,
            data: data,
          });
        })
        .catch((err) => {
          setPodcastListState({ isLoading: false, isSuccess: false });
        });
    }
  };

  const GetPodcastDetail = (id) => {
    const podcastDetailKey = `${LOCAL_ITEM__LIST.podcastDetail}__${id}`;
    const podcastDetailDateKey = `${LOCAL_ITEM__LIST.podcastDetailDate}__${id}`;

    if (
      compRefresh(
        podcastDetailKey,
        podcastDetailDateKey,
        DAYS_TO_REFRESH_PODCASTLIST
      )
    ) {
      setPodcastDetailState({
        isLoading: false,
        isSuccess: true,
        data: JSON.parse(localStorage.getItem(podcastDetailKey)),
      });
    } else {
      setPodcastDetailState({ isLoading: true, isSuccess: false });

      fetch(
        `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
      )
        .then((response) => {
          if (response.ok) return response.json();
        })
        .then((data) => {
          localStorage.setItem(podcastDetailKey, JSON.stringify(data));
          localStorage.setItem(
            podcastDetailDateKey,
            new Date().getTime().toString()
          );
          setPodcastDetailState({
            isLoading: false,
            isSuccess: true,
            data: data,
          });
        })
        .catch((err) => {
          setPodcastDetailState({ isLoading: false, isSuccess: false });
        });
    }
  };

  return {
    podcastListState: podcastListState,
    podcastDetailState: podcastDetailState,
    GetPodcastList: GetPodcastList,
    GetPodcastDetail: GetPodcastDetail,
  };
};

export default usePodcast;
