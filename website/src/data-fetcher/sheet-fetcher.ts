import Papa from "papaparse";
import { Menu, MenuItem } from "@/components/menu";
import { CACHE_TTL } from "@/lib/constants";

interface CsvMenuDataRow {
  category: 'FOOD' | 'DRINKS';
  typeName: string;
  typeDescription?: string;
  itemName: string;
  itemDescription?: string;
  itemPrice?: number;
  itemBulkPrice?: number;
}

export async function fetchMenuData(dataUrl: string, setMenu: (menu : Menu) => void, cacheKey: string, cacheExpirationKey: string, fallbackMenu? : Menu, fallbackMenuDate? : string) {
  try {
    //const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFe8zXVdVW7slOpUu8hsp32MnnEz1ZGRivhEWJjaBUIWxz5jRXd8qYjKrZ05KEQG0F-kT1YFlFiSaZ/pub?output=csv";
    const dataResponse = await fetch(dataUrl, {
      redirect: "follow",
      cache: "no-store", // Prevent browser cache
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate", // Ensure fresh request
        "Pragma": "no-cache",  // HTTP/1.0 backward compatibility
      }
    });

    if (!dataResponse.ok) throw new Error(`Failed to fetch CSV: ${dataResponse.statusText}`);

    const csvText = await dataResponse.text();
    Papa.parse<CsvMenuDataRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false, // Prevent unintended type conversions
      transform: (value, column) => {
        if (column === "itemPrice" || column === "itemBulkPrice") {
          return Number(value) || undefined;
        }

        return value;
      },
      error: (err: { message: string; }) => console.warn(`CSV Parsing Error: ${err.message}`),
      complete: (result) => {
        // Group by category and type first
        const groupedData = result.data.reduce((acc, row) => {
          // Create category if it doesn't exist
          if (!acc[row.category]) {
            acc[row.category] = {};
          }

          // Create type if it doesn't exist
          if (!acc[row.category][row.typeName]) {
            acc[row.category][row.typeName] = {
              items: [],
              description: row.typeDescription // Will take first occurrence
            };
          }

          // Add item to the type
          acc[row.category][row.typeName].items.push({
            name: row.itemName,
            description: row.itemDescription,
            price: row.itemPrice,
            bulkPrice: row.itemBulkPrice,
          });

          return acc;
        }, {} as Record<string, Record<string, { items: MenuItem[], description?: string }>>);

        // Transform into Menu structure with guaranteed food and drinks categories
        const menu: Menu = {
          food: {
            sections: groupedData['FOOD'] ? Object.entries(groupedData['FOOD']).map(([typeName, data]) => ({
              type: typeName,
              description: data.description,
              items: data.items
            })) : []
          },
          drinks: {
            sections: groupedData['DRINKS'] ? Object.entries(groupedData['DRINKS']).map(([typeName, data]) => ({
              type: typeName,
              description: data.description,
              items: data.items
            })) : []
          }
        };


        // Store in localStorage with expiration
        localStorage.setItem(cacheKey, JSON.stringify(menu));
        localStorage.setItem(cacheExpirationKey, String(Date.now() + CACHE_TTL));

        console.info('Fetched menu from source and updated cache.');

        setMenu(menu);
      },
    });
  } catch (e) {
    console.info(e);

    if (fallbackMenu !== undefined) {
      console.info(`Fetching menu from source or cache failed (see error below), falling back to menu last updated on ${fallbackMenuDate}.`);
      setMenu(fallbackMenu);
    }
  }
}
