import './InventoriesList.scss'
import { InventoryItem } from '../InventoryItem/InventoryItem'

export const InventoriesList = ({ inventories, warehouseId }) => {
  return (
    <section className="inventories-list">
      <div className="inventories-list__header">
        <h1 className="inventories-list__title">Inventory</h1>
        <div className="inventories-list__actions">
          <form action="/search" method="get" className="inventories-list__search-container">
            <input type="search" className="inventories-list__search" placeholder="Search..."></input>
          </form>
          <button className="inventories-list__add-button">Add New Item</button>
        </div>
      </div>

      <div className="inventories-list__labels">
        <p className="inventories-list__label">INVENTORY ITEM</p>
        <p className="inventories-list__label">CATEGORY</p>
        <p className="inventories-list__label">STATUS</p>
        <p className="inventories-list__label">QTY</p>
        <p className="inventories-list__label">WAREHOUSE</p>
        <p className="inventories-list__label">ACTIONS</p>
      </div>

      <ul className="inventories-list__items">
        {inventories.map(
          (inventory) => (
            <InventoryItem
              key={inventory.id}
              inventory={inventory}
              warehouseId={warehouseId} />
          )
        )}
      </ul>
    </section>
  )

}