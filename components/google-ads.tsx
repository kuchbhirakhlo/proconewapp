"use client";

import { useEffect } from "react";

interface AdsenseAdProps {
  slot: string;
  style?: React.CSSProperties;
}

export default function AdsenseAd({ slot, style }: AdsenseAdProps) {
  useEffect(() => {
    try {
      // Initialize ads on the client side
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: "block" }}
      data-ad-client="ca-pub-8434537394521880"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
