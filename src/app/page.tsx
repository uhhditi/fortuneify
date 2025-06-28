"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<{  label: string; id:string }[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const [tracks, setTracks] = useState<{  label: string; id:string }[]>([]);
  const [mph, setMph] = useState<number>(3);
  const [trackBPM, setTrackBPM] = useState<{ id: string; bpm: number }[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<string[]>([]);

  function handlePlaylistSelect(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedPlaylist(event.target.value);
    console.log("Selected Playlist ID:", event.target.value);
  }

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
            id: item.track.id
          }))
        );
      }
      catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    fetchTracks();
  }, [session, selectedPlaylist])

  //getting bpm from tracks
  //getting bpm from tracks
  useEffect (() => {
    const fetchTrackBPMs = async () => {
      console.log("Fetching BPMs for tracks:", tracks.length);
      if(!session || tracks.length === 0){
        return
      }

      try {
        // Option 1: Batch API call (more efficient)
        const trackIds = tracks.map(track => track.id).join(',');
        const res = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {  
          headers: { Authorization: `Bearer ${session.accessToken}` }
        });

        if(!res.ok){
          console.error("API Response not OK:", res.status, res.statusText);
          const errorText = await res.text();
          console.error("Error response:", errorText);
          throw new Error(`Couldn't fetch audio features: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Audio features response:", data);

        // Filter out null values (tracks without audio features)
        const bpms = data.audio_features
          .filter((feature: any) => feature !== null)
          .map((feature: any) => ({ 
            id: feature.id, 
            bpm: feature.tempo 
          }));

        console.log("Processed BPMs:", bpms);
        setTrackBPM(bpms);
      }
      catch (error) {
        console.error("Error fetching audio features:", error);
        
        // Fallback: Try individual requests with delay
        console.log("Trying individual requests as fallback...");
        try {
          const bpms: { id: string; bpm: number }[] = [];
          
          for (const track of tracks) {
            try {
              await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
              
              const res = await fetch(`https://api.spotify.com/v1/audio-features/${track.id}`, {  
                headers: { Authorization: `Bearer ${session.accessToken}` }
              });
              
              if (res.ok) {
                const data = await res.json();
                if (data && data.tempo) {
                  bpms.push({ id: track.id, bpm: data.tempo });
                }
              } else {
                console.warn(`Failed to fetch audio features for track ${track.id}:`, res.status);
              }
            } catch (trackError) {
              console.warn(`Error fetching audio features for track ${track.id}:`, trackError);
            }
          }
          
          console.log("Fallback BPMs:", bpms);
          setTrackBPM(bpms);
        } catch (fallbackError) {
          console.error("Fallback method also failed:", fallbackError);
        }
      }
    };
    fetchTrackBPMs();
  }, [session, tracks])
  // useEffect (() => {
  //   const fetchTrackBPMs = async () => {
  //     console.log(session);
  //     if(!session || tracks.length === 0){
  //       return
  //     }

  //     try {
  //       const bpmPromises  = tracks.map(async(track) => {
  //         const res = await fetch(`https://api.spotify.com/v1/audio-features/${track.id}`, {  
  //           headers: { Authorization: `Bearer ${session.accessToken}` }
  //         });
  //         if(!res.ok){
  //           throw new Error("Couldn't fetch tracks");
  //         }
  
  //         const data = await res.json();
  //         return { id: track.id, bpm: data.tempo };
  //       });

  //       const bpms = await Promise.all(bpmPromises);

       

  //       setTrackBPM(bpms);
  //     }
  //     catch (error) {
  //       console.error("Error fetching tracks:", error);
  //     }
  //   };
  //   fetchTrackBPMs();
  // }, [session, tracks])

  //filtering tracks based on MPH 
  useEffect(() => {
    const filterTracks = () => {
      let threshold = mph * 29.3;
      let filteredTracksID: string[] = [];
  
      for (const track of trackBPM) {
        if (Math.abs(threshold - track.bpm) < 3) {
          filteredTracksID.push(track.id);
        }
      }
  
      const filteredNames = filteredTracksID.map(id => {
        const track = tracks.find(t => t.id === id);
        return track ? track.label : null;
      }).filter(name => name !== null) as string[];
  
      setFilteredTracks(filteredNames);
    };
  
    filterTracks();
  }, [trackBPM, mph, tracks]);
 
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  //UI
  return (
    <div>
      {session ? (
        <div>
          <h1>Welcome, {session.user?.name}!</h1>
          <img src={session.user?.image!} alt="Profile" width={50} height={50} />

          <h2>choose a playlist</h2>
          <select value={selectedPlaylist} onChange={handlePlaylistSelect} className="border p-2">
            <option value="" disabled>Select a playlist...</option>
            {playlists.map((playlist) => (
              <option key={playlist.label} value={playlist.id}>
                {playlist.label}
              </option>
            ))}
          </select>

          <h2>enter speed:</h2>
          <input 
          id= "bpmInput"
          step="0.1"
          min="2"
          type = "number"
          value = {mph}
          onChange={(e) => setMph(Number(e.target.value))}
            />

          {selectedPlaylist && tracks.length > 0 && (
        <div>
          <h3>Tracks Matching Your MPH:</h3>
          <ul>
             {filteredTracks.map((trackName, index) => (
             <li key={index}>{trackName}</li>
             ))}
          </ul>
        </div>
      )}
            
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          <h1>Please sign in</h1>
          <button onClick={() => signIn("spotify")}>Sign in with Spotify</button>
        </div>
      )}
    </div>
  );

  
}
