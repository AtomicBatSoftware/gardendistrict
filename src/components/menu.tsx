import { MenuItem } from "@/components/menu-item"

export function Menu() {
  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6">OUR MENU</h1>

        <div className="flex justify-center mb-12">
          <button className="bg-[#1a1a1a] text-[#c17f59] px-12 py-2">MENU</button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Starters Section */}
          <div className="bg-white p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6">STARTERS</h2>

            <div className="space-y-6">
              <MenuItem
                name="Irish Channel Mussels"
                description="mussels | tomato & dry vermouth sauce | french bread"
                price="16.00"
              />

              <MenuItem
                name="Audubon Crawfish Beignets"
                description="crawfish | scallion | remoulade dipping sauce"
                price="12.00"
              />

              <MenuItem
                name="Garden District Dip"
                description="cajun shrimp & crawfish dip | french bread"
                price="14.00"
              />

              <MenuItem
                name="Uptown BBQ Shrimp"
                description="sautéed shrimp | garlic | worcestershire-spiked butter sauce | french bread"
                price="16.00"
              />
            </div>

            {/* Po Boys Section */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-4">PO BOYS</h2>
              <p className="text-sm mb-6">
                All come fully dressed with lettuce, tomato, pickle and remoulade sauce and a side of cajun fries |
                Add Etouffee to any po boy +$2.00
              </p>

              <div className="space-y-4">
                <MenuItem name="Shrimp" price="16.00" />
                <MenuItem name="Crawfish" price="16.00" />
                <MenuItem name="Catfish" price="16.00" />
              </div>
            </div>
          </div>

          {/* Main Course Section */}
          <div className="bg-white p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6">MAIN COURSE</h2>

            <div className="space-y-6">
              <MenuItem
                name="Gumbo Yaya"
                description="andouille sausage | rotisserie chicken | white rice | french bread"
                price="19.00"
              />

              <MenuItem
                name="Red Beans and Rice"
                description="pork belly | red beans | smoked sausage | white rice"
                price="19.00"
              />

              <MenuItem
                name="Southern Hospitality"
                description="crispy chicken thighs (2) | baked mac & cheese | side salad"
                price="22.00"
              />

              <MenuItem name="Etouffee" description="smothered shrimp & crawfish | white rice" price="23.00" />

              <MenuItem
                name="Cajun Tomahawk"
                description="cajun marinated pork tomahawk | seasonal vegetable | white rice"
                price="26.00"
              />

              <MenuItem
                name="Fried Seafood Platter"
                description="shrimp | catfish | crawfish | house made coleslaw | cajun fries"
                price="28.00"
              />

              <MenuItem
                name="Jambalaya"
                description="andouille sausage | shrimp | holy trinity | seasoned rice"
                price="18.00"
              />

              <MenuItem
                name="Blacked Fish of the Week"
                description="featured blackened fish | corn maque choux | white rice"
                price="18.00"
              />

              <MenuItem
                name="Muffulatta"
                description="olive salad | capicola | mortadella | salami | mozzarella"
                price="16.00"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
