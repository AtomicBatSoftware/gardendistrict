interface MenuItemProps {
  name: string
  description?: string
  price?: string
  bulkPrice?: string // currently only used for wine by the bottle
}

export function MenuItemComponent({ name, description, price, bulkPrice }: MenuItemProps) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex justify-between items-start gap-4 mt-2">
        <div>
          <h3 className="font-semibold">{name}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        {
          price &&
            <div className="font-semibold whitespace-nowrap">
              ${price}{bulkPrice && ` / $${bulkPrice}`}
            </div>
          }
      </div>
    </div>
  )
}
