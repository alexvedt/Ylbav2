import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Link } from "@tanstack/react-router";
import "../randomTrack/style.css";

const genres = [
  "alternative",
  "blues",
  "classical",
  "country",
  "dance",
  "disco",
  "electronic",
  "hip-hop",
  "jazz",
  "metal",
  "pop",
  "reggae",
  "rock",
  "soul",
  "techno",
  "trap",
  "world",
];

const decades = [
  "1930",
  "1940",
  "1950",
  "1960",
  "1970",
  "1980",
  "1990",
  "2000",
  "2010",
  "2020",
];

const markets = [
  "US",
  "UK",
  "DE",
  "ES",
  "FR",
  "IT",
  "JP",
  "CA",
  "AU",
  "BR",
  "IN",
  "NL",
  "PL",
  "PT",
  "RU",
  "SE",
  "TW",
  "GB",
  "MX",
  "NZ",
  "HK",
  "SG",
  "NO",
  "CH",
  "TR",
  "AR",
  "CL",
  "CO",
  "VE",
];

const SpotifyLoginComponent = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [randTrack, setRandTrack] = useState("");
  const [popInput, setPopInput] = useState("");
  const [error, setError] = useState();
  const spotifyApi = new SpotifyWebApi();

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");

    if (token) {
      setAccessToken(token);
      spotifyApi.setAccessToken(token);
    }
    handlePopularityChange({ target: { value: "12" } });
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleMarketChange = (event) => {
    console.log(event.target.value);
    setSelectedMarket(event.target.value);
    if (event.target.value === "Anywhere") {
      setSelectedMarket("");
      console.log(selectedMarket);
    }
  };

  const handlePopularityChange = (event) => {
    const popInput = event.target.value;
    let reformedPopInput;

    switch (popInput) {
      case "1":
        setPopInput("10");
        reformedPopInput = 10;
        break;
      case "2":
        setPopInput("20");
        reformedPopInput = 20;
        break;
      case "3":
        setPopInput("30");
        reformedPopInput = 30;
        break;
      case "4":
        setPopInput("40");
        reformedPopInput = 40;
        break;
      case "5":
        setPopInput("50");
        reformedPopInput = 50;
        break;
      case "6":
        setPopInput("60");
        reformedPopInput = 60;
        break;
      case "7":
        setPopInput("70");
        reformedPopInput = 70;
        break;
      case "8":
        setPopInput("80");
        reformedPopInput = 80;
        break;
      case "9":
        setPopInput("90");
        reformedPopInput = 90;
        break;
      case "10":
        setPopInput("100");
        reformedPopInput = 100;
        break;
      case "11":
        setPopInput("null");
        reformedPopInput = 100;
        break;
      case "12":
      default:
        setPopInput("100");
        break;
    }
    console.log(reformedPopInput);
    // setPopInput(event.target.value);
  };

  const fetchRandomTrack = async (event) => {
    event.preventDefault();

    try {
      const data = await spotifyApi.getRecommendations({
        seed_genres: selectedGenre,
        market: "US",
        // release_date_precision: "2020",
        max_popularity: popInput,
        limit: 1,
      });

      const randomTrack = data?.tracks[0];
      setRandTrack(randomTrack);
      console.log("Random Track:", randomTrack);

      // You can use the randomTrack data as needed (e.g., display it in the UI)
    } catch (error) {
      console.error("Error fetching random track:", error.response.message);
      setError(error);
      return (
        <div>
          <p>Error fetching random track: {error.message}</p>
        </div>
      );
    }
  };

  const renderPlaylist = (playlist) => {
    return (
      <div key={playlist.id} className="c-card">
        <h3>{playlist.name}</h3>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 h-screen ">
        <div className="container mx-auto px-6 py-12 bg-black">
          <Link to="/">Back</Link>
          <h2 className=" text-5xl">Sample Finder</h2>
          <hr className="p-3 mt-5" />
          <form
            className="flex flex-col items-center gap-3"
            onSubmit={fetchRandomTrack}
          >
            <div className="flex bg-slate-800 w-full gap-2 px-12 py-2 rounded-sm">
              <label className="" htmlFor="genres">
                Choose genre
              </label>
              <select
                name="genres"
                id="genres"
                className="px-2 text-white rounded-md bg-gray-900"
                onChange={handleGenreChange}
                value={selectedGenre}
              >
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex bg-slate-800 w-full gap-2 px-12 py-2 rounded-sm">
              <label htmlFor="popularity">Popularity: {popInput}</label>
              <input
                id="popularity"
                name="popularity"
                type="range"
                min="1"
                max="10"
                onChange={handlePopularityChange}
                className="popRange"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white max-w-max px-4 py-2 rounded-lg ml-2 mt-2"
            >
              Get Track
            </button>
          </form>
          {error && <p>{error.message}</p>}

          <div className="mt-4 grid grid-cols-3 gap-4">
            {playlists.map((playlist) => renderPlaylist(playlist))}
          </div>
        </div>
        <div className=" bg-gray-500 max-h-screen">
          {randTrack ? (
            <div className="flex flex-col w-full items-center">
              <img
                src={randTrack?.album.images[0]?.url}
                alt=""
                className=" object-cover albumImg"
              />
              <div className="flex pl-9 mt-5 text-lg w-full">
                {randTrack.artists.map((artist) => (
                  <div
                    key={artist.id}
                    className="c-card text-orange-300 opacity-90"
                  >
                    <h3>
                      {artist.name}
                      <span className="px-2">•</span>
                    </h3>
                  </div>
                ))}
              </div>
              <div className="flex pl-9 text-2xl w-full">{randTrack?.name}</div>
              <div className="bg-green-200 text-black px-6 py-2 mt-6 w-35 rounded-sm">
                <Link to={randTrack.external_urls.spotify}>
                  Open on Spotify
                </Link>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpotifyLoginComponent;
