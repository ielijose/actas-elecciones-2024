import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GroupedReport, Parish } from "@/types/index";
import groupedReportData from "@/grouped_report.json";
import { sortEntriesByName } from "@/utils/sort-entries";
import { NavigationHeader } from "@/components/navigation-header";

interface MunicipalityPageProps {
  params: { stateName: string; munName: string };
}

export default function MunicipalityPage({ params }: MunicipalityPageProps) {
  const reportData: GroupedReport = groupedReportData;

  const stateName = decodeURIComponent(params.stateName);
  const munName = decodeURIComponent(params.munName);

  const stateData = reportData[stateName];
  const munData = stateData?.municipalities[munName];

  if (!munData) {
    return <div>Municipality not found</div>;
  }

  const sortedParishes = sortEntriesByName<Parish>(
    Object.entries(munData.parishes)
  );

  return (
    <div className="container mx-auto p-4">
      <NavigationHeader state={stateName} municipality={munName} />

      <p className="mb-4 text-center">Total Actas: {munData.total}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedParishes.map(([parName, parData]) => (
          <Link
            href={`/stats/state/${encodeURIComponent(
              stateName
            )}/${encodeURIComponent(munName)}/${encodeURIComponent(parName)}`}
            key={parName}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">{parName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Total Actas: {parData.total}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
