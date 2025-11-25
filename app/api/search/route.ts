import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";

  const url = `https://newsapi.org/v2/everything?q={query}&title=Republicans left the Obamacare cliff to the last minute. Some are regretting it. - Politico&apiKey=${process.env.NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;

  const res = await axios.get(url);

  return NextResponse.json(res.data.articles);
}
