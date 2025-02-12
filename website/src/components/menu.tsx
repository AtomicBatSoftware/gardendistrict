'use client';

import { useEffect, useState } from 'react';
import { MenuItem } from "@/components/menu-item";
import Papa from "papaparse";

interface CsvMenuDataRow {
  category: 'FOOD' | 'DRINKS';
  typeName: string;
  typeDescription?: string;
  itemName: string;
  itemDescription?: string;
  itemPrice?: number;
}

interface Menu {
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

// const menuData = [
//   {
//     category: "FOOD",
//     type: "STARTERS",
//     items: [
//       {
//         name: "Irish Channel Mussels",
//         description: "mussels | tomato & dry vermouth sauce | french bread",
//         price: "16.00",
//       },
//       {
//         name: "Audubon Crawfish Beignets",
//         description: "crawfish | scallion | remoulade dipping sauce",
//         price: "12.00",
//       },
//       {
//         name: "Garden District Dip",
//         description: "cajun shrimp & crawfish dip | french bread",
//         price: "14.00",
//       },
//       {
//         name: "Uptown BBQ Shrimp",
//         description: "sautéed shrimp | garlic | worcestershire-spiked butter sauce | french bread",
//         price: "16.00",
//       },
//     ],
//   },
//   {
//     category: "FOOD",
//     type: "PO BOYS",
//     description: "All come fully dressed with lettuce, tomato, pickle and remoulade sauce and a side of cajun fries | Add Etouffee to any po boy +$2.00",
//     items: [
//       {
//         name: "Shrimp",
//         description: "",
//         price: "16.00",
//       },
//       {
//         name: "Crawfish",
//         description: "",
//         price: "16.00",
//       },
//       {
//         name: "Catfish",
//         description: "",
//         price: "16.00",
//       },
//       {
//         name: "Hot Sausage",
//         description: "",
//         price: "14.00",
//       },
//     ],
//   },
//   {
//     category: "FOOD",
//     type: "SALADS",
//     description: "Add Chicken +$4.00 | Add Shrimp +$6.00 | Add Salmon +$8.00",
//     items: [
//       {
//         name: "Sunburst Salad",
//         description: "mixed greens | port infused dried cranberry | candied pecans | almonds | bleu cheese | raspberry vinaigrette",
//         price: "14.00",
//       },
//       {
//         name: "Sassy Salmon Salad",
//         description: "salmon | mixed greens | tomato | avocado | red onion | house dressing",
//         price: "18.00",
//       },
//       {
//         name: "Garden District Caesar",
//         description: "chicken $14.00 or shrimp $16.00 | romaine lettuce | parmesan cheese | croutons",
//         price: "",
//       },
//       {
//         name: "House Salad",
//         description: "mixed greens | red onion | white cheddar | carrots | tomato | croutons | choice of dressing",
//         price: "10.00",
//       },
//     ],
//   },
//   {
//     category: "FOOD",
//     type: "MAIN COURSE",
//     items: [
//       {
//         name: "Gumbo Yaya",
//         description: "andouille sausage | rotisserie chicken | white rice | french bread",
//         price: "19.00",
//       },
//       {
//         name: "Red Beans and Rice",
//         description: "pork belly | red beans | smoked sausage | white rice",
//         price: "19.00",
//       },
//       {
//         name: "Southern Hospitality",
//         description: "crispy chicken thighs (2) | baked mac & cheese | side salad",
//         price: "22.00",
//       },
//       {
//         name: "Etouffee",
//         description: "smothered shrimp & crawfish | white rice",
//         price: "23.00",
//       },
//       {
//         name: "Cajun Tomahawk",
//         description: "cajun marinated pork tomahawk | seasonal vegetable | white rice",
//         price: "26.00",
//       },
//       {
//         name: "Fried Seafood Platter",
//         description: "shrimp | catfish | crawfish | house made coleslaw | cajun fries",
//         price: "28.00",
//       },
//       {
//         name: "Jambalaya",
//         description: "andouille sausage | shrimp | holy trinity | seasoned rice",
//         price: "18.00",
//       },
//       {
//         name: "Blacked Fish of the Week",
//         description: "featured blackened fish | corn maque choux | white rice",
//         price: "18.00",
//       },
//       {
//         name: "Muffulatta",
//         description: "olive salad | capicola | mortadella | salami | mozzarella",
//         price: "16.00",
//       },
//       {
//         name: "Bourbon Street Steak",
//         description: "10 oz NY Strip | Bourbon street steak sauce | seasonal vegetable | white rice",
//         price: "26.00",
//       },
//       {
//         name: "Yakamein (Old Sober)",
//         description: "noodles | cajun soy beef broth | beef | shrimp | marinated boiled egg | scallion",
//         price: "18.00",
//       },
//       {
//         name: "Vegan Cajun Dirty Rice",
//         description: "beyond meat | holy trinity | seasoned rice",
//         price: "18.00",
//       },
//     ],
//   },
//   {
//     category: "FOOD",
//     type: "DESSERTS",
//     items: [
//       {
//         name: "Banana's Foster",
//         description: "",
//         price: "10.00",
//       },
//       {
//         name: "Feature Dessert",
//         description: "",
//         price: "10.00",
//       },
//       {
//         name: "Seasonal Mousse",
//         description: "Ask about current flavor selection.",
//         price: "10.00",
//       },
//       {
//         name: "Little Scoop",
//         description: "Ask about current flavor selection.",
//         price: "6.00",
//       },
//     ],
//   },
//   {
//     category: "FOOD",
//     type: "SIDES",
//     items: [
//       {
//         name: "Cajun Corn Maque Choux",
//         description: "",
//         price: "6.00",
//       },
//       {
//         name: "Seasonal Vegetable",
//         description: "",
//         price: "6.00",
//       },
//       {
//         name: "Cajun Fries",
//         description: "",
//         price: "6.00",
//       },
//       {
//         name: "Baked Mac & Cheese",
//         description: "",
//         price: "8.00",
//       },
//       {
//         name: "Side Salad",
//         description: "",
//         price: "7.00",
//       },
//       {
//         name: "Coleslaw",
//         description: "",
//         price: "4.00",
//       },
//       {
//         name: "White Rice",
//         description: "",
//         price: "3.00",
//       },
//     ],
//   },
//   {
//     category: "DRINKS",
//     type: "DRAFTS",
//     description: "Ask your server about rotating drafts.",
//     items: [
//       {
//         name: "Abita Strawberry Lager",
//         description: "",
//         price: "11.00",
//       },
//       {
//         name: "Abita Purple Haze",
//         description: "",
//         price: "11.00",
//       },
//       {
//         name: "Bells Two Hearted",
//         description: "",
//         price: "10.00",
//       },
//       {
//         name: "Modelo",
//         description: "",
//         price: "9.00",
//       },
//       {
//         name: "Stella Artois",
//         description: "",
//         price: "11.00",
//       },
//     ],
//   },
//   {
//     category: "DRINKS",
//     type: "COCKTAILS",
//     items: [
//       {
//         name: "Whispers of Sazerac",
//         description: "Sazerac | absinthe liqueur | sugar cube | Psychaud's bitters",
//         price: "14.00"
//       },
//       {
//         name: "Honey Child",
//         description: "Empress Indigo gin | honey simple syrup | elderflower liquor | lemon juice | egg white | club soda",
//         price: "12.00"
//       },
//       {
//         name: "Blooming Fleur De Lis",
//         description: "Butterfly pea flower infused tequila | dry vermouth | agave syrup | orange bitters",
//         price: "12.00"
//       },
//       {
//         name: "Mystical Misbelief Tree",
//         description: "Vodka | peach syrup | lemon juice | mint | maraschino cherry | club soda",
//         price: "12.00"
//       },
//       {
//         name: "Cafe Du Monde Martini",
//         description: "Vodka | Bailey's | chicory pecan bitters | cafe du monde coffee | sweet condensed milk",
//         price: "12.00"
//       },
//       {
//         name: "Hurricane",
//         description: "Rum | passion fruit juice | lemon juice | pineapple juice | simple syrup | grenadine",
//         price: "12.00"
//       },
//       {
//         name: "Faux Nana'",
//         description: "Rum | lime juice | pineapple juice | orange juice | cranberry juice | banana puree | grenadine | all spice",
//         price: "10.00"
//       }
//     ]
//   },
//   {
//     category: "DRINKS",
//     type: "DAIQUIRIS",
//     items: [
//       {
//         name: "Southern Peach",
//         description: "",
//         price: "12.00"
//       },
//       {
//         name: "Strawberry",
//         description: "",
//         price: "12.00"
//       },
//       {
//         name: "Tropical",
//         description: "",
//         price: "12.00"
//       },
//       {
//         name: "High Octane",
//         description: "",
//         price: "14.00"
//       }
//     ]
//   },
//   {
//     category: "DRINKS",
//     type: "N/A BEVERAGES",
//     items: [
//       {
//         name: "Peach Spritz",
//         description: "",
//         price: "6.00"
//       },
//       {
//         name: "Blackberry Mojito",
//         description: "",
//         price: "6.00"
//       },
//       {
//         name: "Strawberry Ginger Limeade",
//         description: "",
//         price: "6.00"
//       },
//       {
//         name: "Flavored Lemonade",
//         description: "Peach, Strawberry, Mango, Blackberry, Pineapple, Passion Fruit, Agave",
//         price: "4.00"
//       },
//       {
//         name: "Cold Drinks",
//         description: "",
//         price: "3.00"
//       },
//       {
//         name: "Sweet/Unsweet Iced Tea",
//         description: "",
//         price: "4.00"
//       },
//       {
//         name: "Hot Tea",
//         description: "",
//         price: "5.00"
//       },
//       {
//         name: "Cafe DuMonde Coffee",
//         description: "",
//         price: "5.00"
//       }
//     ]
//   },
//   {
//     category: "DRINKS",
//     type: "WHITE WINE",
//     items: [
//       {
//         name: "CGT Semi Dry Riesling, Michigan",
//         description: "",
//         price: "9.00",
//         bottlePrice: "40.00"
//       },
//       {
//         name: "Arca Nova Vinho Verde, Portugal",
//         description: "",
//         price: "8.00",
//         bottlePrice: "38.00"
//       },
//       {
//         name: "Te Henga Sauvignon Blanc, New Zealand",
//         description: "",
//         price: "9.00",
//         bottlePrice: "40.00"
//       },
//       {
//         name: "HB Picpou de Pinet, France",
//         description: "",
//         price: "9.00",
//         bottlePrice: "40.00"
//       },
//       {
//         name: "Jadot Macon Blanc Chardonnay, France",
//         description: "",
//         price: "12.00",
//         bottlePrice: "46.00"
//       }
//     ]
//   },
//   {
//     category: "DRINKS",
//     type: "RED WINE",
//     items: [
//       {
//         name: "Parducci Small Lot Pinot Nior, Mendocino",
//         description: "",
//         price: "9.00",
//         bottlePrice: "40.00"
//       },
//       {
//         name: "Raeburn Cabernet Sauvignon, Sonoma",
//         description: "",
//         price: "12.00",
//         bottlePrice: "46.00"
//       },
//       {
//         name: "Carra Beaujolias Village, France",
//         description: "",
//         price: "12.00",
//         bottlePrice: "46.00"
//       },
//       {
//         name: "Montebuena Rioja, Spain",
//         description: "",
//         price: "9.00",
//         bottlePrice: "40.00"
//       }
//     ]
//   },
//   {
//     category: "DRINKS",
//     type: "BUBBLES WINE",
//     items: [
//       {
//         name: "Freixenet Prosecco Rose, Italy",
//         description: "",
//         price: "14.00",
//         bottlePrice: "54.00"
//       },
//       {
//         name: "Segura Viudas Brut, France",
//         description: "",
//         price: "14.00",
//         bottlePrice: "54.00"
//       }
//     ]
//   }

// ];

export function Menu() {
  const [menuCategorySelection, setMenuCategorySelection] = useState<'FOOD' | 'DRINKS'>('FOOD');
  const [menu, setMenu] = useState<Menu | undefined>(undefined);

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
          {menu === undefined ? <>Need fallback menu.</> : (
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
                <MenuItem
                  key={itemIndex}
                  name={item.name}
                  description={item.description}
                  price={item.price?.toString()}
                />
              ))}
            </div>
          ))
          )}
        </div>
      </div>
    </div>
  );
}
