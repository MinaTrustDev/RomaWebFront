"use client";

import { useState, useCallback, useRef } from "react";
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

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;
const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

const defaultCenter = {
  lat: 30.0444, // Cairo coordinates
  lng: 31.2357,
};

export interface Location {
  lat: number;
  lng: number;
}

interface MapSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (location: Location) => void;
  defaultLocation?: Location;
  title?: string;
  description?: string;
  confirmLabel?: string;
  className?: string;
}

export const MapSelector = ({
  open,
  onOpenChange,
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
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setSelectedLocation(location);
    }
  }, []);

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setSelectedLocation(location);

        if (mapRef.current) {
          mapRef.current.setCenter(location);
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
      onOpenChange(false);
    } else {
      console.warn("MapSelector handleConfirm - no location selected");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSelectedLocation(defaultLocation || null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={cn("max-w-4xl max-h-[90vh]", className)}>
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
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
            <div className="rounded-lg overflow-hidden border-2 border-border min-h-[400px]">
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  minHeight: "400px",
                }}
                center={selectedLocation || defaultCenter}
                zoom={selectedLocation ? 15 : 12}
                onClick={handleMapClick}
                onLoad={(map) => {
                  mapRef.current = map;
                }}
                options={{
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true,
                }}
              >
                {selectedLocation && (
                  <Marker
                    position={selectedLocation}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    }}
                  />
                )}
              </GoogleMap>
            </div>
          )}

          {selectedLocation && (
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  الموقع المحدد
                </p>
                <p className="text-xs text-muted-foreground">
                  خط العرض: {selectedLocation.lat.toFixed(6)}, خط الطول:{" "}
                  {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            إلغاء
          </Button>
          <Button
            disabled={!selectedLocation}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
