"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<any[]>([]);


  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {session ? (
        <div>
          <h1>Welcome, {session.user?.name}!</h1>
          <img src={session.user?.image!} alt="Profile" width={50} height={50} />

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
