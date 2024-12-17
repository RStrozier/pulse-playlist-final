import { NextResponse } from "next/server";
// THIS IS WHAT REDIRECTS USER TO THE SPOTIFY AUTH PAGE
export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;
  const scopes = process.env.NEXT_PUBLIC_SPOTIFY_SCOPES!;

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    process.env.SPOTIFY_REDIRECT_URI!
  )}&scope=${encodeURIComponent(scopes)}`;

  return NextResponse.redirect(spotifyAuthUrl);
}