import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Center, GroupedReport } from "@/types/index";
import { sortEntriesByName } from "@/utils/sort-entries";
import groupedReportData from "@/grouped_report.json";
import { NavigationHeader } from "@/components/navigation-header";

interface ParishPageProps {
  params: { stateName: string; munName: string; parName: string };
}

export default function ParishPage({ params }: ParishPageProps) {
  const reportData: GroupedReport = groupedReportData;

  const stateName = decodeURIComponent(params.stateName);
  const munName = decodeURIComponent(params.munName);
  const parName = decodeURIComponent(params.parName);

  const stateData = reportData[stateName];
  const munData = stateData?.municipalities[munName];
  const parData = munData?.parishes[parName];

  if (!parData) {
    return <div>Parish not found</div>;
  }

  const sortedCenters = sortEntriesByName<Center>(
    Object.entries(parData.centers)
  );

  return (
    <div className="container mx-auto p-4">
      <NavigationHeader
        state={stateName}
        municipality={munName}
        parish={parName}
      />

      <p className="mb-4 text-center">Total Actas: {parData.total}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCenters.map(([centerKey, centerData]) => (
          <Card key={centerKey}>
            <CardHeader>
              <CardTitle>{centerData.centerName}</CardTitle>
            </CardHeader>
            <CardContent>
              {centerData.url && (
                <div className="mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${centerData.url}`}
                    alt={`Acta for ${centerData.centerName}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
