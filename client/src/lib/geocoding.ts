interface GeocodeResult {
  lat: number;
  lng: number;
}

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

export async function geocodeAddress(
  city: string,
  state: string,
  zipCode?: string
): Promise<GeocodeResult | null> {
  try {
    const query = zipCode
      ? `${city}, ${state}, ${zipCode}, USA`
      : `${city}, ${state}, USA`;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
        new URLSearchParams({
          q: query,
          format: "json",
          limit: "1",
          countrycodes: "us",
          email: "support@grouprideapp.com",
        })
    );

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data: NominatimResponse[] = await response.json();

    if (data.length === 0) {
      return null;
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
