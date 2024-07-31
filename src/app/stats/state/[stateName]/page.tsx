import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GroupedReport, Municipality } from "@/types/index";
import groupedReportData from "@/grouped_report.json";
import { sortEntriesByName } from "@/utils/sort-entries";
import { NavigationHeader } from "@/components/navigation-header";

interface StatePageProps {
  params: { stateName: string };
}

export default function StatePage({ params }: StatePageProps) {
  const reportData: GroupedReport = groupedReportData;
  const { stateName } = params;
  const stateData = reportData[stateName];

  if (!stateData) {
    return <div>State not found</div>;
  }

  const sortedMunicipalities = sortEntriesByName<Municipality>(
    Object.entries(stateData.municipalities)
  );

  return (
    <div className="container mx-auto p-4">
      <NavigationHeader state={stateName} />

      <p className="mb-4 text-center">Total Actas: {stateData.total}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMunicipalities.map(([munName, munData]) => (
          <Link
            href={`/stats/state/${encodeURIComponent(
              stateName
            )}/${encodeURIComponent(munName)}`}
            className="text-blue-600 hover:underline"
            key={munName}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 ">{munName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Total Actas: {munData.total}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
