import { Menu } from "@/components/menu";

export const fallbackMenuDate = '2/14/2025';
export const fallbackMenu: Menu = {
    food: {
        sections: [
            {
                type: "STARTERS",
                description: undefined,
                items: [
                    {
                        name: "Irish Channel Mussels",
                        description: "mussels | tomato & dry vermouth sauce | french bread",
                        price: 16.00
                    },
                    {
                        name: "Audubon Crawfish Beignets",
                        description: "crawfish | scallion | remoulade dipping sauce",
                        price: 12.00
                    },
                    {
                        name: "Garden District Dip",
                        description: "cajun shrimp & crawfish dip | french bread",
                        price: 14.00
                    },
                    {
                        name: "Uptown BBQ Shrimp",
                        description: "sautéed shrimp | garlic | worcestershire-spiked butter sauce | french bread",
                        price: 16.00
                    }
                ]
            },
            {
                type: "PO BOYS",
                description: "All come fully dressed with lettuce, tomato, pickle and remoulade sauce and a side of cajun fries | Add Etouffee to any po boy +$2.00",
                items: [
                    {
                        name: "Shrimp",
                        description: undefined,
                        price: 16.00
                    },
                    {
                        name: "Crawfish",
                        description: undefined,
                        price: 16.00
                    },
                    {
                        name: "Catfish",
                        description: undefined,
                        price: 16.00
                    },
                    {
                        name: "Hot Sausage",
                        description: undefined,
                        price: 14.00
                    }
                ]
            },
            {
                type: "SALADS",
                description: "Add Chicken +$4.00 | Add Shrimp +$6.00 | Add Salmon +$8.00",
                items: [
                    {
                        name: "Sunburst Salad",
                        description: "mixed greens | port infused dried cranberry | candied pecans | almonds | bleu cheese | raspberry vinaigrette",
                        price: 14.00
                    },
                    {
                        name: "Sassy Salmon Salad",
                        description: "salmon | mixed greens | tomato | avocado | red onion | house dressing",
                        price: 18.00
                    },
                    {
                        name: "Garden District Caesar",
                        description: "chicken $14.00 or shrimp $16.00 | romaine lettuce | parmesan cheese | croutons",
                        price: undefined
                    },
                    {
                        name: "House Salad",
                        description: "mixed greens | red onion | white cheddar | carrots | tomato | croutons | choice of dressing",
                        price: 10.00
                    }
                ]
            },
            {
                type: "MAIN COURSE",
                description: undefined,
                items: [
                    {
                        name: "Gumbo Yaya",
                        description: "andouille sausage | rotisserie chicken | white rice | french bread",
                        price: 19.00
                    },
                    {
                        name: "Red Beans and Rice",
                        description: "pork belly | red beans | smoked sausage | white rice",
                        price: 19.00
                    },
                    {
                        name: "Southern Hospitality",
                        description: "crispy chicken thighs (2) | baked mac & cheese | side salad",
                        price: 22.00
                    },
                    {
                        name: "Etouffee",
                        description: "smothered shrimp & crawfish | white rice",
                        price: 23.00
                    },
                    {
                        name: "Cajun Tomahawk",
                        description: "cajun marinated pork tomahawk | seasonal vegetable | white rice",
                        price: 26.00
                    },
                    {
                        name: "Fried Seafood Platter",
                        description: "shrimp | catfish | crawfish | house made coleslaw | cajun fries",
                        price: 28.00
                    },
                    {
                        name: "Jambalaya",
                        description: "andouille sausage | shrimp | holy trinity | seasoned rice",
                        price: 18.00
                    },
                    {
                        name: "Blacked Fish of the Week",
                        description: "featured blackened fish | corn maque choux | white rice",
                        price: 18.00
                    },
                    {
                        name: "Muffulatta",
                        description: "olive salad | capicola | mortadella | salami | mozzarella",
                        price: 16.00
                    },
                    {
                        name: "Bourbon Street Steak",
                        description: "10 oz NY Strip | Bourbon street steak sauce | seasonal vegetable | white rice",
                        price: 26.00
                    },
                    {
                        name: "Yakamein (Old Sober)",
                        description: "noodles | cajun soy beef broth | beef | shrimp | marinated boiled egg | scallion",
                        price: 18.00
                    },
                    {
                        name: "Vegan Cajun Dirty Rice",
                        description: "beyond meat | holy trinity | seasoned rice",
                        price: 18.00
                    }
                ]
            },
            {
                type: "DESSERTS",
                description: undefined,
                items: [
                    {
                        name: "Banana's Foster",
                        description: undefined,
                        price: 10.00
                    },
                    {
                        name: "Feature Dessert",
                        description: undefined,
                        price: 10.00
                    },
                    {
                        name: "Seasonal Mousse",
                        description: "Ask about current flavor selection.",
                        price: 10.00
                    },
                    {
                        name: "Little Scoop",
                        description: "Ask about current flavor selection.",
                        price: 6.00
                    }
                ]
            },
            {
                type: "SIDES",
                description: undefined,
                items: [
                    {
                        name: "Cajun Corn Maque Choux",
                        description: undefined,
                        price: 6.00
                    },
                    {
                        name: "Seasonal Vegetable",
                        description: undefined,
                        price: 6.00
                    },
                    {
                        name: "Cajun Fries",
                        description: undefined,
                        price: 6.00
                    },
                    {
                        name: "Baked Mac & Cheese",
                        description: undefined,
                        price: 8.00
                    },
                    {
                        name: "Side Salad",
                        description: undefined,
                        price: 7.00
                    },
                    {
                        name: "Coleslaw",
                        description: undefined,
                        price: 4.00
                    },
                    {
                        name: "White Rice",
                        description: undefined,
                        price: 3.00
                    }
                ]
            }
        ]
    },
    drinks: {
        sections: [
            {
                type: "DRAFTS",
                description: "Ask your server about rotating drafts.",
                items: [
                    {
                        name: "Abita Strawberry Lager",
                        description: undefined,
                        price: 11.00
                    },
                    {
                        name: "Abita Purple Haze",
                        description: undefined,
                        price: 11.00
                    },
                    {
                        name: "Bells Two Hearted",
                        description: undefined,
                        price: 10.00
                    },
                    {
                        name: "Modelo",
                        description: undefined,
                        price: 9.00
                    },
                    {
                        name: "Stella Artois",
                        description: undefined,
                        price: 11.00
                    }
                ]
            },
            {
                type: "COCKTAILS",
                description: undefined,
                items: [
                    {
                        name: "Whispers of Sazerac",
                        description: "Sazerac | absinthe liqueur | sugar cube | Psychaud's bitters",
                        price: 14.00
                    },
                    {
                        name: "Honey Child",
                        description: "Empress Indigo gin | honey simple syrup | elderflower liquor | lemon juice | egg white | club soda",
                        price: 12.00
                    },
                    {
                        name: "Blooming Fleur De Lis",
                        description: "Butterfly pea flower infused tequila | dry vermouth | agave syrup | orange bitters",
                        price: 12.00
                    },
                    {
                        name: "Mystical Misbelief Tree",
                        description: "Vodka | peach syrup | lemon juice | mint | maraschino cherry | club soda",
                        price: 12.00
                    },
                    {
                        name: "Cafe Du Monde Martini",
                        description: "Vodka | Bailey's | chicory pecan bitters | cafe du monde coffee | sweet condensed milk",
                        price: 12.00
                    },
                    {
                        name: "Hurricane",
                        description: "Rum | passion fruit juice | lemon juice | pineapple juice | simple syrup | grenadine",
                        price: 12.00
                    },
                    {
                        name: "Faux Nana'",
                        description: "Rum | lime juice | pineapple juice | orange juice | cranberry juice | banana puree | grenadine | all spice",
                        price: 10.00
                    }
                ]
            },
            {
                type: "DAIQUIRIS",
                description: undefined,
                items: [
                    {
                        name: "Southern Peach",
                        description: undefined,
                        price: 12.00
                    },
                    {
                        name: "Strawberry",
                        description: undefined,
                        price: 12.00
                    },
                    {
                        name: "Tropical",
                        description: undefined,
                        price: 12.00
                    },
                    {
                        name: "High Octane",
                        description: undefined,
                        price: 14.00
                    }
                ]
            },
            {
                type: "N/A BEVERAGES",
                description: undefined,
                items: [
                    {
                        name: "Peach Spritz",
                        description: undefined,
                        price: 6.00
                    },
                    {
                        name: "Blackberry Mojito",
                        description: undefined,
                        price: 6.00
                    },
                    {
                        name: "Strawberry Ginger Limeade",
                        description: undefined,
                        price: 6.00
                    },
                    {
                        name: "Flavored Lemonade",
                        description: "Peach, Strawberry, Mango, Blackberry, Pineapple, Passion Fruit",
                        price: 4.00
                    },
                    {
                        name: "Cold Drinks",
                        description: undefined,
                        price: 3.00
                    },
                    {
                        name: "Sweet/Unsweet Iced Tea",
                        description: undefined,
                        price: 4.00
                    },
                    {
                        name: "Hot Tea",
                        description: undefined,
                        price: 5.00
                    },
                    {
                        name: "Cafe Du Monde Coffee",
                        description: undefined,
                        price: 5.00
                    }
                ]
            },
            {
                type: "WHITE WINE",
                description: undefined,
                items: [
                    {
                        name: "CGT Semi Dry Riesling, Michigan",
                        description: undefined,
                        price: 9.00,
                        bulkPrice: 40.00,
                    },
                    {
                        name: "Arca Nova Vinho Verde, Portugal",
                        description: undefined,
                        price: 8.00,
                        bulkPrice: 38.00,
                    },
                    {
                        name: "Te Henga Sauvignon Blanc, New Zealand",
                        description: undefined,
                        price: 9.00,
                        bulkPrice: 40.00,
                    },
                    {
                        name: "HB Picpou de Pinet, France",
                        description: undefined,
                        price: 9.00,
                        bulkPrice: 40.00,
                    },
                    {
                        name: "Jadot Macon Blanc Chardonnay, France",
                        description: undefined,
                        price: 12.00,
                        bulkPrice: 46.00,
                    }
                ]
            },
            {
                type: "RED WINE",
                description: undefined,
                items: [
                    {
                        name: "Parducci Small Lot Pinot Nior, Mendocino",
                        description: undefined,
                        price: 9.00,
                        bulkPrice: 40.00,
                    },
                    {
                        name: "Raeburn Cabernet Sauvignon, Sonoma",
                        description: undefined,
                        price: 12.00,
                        bulkPrice: 46.00,
                    },
                    {
                        name: "Carra Beaujolias Village, France",
                        description: undefined,
                        price: 12.00,
                        bulkPrice: 46.00,
                    },
                    {
                        name: "Montebuena Rioja, Spain",
                        description: undefined,
                        price: 9.00,
                        bulkPrice: 40.00,
                    }
                ]
            },
            {
                type: "BUBBLES",
                description: undefined,
                items: [
                    {
                        name: "Freixenet Prosecco Rose, Italy",
                        description: undefined,
                        price: 14.00,
                        bulkPrice: 54.00,
                    },
                    {
                        name: "Segura Viudas Brut, France",
                        description: undefined,
                        price: 14.00,
                        bulkPrice: 54.00,
                    }
                ]
            }
        ]
    }
}