"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { CityEvent, locations } from "./data";

// Haversine formula to calculate distance between two points on Earth
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// This component will handle updating the map view
function MapUpdater({
  userLocation,
  nearestLocation,
}: {
  userLocation: [number, number] | null;
  nearestLocation: CityEvent | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (nearestLocation) {
      map.setView(
        [nearestLocation.place.latitude, nearestLocation.place.longitude],
        13
      );
    } else if (userLocation) {
      map.setView(userLocation, 12);
    }
  }, [map, userLocation, nearestLocation]);

  return null;
}

export default function MapComponent() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [nearestLocation, setNearestLocation] = useState<CityEvent | null>(
    null
  );
  const [distanceToNearest, setDistanceToNearest] = useState<number | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          findNearestLocation(
            position.coords.latitude,
            position.coords.longitude
          );
          setLoading(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const findNearestLocation = (userLat: number, userLng: number) => {
    let nearest = locations[0];
    let minDistance = Number.MAX_VALUE;

    locations.forEach((loc) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        loc.place.latitude,
        loc.place.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = loc;
      }
    });

    setNearestLocation(nearest);
    setDistanceToNearest(minDistance);
  };

  return (
    <Card className="w-full mx-auto mt-8">
      <CardHeader>
        <CardTitle className="">
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl">GRAN PROTESTA MUNDIAL POR LA VERDAD</h1>
            <p className="flex">Puntos de concentración</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <MapContainer
            center={[0, 0]}
            zoom={2}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc, index) => (
              <Marker
                key={index}
                position={[loc.place.latitude, loc.place.longitude]}
                icon={L.icon({
                  iconUrl: "marker-v3.png",
                  iconSize: [48, 48],
                  iconAnchor: [16, 32],
                  popupAnchor: [0, -32],
                })}
              >
                <Popup>
                  <div className="flex flex-col">
                    <h3 className="font-bold">{loc.city}</h3>
                    <h4 className="">{loc.place.name}</h4>

                    <div className="flex justify-center items-center flex-col">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/events/${loc.image}`}
                        alt={loc.city}
                        className="w-auto h-48 object-scale-down my-2"
                      />
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.google.com/maps/search/?api=1&query=${loc.place.latitude},${loc.place.longitude}`}
                      >
                        <Button variant={"outline"}>
                          Abrir en Google Maps !
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={L.icon({
                  iconUrl: "position.png",
                  iconSize: [32, 32],
                  iconAnchor: [16, 32],
                  popupAnchor: [0, -32],
                })}
              >
                <Popup>You are here</Popup>
              </Marker>
            )}
            <MapUpdater
              userLocation={userLocation}
              nearestLocation={nearestLocation}
            />
          </MapContainer>
        </div>
        {nearestLocation && (
          <div className="mt-4 border-b pb-4">
            <h3 className="font-bold">Punto mas cercano:</h3>

            <div className="flex flex-col">
              <div className="flex gap-2">
                <h3 className="font-bold">{nearestLocation.city}: </h3>
                <h4 className="">{nearestLocation.place.name}</h4>
              </div>
              {distanceToNearest && (
                <p>
                  <span className="font-bold">Distancia:</span>{" "}
                  {distanceToNearest?.toFixed(2)} km
                </p>
              )}
              <div className="flex justify-center items-center flex-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/events/${nearestLocation.image}`}
                  alt={nearestLocation.city}
                  className="w-auto h-48 object-scale-down my-2"
                />
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${nearestLocation.place.latitude},${nearestLocation.place.longitude}`}
                >
                  <Button variant={"outline"}>Abrir en Google Maps</Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-center">
          <Button
            onClick={getUserLocation}
            variant="secondary"
            disabled={loading}
            className="flex gap-2"
          >
            Buscar punto de concentración mas cercano{" "}
            {loading && <LoaderIcon className="h-4 w-4 ml-2 animate-spin" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
