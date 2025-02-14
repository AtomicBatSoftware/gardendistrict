'use client';

import { useEffect, useState } from 'react';
import { MenuItem as MenuItemComponent } from "@/components/menu-item";
import Papa from "papaparse";
import { fallbackMenu, fallbackMenuDate } from '@/lib/constants';

interface CsvMenuDataRow {
  category: 'FOOD' | 'DRINKS';
  typeName: string;
  typeDescription?: string;
  itemName: string;
  itemDescription?: string;
  itemPrice?: number;
}

export interface Menu {
  food: MenuCategory;
  drinks: MenuCategory;
}

interface MenuCategory {
  sections: MenuSection[];
}

interface MenuSection {
  type: string;
  description?: string;
  items: MenuItem[];
}

interface MenuItem {
  name: string;
  description?: string;
  price?: number;
}

const CACHE_KEY = "menuCache";
const CACHE_EXPIRATION_KEY = "menuCacheExpiration";
const CACHE_TTL = 1000 * 60 * 60 * 24; // 1 day expiration

export function Menu() {
  const [menuCategorySelection, setMenuCategorySelection] = useState<'FOOD' | 'DRINKS'>('FOOD');
  const [menu, setMenu] = useState<Menu>(fallbackMenu);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shouldRefresh = urlParams.has("refresh");

    const now = Date.now();
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cacheExpiration = localStorage.getItem(CACHE_EXPIRATION_KEY);

    // Use cache if it exists & isn't expired & no refresh requested
    if (cachedData && cacheExpiration && !shouldRefresh && now < Number(cacheExpiration)) {
      setMenu(JSON.parse(cachedData));

      console.info('Fetched menu from cache.');

      return;
    }

    async function fetchData() {
      try {
        const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFe8zXVdVW7slOpUu8hsp32MnnEz1ZGRivhEWJjaBUIWxz5jRXd8qYjKrZ05KEQG0F-kT1YFlFiSaZ/pub?output=csv";
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
            if (column === "itemPrice") {
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
                price: row.itemPrice
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
            localStorage.setItem(CACHE_KEY, JSON.stringify(menu));
            localStorage.setItem(CACHE_EXPIRATION_KEY, String(Date.now() + CACHE_TTL));

            console.info('Fetched menu from source and updated cache.');

            setMenu(menu);
          },
        });
      } catch (e) {
        console.info(`Fetching menu from source or cache failed (see error below), falling back to menu last updated on ${fallbackMenuDate}.`);
        console.info(e);

        setMenu(fallbackMenu);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-center mb-12 space-x-2">
          <button onClick={()=>{setMenuCategorySelection('FOOD')}} className="bg-[#1a1a1a] text-[#c17f59] px-12 py-2">FOOD</button>
          <button onClick={()=>{setMenuCategorySelection('DRINKS')}} className="bg-[#1a1a1a] text-[#c17f59] px-12 py-2">DRINKS</button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {
            (menuCategorySelection === 'FOOD' ? menu.food : menu.drinks).sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-whiste p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-4">{section.type}</h2>
                {
                  section.description &&
                  <p className="text-sm mb-6">
                    {section.description}
                  </p>
                }
                {section.items.map((item, itemIndex) => (
                  <MenuItemComponent
                    key={itemIndex}
                    name={item.name}
                    description={item.description}
                    price={item.price?.toString()}
                  />
                ))}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
