import type { VercelRequest, VercelResponse } from "@vercel/node";
import ytdl from "@distube/ytdl-core";

export const runtime = "nodejs";

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  const { v } = request.query;

  if (!v) {
    return response.send({ error: "without query params v" });
  }

  try {
    // 获取视频信息
    const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${v}`);

    return response.send({
      data: info,
    });
  } catch (err) {
    console.error("err", err);
    return response.send({
      error: err,
    });
  }
}
