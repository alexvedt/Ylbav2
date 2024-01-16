import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const SpotifyLoginComponent = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [genreInput, setGenreInput] = useState("");
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

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const data = await spotifyApi.searchPlaylists(genreInput);
      const retrievedPlaylists = data?.playlists?.items || [];
      setPlaylists(retrievedPlaylists);
    } catch (error) {
      console.error(error);
    }
  };

  const loginSpotifyUser = () => {
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.set("response_type", "token");
    authUrl.searchParams.set("client_id", "f4570679c86e4c72b36ff45883c77f14");
    authUrl.searchParams.set("redirect_uri", "http://localhost:5173/");
    authUrl.searchParams.set("scope", "user-read-private user-read-email");
    // REMOVE THIS IN PRODUCTION
    authUrl.searchParams.set("show_dialog", "true");

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
    <div className="container mx-auto p-4">
      {accessToken ? (
        <form onSubmit={handleSearch} id="js-search-form">
          <input
            type="text"
            placeholder="Enter a genre"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            className="border p-2 rounded-lg text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
          >
            Search Playlists
          </button>
        </form>
      ) : (
        <button
          onClick={handleLogin}
          id="js-login-btn"
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Login to Spotify
        </button>
      )}

      <div className="mt-4 grid grid-cols-3 gap-4">
        {playlists.map((playlist) => renderPlaylist(playlist))}
      </div>
    </div>
  );
};

export default SpotifyLoginComponent;
