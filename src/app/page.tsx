"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { TarotFront, TarotBack } from './assets/TarotCard';

import styles from './home.module.css';



export default function Home() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<{  label: string; id:string }[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const [selectedPlaylistName, setSelectedPlaylistName] = useState<string>("");
  const [tracks, setTracks] = useState<{  label: string; artist:string }[]>([]);
  const [responseText, setResponseText] = useState("");
  const [showTarot, setShowTarot] = useState(false);
  const [tarotSide, setTarotSide] = useState(true);

  


  function handlePlaylistSelect(event: ChangeEvent<HTMLSelectElement>): void {
    const newSelectedId = event.target.value;
    setSelectedPlaylist(newSelectedId);
  
    const foundLabel = playlists.find(playlist => playlist.id === newSelectedId)?.label || "";
    setSelectedPlaylistName(foundLabel);
  }

  useEffect(() => {
    console.log("Session Access Token:", session?.accessToken);
  }, [session]);

  //getting the user's playlists 
  useEffect (() => {
    const fetchPlaylists = async () => {
      console.log(session);
      if(!session){
        return
      }

      try {
        const res = await fetch("https://api.spotify.com/v1/me/playlists", {  
          headers: { Authorization: `Bearer ${session.accessToken}` }
        });

        if(!res.ok){
          throw new Error("Couldn't fetch playlists");
        }

        const data = await res.json();

        setPlaylists(
          data.items.map((item: { id: string, name: string }) => ({
            label: item.name,
            id: item.id
          }))
        );
      }
      catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, [session])

  //getting tracks from selected playlist
  useEffect (() => {
    const fetchTracks = async () => {
      console.log(session);
      if(!session || !selectedPlaylist){
        return
      }

      try {
        const res = await fetch(`https://api.spotify.com/v1/playlists/${selectedPlaylist}/tracks`, {  
          headers: { Authorization: `Bearer ${session.accessToken}` }
        });

        if(!res.ok){
          throw new Error("Couldn't fetch tracks");
        }

        const data = await res.json();

      

        setTracks(
          data.items.map((item: any) => ({
            label: item.track.name,
            artist: item.track.artists[0]?.name || "Unknown Artist"
          }))
        );
      }
      catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    fetchTracks();
  }, [session, selectedPlaylist])

  //ai result
  async function askGemini(){
    const stringArrSongs = tracks.map(track => `${track.label} - ${track.artist}`)
    const res = await fetch ('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({songs: stringArrSongs})
    })
    const data = await res.json();
    setResponseText(data.text);
  }

 
 
  if (status === "loading") {
    return <p>predicting the future...</p>;
  }

  async function handleClick() {
    setShowTarot(true);
    askGemini();
  }
  async function tarotFront(){
    setTarotSide(true);
  }

  async function tarotBack(){
    setTarotSide(false);
  }

  //UI
  return (
    <div className={styles.home}>
      {session ? (
        showTarot ? (
          // Only Tarot card inside the container, no playlist UI
          <>
          <div className={styles.titleContainer}>
            <div className={styles.fortuneify}>fortuneify</div>
            <div className={styles.subtitle}>select a playlist and have your future told...</div>
            <h1 className={styles.welcome}>welcome, {session.user?.name}.</h1>
          </div>
          <div className={styles.tarotContainer}>
            {tarotSide ? (
              <TarotFront playlistname={selectedPlaylistName} profilepicture={session.user?.image} onClick={tarotBack} />
            ) : (
              <TarotBack fortune={responseText || "predicting your future..."} onClick={tarotFront} />
            )}
            <button
              className={styles.buttons}
              onClick={() => {
                setShowTarot(false);
                setTarotSide(true); 
                setResponseText("");
              }}
            >
              read another fortune
            </button>
          </div>
          
        </>
          
        ) : (
          // The playlist selection UI inside the same container
          <>
            <div className={styles.titleContainer}>
              <div className={styles.fortuneify}>fortuneify</div>
              <div className={styles.subtitle}>select a playlist and have your future told...</div>
              <h1 className={styles.welcome}>welcome, {session.user?.name}.</h1>
            </div>
  
            <div className={styles.playlistContainer}>
              <h2 className={styles.largeSubtitle}>select playlist</h2>
              <select
                className={styles["select-playlist"]}
                value={selectedPlaylist}
                onChange={handlePlaylistSelect}
              >
                <option value="" disabled>
                  your library
                </option>
                {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.label}
                  </option>
                ))}
              </select>
  
              <button className={styles.buttons} onClick={handleClick}>
                tell my fortune
              </button>
              <button className={styles.signOutButton} onClick={() => signOut()}>Sign out</button>
            </div>
        
          </>
        )
      ) : (
        <div>
          <h1>Please sign in</h1>
          <button onClick={() => signIn("spotify")}>Sign in with Spotify</button>
        </div>
      )}
    </div>
  );

}

