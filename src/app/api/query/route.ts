import { NextRequest, NextResponse } from "next/server";

interface CNEQueryRequest {
  cedula: string;
}

interface Person {
  cid: string;
  fullname: string;
  date: string;
  location: string;
  state: string;
  mun: string;
  par: string;
  center: string;
  address: string;
  table: string | null;
  book: string | null;
  page: string | null;
  row: string | null;
  markCheck: boolean;
}

interface Acta {
  geo: string | null;
  serial: string;
  documentId: number;
  url: string;
  stages: string | null;
}

interface CNEQueryResponse {
  Success: boolean;
  Messages: string[];
  Errors: string[];
  Data: {
    Points: null;
    Person: Person;
    isSelectedMember: boolean;
    MemberInfo: null;
    acta: Acta;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { cedula }: CNEQueryRequest = await request.json();

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
      throw new Error("Failed to fetch data from CNE API");
    }

    const data: CNEQueryResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
