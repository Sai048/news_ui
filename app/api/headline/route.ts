import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const country = searchParams.get("country") || "us";
  const category = searchParams.get("category") || "general";
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`;

  const res = await axios.get(url);

  return NextResponse.json(res.data);
}


