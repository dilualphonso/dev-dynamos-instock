import './InventoryItem.scss'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete_outline-24px.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-24px.svg';
import { ReactComponent as ChevronRightIcon } from '../../assets/icons/chevron_right-24px.svg';
import InventoryDeletePage from "../../pages/InventoryDeletePage/InventoryDeletePage"
export const InventoryItem = ({ inventory, warehouseId ,setInventories}) => {
  const {
    id,
    warehouse_name,
    item_name,
    category,
    status,
    quantity
  } = inventory;

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const [selectedInventoryName, setSelectedInventoryName] = useState(null);

  const handleDeleteClick = (inventoryId,inventoryName) => {
    setDeleteConfirm(true);
    setSelectedInventoryId(inventoryId);
    setSelectedInventoryName(inventoryName);
    console.log('a popup window is needed');
  }

  return (
    <section>
    <li className='inventory'>
      <div className='inventory__box'>
        <div className='inventory__container'>
          <div className='inventory__wrapper'>
            <div className='inventory__details inventory__details-left'>
              <div className="inventory__item">
                <p className="inventory__label">INVENTORY ITEM</p>
                <Link to={`/inventory/${id}`} className="inventory__value inventory__item-name">
                  {item_name}
                  <ChevronRightIcon className="inventory__item-name-icon" />
                </Link>
              </div>
              <div className="inventory__category">
                <p className="inventory__label">CATEGORY</p>
                <p className="inventory__value">{category}</p>
              </div>
            </div>
            <div className="inventory__details inventory__details-right">
              <div className="inventory__status">
                <p className="inventory__label">STATUS</p>
                <p className={`inventory__value inventory__status-text ${quantity === 0 ? 'red-text' : 'green-text'}`}>{status}</p>
              </div>
              <div className="inventory__quantity">
                {/* /inventories/: desktop/tablet/mobile:QTY,  */}
                {/* /warehouses/1/inventories: desktop:QUANTITY; tablet/mobile:QTY,  */}
                <p className="inventory__label">QTY</p>
                {/* <p>QUANTITY</p> */}
                <p className="inventory__value">{quantity}</p>
              </div>
            </div>
          </div>
          <div className={`inventory__warehouse ${warehouseId ? 'inventory__warehouse--has-warehouse' : ''}`}>
            <p className="inventory__label">WAREHOUSE</p>
            <p className="inventory__value">{warehouse_name}</p>
          </div>
        </div>
        <div className="inventory__actions">
          <div className="inventory__action-button inventory__action-delete-button" onClick={() => handleDeleteClick(id,item_name)}>
            <DeleteIcon />
          </div>
          <Link to={`/inventory/${id}/edit`} className="inventory__action-button inventory__action-edit-button">
            <EditIcon />
          </Link>
        </div>
      </div>

    </li>
    {deleteConfirm && <InventoryDeletePage setDeleteConfirm={setDeleteConfirm} inventoryId={selectedInventoryId} inventoryName={selectedInventoryName} setInventories={setInventories}/>}
    </section>

  )
}