
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
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
      const values = line.split(',');
      const row: Record<string, string> = {};

      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim() ?? '';
      });

      return mapper(row);
    });
  } catch(e) {
    console.error(`Failed to fetch data from sheet ${csvDataUrl}. Returning empty array`);
    console.error(e);
    return [];
  }

}
