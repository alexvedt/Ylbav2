import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

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
    const urlParams = new URLSearchParams(
      window.location.hash.replace("#", ""),
    );
    const token = urlParams.get("access_token");

    if (token) {
      setAccessToken(token);
      spotifyApi.setAccessToken(token);
    }
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
        market: selectedMarket,
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
    <div className="container mx-auto p-4">
      <>
        <form onSubmit={fetchRandomTrack}>
          <label className="" htmlFor="genres">
            Choose genre
            <select
              name="genres"
              id="genres"
              className="px-2 text-black"
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
          </label>
          <label htmlFor="decades" className="">
            Select country
            <select
              name="decades"
              id="decades"
              className="px-2 text-black"
              onChange={handleMarketChange}
              value={selectedMarket}
            >
              <option value="">Anywhere</option>
              {markets.map((market) => (
                <option key={market} value={market}>
                  {market}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="popularity">Popularity:{popInput}</label>
          <input
            id="popularity"
            name="popularity"
            type="range"
            min="1"
            max="10"
            onChange={handlePopularityChange}
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2 mt-2"
          >
            Get Random Track
          </button>
        </form>
      </>

      {error && <p>{error.message}</p>}

      {randTrack ? (
        <div className="flex flex-col w-72">
          <img src={randTrack?.album?.images[1]?.url} alt="" />
          <div className="flex">
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
          <div className="flex ">
            {randTrack?.name}
            <p>
              <span className="px-2">-</span>
              {randTrack?.album.release_date}{" "}
            </p>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-4">
        {playlists.map((playlist) => renderPlaylist(playlist))}
      </div>
    </div>
  );
};

export default SpotifyLoginComponent;
