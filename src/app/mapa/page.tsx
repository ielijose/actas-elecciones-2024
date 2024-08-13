import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./components/map-component"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <MapComponent />
    </div>
  );
}
