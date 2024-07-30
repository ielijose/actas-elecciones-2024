import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { CIQueryResponse } from "@/types/types";
import { CACHE_EXPIRATION } from "@/constants";

interface CIQueryRequest {
  cedula: string;
}

export async function POST(request: NextRequest) {
  try {
    const { cedula }: CIQueryRequest = await request.json();

    const cacheKey = `v:${cedula}`;

    // Check cache first
    const cachedData = await kv.get(cacheKey);
    if (cachedData) {
      console.log(`Using cached data: ${cedula}`);
      return NextResponse.json(cachedData);
    }
    console.log(`Using API data: ${cedula}`);

    const response = await fetch(
      "https://gdp.sicee-api.net/api/Search/SearchCNEPointsByCid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Referer: "https://resultadospresidencialesvenezuela2024.com/",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({ cid: `V${cedula}` }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const data: CIQueryResponse = await response.json();

    // Cache the response
    await kv.set(cacheKey, data, { ex: CACHE_EXPIRATION });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
