import Papa from "papaparse";

export async function fetchSheetData<T>(csvDataUrl: string, mapper: (row: Record<string, string>) => T): Promise<T[]> {
  try {
    const dataResponse = await fetch(csvDataUrl, {
      redirect: "follow",
      cache: "no-store", // Prevent browser cache
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate", // Ensure fresh request
        "Pragma": "no-cache",  // HTTP/1.0 backward compatibility
      }
    });

    if (!dataResponse.ok) throw new Error(`Failed to fetch CSV: ${dataResponse.statusText}`);

    const csvText = await dataResponse.text();
    const parsed = Papa.parse<Record<string, string>>(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        if (parsed.errors.length) {
          console.warn("CSV parse errors:", parsed.errors);
        }

        return parsed.data.map(mapper);
  } catch(e) {
    console.error(`Failed to fetch data from sheet ${csvDataUrl}. Returning empty array`);
    console.error(e);
    return [];
  }

}
