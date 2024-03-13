import './Inventory.scss'
import { Link } from 'react-router-dom';

export const Inventory = ({ inventory, warehouseId }) => {
  const {
    id,
    warehouse_name,
    item_name,
    category,
    status,
    quantity
  } = inventory;

  return (
    <li className='inventory'>
      <div>
        <p>INVENTORY ITEM</p>
        <p>{item_name}</p>
      </div>
      <div>
        <p>CATEGORY</p>
        <p>{category}</p>
      </div>
      <div>
        <p>STATUS</p>
        <p>{status}</p>
      </div>
      <div>
        {/* /inventories/: desktop/tablet/mobile:QTY,  */}
        {/* /warehouses/1/inventories: desktop:QUANTITY; tablet/mobile:QTY,  */}
        <p>QTY</p>
        {/* <p>QUANTITY</p> */}
        <p>{quantity}</p>
      </div>
      <div className={`inventory-warehouse ${warehouseId ? 'warehouse-inventory':''}`}>
        <p>WAREHOUSE</p>
        <p>{warehouse_name}</p>
      </div>
      <div>
        <p>ACTIONS</p>
        <button></button>
        <button></button>
      </div>
    </li>
  )
}