'use client'

import { Navbar } from "@/components/navbar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Menu } from "@/components/menu";
import { CookingPot } from "lucide-react"
import { fallbackCateringMenu, fallbackCateringMenuDate } from "@/lib/constants";
import { useEffect, useState } from "react";
import { fetchSheetData } from '@/data-fetcher/generic-fetcher';
import { CACHE_TTL } from "@/lib/constants";

const CACHE_KEY = "cateringMenuCache";
const CACHE_EXPIRATION_KEY = "cateringMenuCacheExpiration";
const PDF_CACHE_KEY = "cateringMenuPDFCache";
const PDF_CACHE_EXPIRATION_KEY = "cateringMenuPDFCacheExpiration";
const MAIN_MENU_SHEET_LINK = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFe8zXVdVW7slOpUu8hsp32MnnEz1ZGRivhEWJjaBUIWxz5jRXd8qYjKrZ05KEQG0F-kT1YFlFiSaZ/pub?output=csv&gid=678587674";
const CATERING_PDF_SHEET_LINK = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFe8zXVdVW7slOpUu8hsp32MnnEz1ZGRivhEWJjaBUIWxz5jRXd8qYjKrZ05KEQG0F-kT1YFlFiSaZ/pub?output=csv&gid=1817215082";
const PDF_LINK_KEY = "catering_pdf_link";


interface PdfLinkRow {
  name: string;
  link: string;
}

export default function CateringPage() {
  const [pdfMenuLink, setPDFMenuLink] = useState<string>('');

  useEffect(() => {
    console.log("rendering catering")
    async function fetchPdfMenu() {
      const pdfLinkList: PdfLinkRow[] = await fetchSheetData<PdfLinkRow>(CATERING_PDF_SHEET_LINK,
        row => ({
          name: row.name,
          link: row.link
        }));

      const pdfLink = pdfLinkList.find(row => row.name === PDF_LINK_KEY)?.link;
      if (pdfLink !== undefined) {
        setPDFMenuLink(pdfLink)

        localStorage.setItem(PDF_CACHE_KEY, pdfLink);
        localStorage.setItem(PDF_CACHE_EXPIRATION_KEY, String(Date.now() + CACHE_TTL));
      } else {
        console.error(`Failed to find ${PDF_LINK_KEY} name value in sheet`);
      }
    }

    const now = Date.now();
    const cachedPDFLink = localStorage.getItem(PDF_CACHE_KEY);
    const cachedPDFExpiration = localStorage.getItem(PDF_CACHE_EXPIRATION_KEY);
    // Use cache if it exists & isn't expired
    if (cachedPDFLink && cachedPDFExpiration  && now < Number(cachedPDFExpiration)) {
      console.info('Fetched pdf menu link from cache.');
      setPDFMenuLink(cachedPDFLink)
    } else {
      fetchPdfMenu();
    }

  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full bg-[#f5f5f5] p-8">
        <div className="max-w-6xl mx-auto">
          <Alert className="bg-[#b77e08] text-white">
            <CookingPot color="white" className="text-white h-4 w-4" />
            <AlertTitle><div className="text-lg font-bold">Catering Notices</div></AlertTitle>
            <AlertDescription>
              <ul className="list-disc">
                <li>
                  Catering orders require a minimum of 48 hours notice. Call 616-376-4002
                </li>
                <li>
                  Napkins, flatware, and serving utensils are available upon request
                </li>
                <li>
                  {/* TODO: this file is hosted on personal google drive, change to client's drive */}
                  Download the catering menu <a className="underline" href={pdfMenuLink} target="_blank">here</a>
                </li>
              </ul>
            </AlertDescription>
          </Alert>
          <div className="columns-1 md:columns-2 gap-4">
          </div>
        </div>
        <Menu
          menuSheetUrl={MAIN_MENU_SHEET_LINK}
          cacheKey={CACHE_KEY}
          cacheExpirationKey={CACHE_EXPIRATION_KEY}
          fallbackMenu={fallbackCateringMenu}
          fallbackMenuDate={fallbackCateringMenuDate} />
      </div>
    </div>
  );
}
