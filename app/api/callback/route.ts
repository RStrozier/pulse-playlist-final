import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    console.error("Authorization code is missing.");
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 }
    );
  }

  console.log("Authorization code received:", code);

  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!redirectUri || !clientId || !clientSecret) {
    console.error("Missing required environment variables.");
    return NextResponse.json(
      { error: "Missing required environment variables" },
      { status: 500 }
    );
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    console.log("Spotify token response:", response.data);

    const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
    const redirectUrl = new URL("/", baseUrl);

    // Set cookies
    const res = NextResponse.redirect(redirectUrl);
    res.cookies.set({
      name: "access_token",
      value: access_token,
      httpOnly: false, // Allow client-side access for the token
      sameSite: "lax", // Less strict for development
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
    });

    res.cookies.set({
      name: "refresh_token",
      value: refresh_token,
      httpOnly: true, // Keep refresh token secure
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 31536000, // 1 year
    });

    console.log("Redirecting to:", redirectUrl.toString());
    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error occurred during token exchange.");
      console.error("Error response data:", error.response?.data);
      return NextResponse.json(
        { error: "Failed to exchange code for tokens", details: error.response?.data },
        { status: 500 }
      );
    } else {
      console.error("An unknown error occurred:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}