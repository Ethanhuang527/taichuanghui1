// 產生短效簽章播放網址。示範用假 token；正式版換 Bunny Stream 簽章（見註解）。
import crypto from "crypto";
const TTL = 600;

export function signedPlaybackUrl(person) {
  const expires = Math.floor(Date.now() / 1000) + TTL;
  const token = crypto
    .createHash("sha256")
    .update(`${person.bunnyGuid}|${expires}|demo`)
    .digest("hex")
    .slice(0, 24);
  return { url: `${person.videoSrc}?token=${token}&expires=${expires}`, expires };

  /* 正式版（Bunny Token Authentication）：
  const key = process.env.BUNNY_TOKEN_SECURITY_KEY;
  const host = process.env.BUNNY_CDN_HOSTNAME;
  const path = `/${person.bunnyGuid}/playlist.m3u8`;
  const token = crypto.createHash("sha256").update(key + path + expires)
      .digest("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
  return { url: `https://${host}${path}?token=${token}&expires=${expires}`, expires };
  */
}
