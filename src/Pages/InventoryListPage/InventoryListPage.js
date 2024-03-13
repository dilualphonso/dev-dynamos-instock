import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { InventoriesList } from "../../Components/InventoriesList/InventoriesList";

const InventoryListPage = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  let endpoint = 'api/inventories';
  if (id) {
    endpoint = `api/warehouses/${id}/inventories`;
  }
  const inventoriesUrl = `${baseUrl}/${endpoint}`;

  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(inventoriesUrl);
        setInventories(response.data);
        console.log(inventories);
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
    return <p>No inventories available</p>
  }

  return (
    <InventoriesList inventories={inventories} warehouseId={id} />
  )
}

export default InventoryListPage;