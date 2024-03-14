import './InventoriesList.scss'
import { InventoryItem } from '../InventoryItem/InventoryItem'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

export const InventoriesList = ({ id }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  let endpoint = 'api/inventories';
  console.log(id);
  if (id) {
    endpoint = `api/warehouses/${id}/inventories`;
  }
  const inventoriesUrl = `${baseUrl}/${endpoint}`;
  console.log(inventoriesUrl);

  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(inventoriesUrl);
        setInventories(response.data);
        setIsLoading(false);
      } catch (err) {
        setHasError(true);
      }
    }

    fetchInventories();
  }, [inventoriesUrl])

  if (hasError) {
    return <p>Unable to access inventories right now. Please try again later.</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (inventories.length === 0) {
    return;
  }

  return (
    <section className="inventories-list">
      {!id &&
        <div className="inventories-list__header">
          <h1 className="inventories-list__title">Inventory</h1>
          <div className="inventories-list__actions">
            <form action="/search" method="get" className="inventories-list__search-container">
              <input type="search" className="inventories-list__search" placeholder="Search..."></input>
            </form>
            <button className="inventories-list__button">
              <Link to="/inventory/add" className="link-white">+ Add New Item</Link>
            </button>
          </div>
        </div>
      }
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
              warehouseId={id} />
          )
        )}
      </ul>
    </section>
  )
}