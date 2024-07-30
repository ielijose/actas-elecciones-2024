import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GroupedReport, State } from "@/types/index";
import groupedReportData from "../../grouped_report.json";
import { sortEntriesByName } from "@/utils/sort-entries";

export default function Home() {
  const reportData: GroupedReport = groupedReportData;
  const sortedStates = sortEntriesByName<State>(Object.entries(reportData));

  // calc total actas
  const total = Object.values(reportData).reduce((acc, state) => {
    return acc + state.total;
  }, 0);

  return (
    <div className="container mx-auto p-4 mt-12">
      <p className="mb-4 text-center">Total Actas: {total}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedStates.map(([stateName, stateData]) => (
          <Card key={stateName}>
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/state/${encodeURIComponent(stateName)}`}
                  className="text-blue-600 hover:underline"
                >
                  {stateName}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Actas: {stateData.total}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
