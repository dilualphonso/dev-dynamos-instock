import "./InventoriesList.scss";
import { InventoryItem } from "../InventoryItem/InventoryItem";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Sorting from "../Sorting/Sorting";

export const InventoriesList = ({ id }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  let endpoint = "api/inventories";
  if (id) {
    endpoint = `api/warehouses/${id}/inventories`;
  }
  const inventoriesUrl = `${baseUrl}/${endpoint}`;

  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [completedUrl, setCompletedUrl] = useState(inventoriesUrl);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(completedUrl);
        setInventories(response.data);
        setIsLoading(false);
      } catch (err) {
        setHasError(true);
      }
    };

    fetchInventories();
  }, [completedUrl]);

  if (hasError) {
    return (
      <p>Unable to access inventories right now. Please try again later.</p>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (inventories.length === 0) {
    return;
  }

  const handleAscClick = (sortingType) => {
    setCompletedUrl(`${inventoriesUrl}?sort_by=${sortingType}&order_by=asc`);
  };

  const handleDescClick = (sortingType) => {
    setCompletedUrl(`${inventoriesUrl}?sort_by=${sortingType}&order_by=desc`);
  };

  return (
    <article className="inventories-list">
      {!id && (
        <div className="inventories-list__header">
          <h1 className="inventories-list__title">Inventory</h1>
          <div className="inventories-list__actions">
            <form
              action="/search"
              method="get"
              className="inventories-list__search-container"
            >
              <input
                type="search"
                className="inventories-list__search"
                placeholder="Search..."
              ></input>
            </form>
            <button className="inventories-list__button">
              <Link to="/inventory/add" className="link-white">
                {" "}
                + Add New Item
              </Link>
            </button>
          </div>
        </div>
      )}

      <div className='inventories-list__labels'>
        <div className='inventories-list__labels__container'>
          <div className='inventories-list__labels__wrapper'>
            <div className='inventories-list__labels-left'>
              <div className="inventories-list__labels__item">
                <p className="inventories-list__label inventories-list__labels--item">INVENTORY ITEM</p>
                <Sorting onAscClick={() => handleAscClick('item_name')} onDescClick={() => handleDescClick('item_name')} />
              </div>
              <div className="inventories-list__labels__category">
                <p className="inventories-list__label inventories-list__labels--category">CATEGORY</p>
                <Sorting onAscClick={() => handleAscClick('category')} onDescClick={() => handleDescClick('category')} />
              </div>
            </div>
            <div className="inventories-list__labels-right">
              <div className="inventories-list__labels__status">
                <p className="inventories-list__label inventories-list__labels--status">STATUS</p>
                <Sorting onAscClick={() => handleAscClick('status')} onDescClick={() => handleDescClick('status')} />
              </div>
              <div className="inventories-list__lables__quantity">
                <p className="inventories-list__label inventories-list__labels--qty">{id && window.innerWidth >= 768 ? 'QUANTITY' : 'QTY'}</p>
                <Sorting onAscClick={() => handleAscClick('quantity')} onDescClick={() => handleDescClick('quantity')} />
              </div>
            </div>
          </div>
          <div className={`inventories-list__labels__warehouse ${id ? 'inventories-list__labels__warehouse--has-warehouse' : ''}`}>
            {!id && (
              <p className="inventories-list__label inventories-list__labels--warehouse">WAREHOUSE</p>
            )}
            {!id && (
              <Sorting onAscClick={() => handleAscClick('warehouse_name')} onDescClick={() => handleDescClick('warehouse_name')} />
            )}
          </div>
        </div>
        <div className="inventories-list__labels__actions">
          <p className="inventories-list__label inventories-list__labels--actions">ACTIONS</p>
        </div>
      </div>

      <ul className="inventories-list__items">
        {inventories.map((inventory) => (
          <InventoryItem
            key={inventory.id}
            inventory={inventory}
            warehouseId={id}
            setInventories={setInventories}
          />
        ))}
      </ul>

    </article>
  );
};
