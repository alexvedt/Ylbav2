import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
// console.log(process?.env.REACT_APP_VITE_CALLBACK_URL);

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

export default function SpotifyLoginComponent() {
  const [accessToken, setAccessToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);

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

  const handleLogin = () => {
    loginSpotifyUser();
  };

  const loginSpotifyUser = () => {
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.set("response_type", "token");
    authUrl.searchParams.set("client_id", "f4570679c86e4c72b36ff45883c77f14");
    authUrl.searchParams.set("redirect_uri", "https://samplesnatch.xyz/");

    authUrl.searchParams.set("scope", "user-read-private user-read-email");
    // REMOVE THIS IN PRODUCTION
    authUrl.searchParams.set("show_dialog", "true");
    localStorage.setItem("accesstoken", accessToken);

    try {
      window.location.replace(authUrl);
    } catch (error) {
      console.error(error);
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
    <div className="container mx-auto p-4 flex justify-center ">
      <button
        onClick={handleLogin}
        id="js-login-btn"
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Login to Spotify
      </button>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {playlists.map((playlist) => renderPlaylist(playlist))}
      </div>
    </div>
  );
}
