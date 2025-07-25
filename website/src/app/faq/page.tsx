'use client'

import { Navbar } from "@/components/navbar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSheetData } from "@/data-fetcher/generic-fetcher";
import { CACHE_TTL } from "@/lib/constants";
import { useEffect, useState } from "react";

interface FaqRow {
  question: string;
  answer: string;
}

const FAQ_CACHE_KEY = "faqCache"
const FAQ_CACHE_EXPIRATION_KEY = "faqExpirationCache"
const FAQ_SHEET_LINK = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFe8zXVdVW7slOpUu8hsp32MnnEz1ZGRivhEWJjaBUIWxz5jRXd8qYjKrZ05KEQG0F-kT1YFlFiSaZ/pub?output=csv&gid=1559865979";

export default function FAQPage() {
  const [faqList, setFaqList] = useState<FaqRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    async function fetchFAQs() {
      const faqRowList: FaqRow[] = await fetchSheetData<FaqRow>(FAQ_SHEET_LINK,
        row => ({
          question: row.question,
          answer: row.answer
        }));

      if (faqRowList !== undefined) {
        setFaqList(faqRowList)
        console.log(faqRowList)

        localStorage.setItem(FAQ_CACHE_KEY, JSON.stringify(faqRowList));
        localStorage.setItem(FAQ_CACHE_EXPIRATION_KEY, String(Date.now() + CACHE_TTL));
      } else {
        console.error(`Failed to get FAQ list`);
      }
      setLoading(false);
    }

    // TODO: move this into a reuseable cache getter/setter
    const urlParams = new URLSearchParams(window.location.search);
    const shouldRefresh = urlParams.has("refresh");

    const now = Date.now();
    const cachedFAQData = localStorage.getItem(FAQ_CACHE_KEY);
    const cachedFAQExpiration = localStorage.getItem(FAQ_CACHE_EXPIRATION_KEY);
    // Use cache if it exists & isn't expired
    if (cachedFAQData && cachedFAQExpiration && !shouldRefresh  && now < Number(cachedFAQExpiration)) {
      console.info('Fetched FAQs from cache.');
      setFaqList(JSON.parse(cachedFAQData))
      setLoading(false);
    } else {
      fetchFAQs();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full bg-[#f5f5f5] p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-2xl font-bold">FAQs</h1>
          {
            loading
            ?
            <div className="p-4 space-y-4">
              <Skeleton className="h-6"/>
              <Skeleton className="h-6"/>
              <Skeleton className="h-6"/>
              <Skeleton className="h-6"/>
            </div>
            :
            <>
            {
              faqList.length === 0 ?
                <p>No frequent questions yet. Ask us something!</p>
                :
                <Accordion type="single" collapsible className="w-full">
                  {
                    faqList.map((faq, i) => {
                      return (
                        <AccordionItem key={i.toString()} value={i.toString()}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })
                  }
                </Accordion>
            }
            </>
          }
        </div>
      </div>
    </div>
  );
}
