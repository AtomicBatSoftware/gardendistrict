"use client";

import { useEffect, useState } from "react";
import { MenuItemComponent } from "@/components/menu-item";
import { fetchMenuData } from "@/data-fetcher/sheet-fetcher";
import { Skeleton } from "./ui/skeleton";
import { Clock } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export interface Menu {
  menusByCategory: Record<string, MenuCategory>;
}

export interface MenuCategory {
  sections: MenuSection[];
}

export interface MenuSection {
  type: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: number;
  bulkPrice?: number;
}

interface MenuProps {
  menuSheetUrl: string;
  cacheKey: string;
  cacheExpirationKey: string;
  fallbackMenu: Menu;
  fallbackMenuDate: string;
}



export function Menu(props: MenuProps) {
  const [menuCategorySelection, setMenuCategorySelection] = useState<string>("FOOD");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [menu, setMenu] = useState<Menu>();

  useEffect(() => {
    setIsLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const shouldRefresh = urlParams.has("refresh");

    const now = Date.now();
    const cachedData = localStorage.getItem(props.cacheKey);
    const cacheExpiration = localStorage.getItem(props.cacheExpirationKey);

    // Use cache if it exists & isn't expired & no refresh requested
    if (cachedData && cacheExpiration && !shouldRefresh && now < Number(cacheExpiration)) {
      const cachedDataJson = JSON.parse(cachedData);
      // TODO: this "if" can be removed 24 hours after change is deployed
      if ('food' in cachedDataJson || 'drinks' in cachedDataJson) {
        console.log("Found old schema in cached data, fetching new data")
        fetchData();
        setIsLoading(false);
      } else {
        setMenu(JSON.parse(cachedData));
        setIsLoading(false);
        console.info("Fetched menu from cache.");
      }

      return;
    }

    async function fetchData() {
      fetchMenuData(
        props.menuSheetUrl,
        setMenu,
        props.cacheKey,
        props.cacheExpirationKey,
        props.fallbackMenu,
        props.fallbackMenuDate,
      );
    }

    fetchData();
    setIsLoading(false);
  }, [props]);

  if (isLoading || !menu) {
    return (
      <div className="min-h-screen w-full bg-[#f5f5f5] p-8">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 md:columns-2 gap-4 pt-16">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="break-inside-avoid mb-4">
                <Skeleton className="h-96 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen w-full bg-[#f5f5f5] p-8">
        <div className="max-w-6xl mx-auto">
          {/* Menu Tabs */}

          <div className="flex flex-row flex-wrap justify-center mb-12 gap-2">
            {
              Object.keys(menu.menusByCategory).map((key) => (
                <button
                  key={key}
                  onClick={() => setMenuCategorySelection(key)}
                  className="bg-[#483248] text-[#c17f59] hover:bg-[#702963] hover:text-[#FFD700] px-12 py-2"
                >
                  {key}
                </button>
              ))
            }


          </div>

          {/* Menu availability times*/}
          {
            menuCategorySelection === 'LUNCH DUO' &&
            <div className="flex flex-row flex-wrap justify-center mb-12 gap-2">
              <Alert className="bg-[#b77e08] text-white">
                <Clock color="white" className="text-white h-4 w-4" />
                <AlertTitle><div className="text-lg font-bold">Menu Availability</div></AlertTitle>
                <AlertDescription>
                  Monday-Friday from 11:30am - 3pm
                </AlertDescription>
              </Alert>
            </div>
          }

          {
            menuCategorySelection === 'BRUNCH' &&
            <div className="flex flex-row flex-wrap justify-center mb-12 gap-2">
              <Alert className="bg-[#b77e08] text-white">
                <Clock color="white" className="text-white h-4 w-4" />
                <AlertTitle><div className="text-lg font-bold">Menu Availability</div></AlertTitle>
                <AlertDescription>
                  Saturday & Sunday from 10am - 3pm
                </AlertDescription>
              </Alert>
            </div>
          }

          {/* Menu Content */}
          <div className="columns-1 md:columns-2 gap-4">
            {menu.menusByCategory[menuCategorySelection]?.sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="bg-white p-8 shadow-lg flex flex-col break-inside-avoid mb-6"
              >
                <h2 className="text-3xl font-bold mb-4">{section.type}</h2>
                {section.description && (
                  <p className="text-sm mb-6">{section.description}</p>
                )}
                {section.items.map((item, itemIndex) => (
                  <MenuItemComponent
                    key={itemIndex}
                    name={item.name}
                    description={item.description}
                    price={item.price?.toString()}
                    bulkPrice={item.bulkPrice?.toString()}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
