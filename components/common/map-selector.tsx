"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/common/loading-state";
import { MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

// Use NEXT_PUBLIC_ prefix for client-side access
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

const defaultCenter = {
  lat: 30.0444,
  lng: 31.2357,
};

export interface Location {
  lat: number;
  lng: number;
  address?: string;
  formattedAddress?: string;
  city?: string;
  country?: string;
}

interface MapSelectorProps {
  onLocationSelect: (location: Location) => void;
  defaultLocation?: Location;
  title?: string;
  description?: string;
  confirmLabel?: string;
  className?: string;
}

export const MapSelector = ({
  onLocationSelect,
  defaultLocation,
  title = "حدد موقع التوصيل",
  description = "انقر على الخريطة لتحديد موقع التوصيل أو استخدم زر الكشف التلقائي",
  confirmLabel = "تأكيد الموقع",
  className,
}: MapSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    defaultLocation || null
  );
  const [isDetecting, setIsDetecting] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Initialize geocoder when map is loaded
  useEffect(() => {
    if (isLoaded && window.google) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  const geocodeLocation = useCallback(
    async (lat: number, lng: number): Promise<Location> => {
      if (!geocoderRef.current) {
        return { lat, lng };
      }

      setIsGeocoding(true);
      try {
        const response = await geocoderRef.current.geocode({
          location: { lat, lng },
        });

        if (response.results && response.results.length > 0) {
          const result = response.results[0];
          const addressComponents = result.address_components;

          let city = "";
          let country = "";
          let streetNumber = "";
          let route = "";

          addressComponents?.forEach((component) => {
            const types = component.types;
            if (types.includes("locality") || types.includes("administrative_area_level_2")) {
              city = component.long_name;
            }
            if (types.includes("country")) {
              country = component.long_name;
            }
            if (types.includes("street_number")) {
              streetNumber = component.long_name;
            }
            if (types.includes("route")) {
              route = component.long_name;
            }
          });

          const address = [streetNumber, route].filter(Boolean).join(" ").trim();

          return {
            lat,
            lng,
            address: address || undefined,
            formattedAddress: result.formatted_address,
            city: city || undefined,
            country: country || undefined,
          };
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      } finally {
        setIsGeocoding(false);
      }

      return { lat, lng };
    },
    []
  );

  const handleMapClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      if (e.latLng && isLoaded) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const locationWithDetails = await geocodeLocation(lat, lng);
        setSelectedLocation(locationWithDetails);
      }
    },
    [isLoaded, geocodeLocation]
  );

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locationWithDetails = await geocodeLocation(lat, lng);
        setSelectedLocation(locationWithDetails);

        if (mapRef.current) {
          mapRef.current.setCenter({ lat, lng });
          mapRef.current.setZoom(15);
        }
        setIsDetecting(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("فشل في الحصول على موقعك. يرجى تحديد الموقع على الخريطة.");
        setIsDetecting(false);
      }
    );
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      console.log(
        "MapSelector handleConfirm - selectedLocation:",
        selectedLocation
      );
      onLocationSelect(selectedLocation);
    } else {
      console.warn("MapSelector handleConfirm - no location selected");
    }
  };

  return (
    <div className="space-y-4">
      {loadError && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">
            حدث خطأ أثناء تحميل الخريطة. يرجى المحاولة مرة أخرى.
          </p>
        </div>
      )}

      {!isLoaded && !loadError && (
        <div className="min-h-[400px] flex items-center justify-center">
          <LoadingState text="جاري تحميل الخريطة..." />
        </div>
      )}

      {isLoaded && (
        <>
          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              onClick={detectCurrentLocation}
              disabled={isDetecting}
              className="flex items-center gap-2"
            >
              <Navigation className="h-4 w-4" />
              {isDetecting ? "جاري الكشف..." : "كشف موقعي تلقائياً"}
            </Button>
          </div>

          <div className="rounded-lg overflow-hidden border-2 border-border min-h-[400px] relative">
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%",
                minHeight: "400px",
              }}
              center={selectedLocation || defaultCenter}
              zoom={selectedLocation ? 15 : 12}
              onClick={handleMapClick}
              onDragEnd={async () => {
                if (mapRef.current) {
                  const center = mapRef.current.getCenter();
                  if (center) {
                    const lat = center.lat();
                    const lng = center.lng();
                    const locationWithDetails = await geocodeLocation(lat, lng);
                    setSelectedLocation(locationWithDetails);
                  }
                }
              }}
              onZoomChanged={async () => {
                if (mapRef.current) {
                  const center = mapRef.current.getCenter();
                  if (center) {
                    const lat = center.lat();
                    const lng = center.lng();
                    const locationWithDetails = await geocodeLocation(lat, lng);
                    setSelectedLocation(locationWithDetails);
                  }
                }
              }}
              onLoad={(map) => {
                mapRef.current = map;
                // Initial geocode when map loads
                if (map && (!selectedLocation || selectedLocation.lat === defaultCenter.lat)) {
                  const center = map.getCenter();
                  if (center) {
                    geocodeLocation(center.lat(), center.lng()).then(setSelectedLocation);
                  }
                }
              }}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
              }}
            >
            </GoogleMap>
            {/* Fixed center marker */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <MapPin className="h-10 w-10 text-primary drop-shadow-lg" strokeWidth={2} />
            </div>
          </div>

          <Button
            disabled={!selectedLocation || isGeocoding}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleConfirm}
          >
            {confirmLabel || "تأكيد الموقع"}
          </Button>

          {selectedLocation && (
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-2">
              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">
                  الموقع المحدد
                </p>
                {isGeocoding ? (
                  <p className="text-xs text-muted-foreground">
                    جاري الحصول على تفاصيل الموقع...
                  </p>
                ) : (
                  <>
                    {selectedLocation.formattedAddress ? (
                      <p className="text-xs text-foreground mb-1">
                        {selectedLocation.formattedAddress}
                      </p>
                    ) : selectedLocation.address ? (
                      <p className="text-xs text-foreground mb-1">
                        {selectedLocation.address}
                        {selectedLocation.city && `, ${selectedLocation.city}`}
                        {selectedLocation.country && `, ${selectedLocation.country}`}
                      </p>
                    ) : null}
                    <p className="text-xs text-muted-foreground">
                      خط العرض: {selectedLocation.lat.toFixed(6)}, خط الطول:{" "}
                      {selectedLocation.lng.toFixed(6)}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          
        </>
      )}
    </div>
  );
};
