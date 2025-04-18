import Papa from "papaparse";
import { Menu, MenuCategory, MenuItem, MenuSection } from "@/components/menu";
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

/**
* This function (1) pulls csv data from the url, (2) parses the csv
* (3) sets react state, and (4) caches menu data in browser.
*/

export async function fetchMenuData(dataUrl: string, setMenu: (menu : Menu) => void, cacheKey: string, cacheExpirationKey: string, fallbackMenu? : Menu, fallbackMenuDate? : string) {
  try {
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

        const menusByCategory: Record<string, MenuCategory> = {};

        Object.entries(groupedData).forEach(([categoryName, sectionsObj]) => {
          const sections: MenuSection[] = Object.entries(sectionsObj).map(
            ([sectionType, sectionData]) => ({
              type: sectionType,
              description: sectionData.description,
              items: sectionData.items,
            })
          );

          const menuCategory: MenuCategory = { sections };

          menusByCategory[categoryName] = menuCategory;
        });

        // Transform into Menu structure with guaranteed food and drinks categories
        const menu: Menu = {
          menusByCategory: menusByCategory
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
