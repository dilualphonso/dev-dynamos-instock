import './InventoriesList.scss'
import { Inventory } from '../Inventory/Inventory'

export const InventoriesList = ({ inventories, warehouseId }) => {
  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {inventories
          // .filter(
          //   (inventory =>
          //     inventory.item_name !== "Winter Jacket"
          //     && inventory.item_name !== "Watch"
          //     && inventory.item_name !== "Soap"))
          .map(
            (inventory =>
              <Inventory
                key={inventory.id}
                inventory={inventory}
                warehouseId={warehouseId} />))}
      </ul>
    </div>
  )
}