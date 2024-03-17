import "./InventoryDetails.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ReactComponent as ArrowBackIcon } from "../../assets/icons/arrow_back-24px.svg";
import { ReactComponent as EditWhiteIcon } from "../../assets/icons/edit-white-24px.svg";
import HeadingWithBackArrow from "../HeadingWithBackArrow/HeadingWithBackArrow";

export const InventoryDetails = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const endpoint = `api/inventories/${id}`;
  const inventoryUrl = `${baseUrl}/${endpoint}`;

  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(inventoryUrl);
        setInventory(response.data);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
      }
    };
    fetchInventory();
  }, [inventoryUrl]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return (
      <p>
        Unable to retrive Inventory with ID: {id} right now. Please try again
        later.
      </p>
    );
  }

  if (inventory.length === 0) {
    return;
  }

  const { warehouse_name, item_name, description, category, status, quantity } =
    inventory;

  return (
    <article className="inventory-detail">
      <div className="inventory-detail__header">
        <div className="inventory-detail__name">
          <HeadingWithBackArrow
            link={"/inventory"}
            heading={"Edit Inventory Item"}
          />
        </div>
        <div className="inventory-detail__edit-button-container">
          <button className="inventory-detail__edit-button">
            <Link
              to={`/inventory/${id}/edit`}
              className="inventory-detail__edit-link"
            >
              <EditWhiteIcon className="inventory-detail__edit-icon" />
              <span className="inventory-detail__edit-text">Edit</span>
            </Link>
          </button>
        </div>
      </div>
      <div className="inventory-detail__content">
        <div className="inventory-detail__details">
          <div className="inventory-detail__description">
            <p className="inventory-detail__label">ITEM DESCRIPTION</p>
            <p className="inventory-detail__text">{description}</p>
          </div>
          <div className="inventory-detail__category">
            <p className="inventory-detail__label">CATEGORY</p>
            <p className="inventory-detail__text">{category}</p>
          </div>
        </div>
        <div className="inventory-detail__status-quantity">
          <div className="inventory-detail__status-quantity-details">
            <div className="inventory-detail__status">
              <p className="inventory-detail__label">STATUS</p>
              <p
                className={`inventory-detail__text inventory-detail__text-status 
              ${quantity === 0 ? "red-text" : "green-text"}`}
              >
                {status}
              </p>
            </div>
            <div className="inventory-detail__quantity">
              <p className="inventory-detail__label">QUANTITY</p>
              <p className="inventory-detail__text">{quantity}</p>
            </div>
          </div>
          <div className="inventory-detail__warehouse">
            <p className="inventory-detail__label">WAREHOUSE</p>
            <p className="inventory-detail__text">{warehouse_name}</p>
          </div>
        </div>
      </div>
    </article>
  );
};
