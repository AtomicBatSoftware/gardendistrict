interface MenuItemProps {
  name: string
  description?: string
  price: string
}

export function MenuItem({ name, description, price }: MenuItemProps) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold">{name}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        <div className="font-semibold whitespace-nowrap">${price}</div>
      </div>
    </div>
  )
}
