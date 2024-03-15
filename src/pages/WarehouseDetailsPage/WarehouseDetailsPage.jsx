import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Router,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { BASE_URL } from "../../constant-variables";
import axios from "axios";
import { InventoriesList } from "../../components/InventoriesList/InventoriesList";

const WarehouseDetailsPage = (props) => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [error, setError] = useState(null);
  console.log(BASE_URL);
  useEffect(() => {
    const getWarehouse = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/warehouses/${id}`);
        console.log(response.data);
        setWarehouse(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getWarehouse();
  }, [id]);
  if (error) {
    return <div>Error:{error}</div>;
  }
  if (!warehouse) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link className="wh-details" to={"/warehouse/edit" + warehouse.id}>
        <button className="wh-details__edit">
          <svg width="24" height="24" viewBox="0 0 24 24"></svg>
        </button>
      </Link>
      <div>
        <p>WAREHOUSE ADDRESS</p>
        <p>{warehouse.address}</p>
        <p>{warehouse.city}</p>
        <p>{warehouse.country}</p>
        <p>CONTACT NAME</p>
        <p>{warehouse.contact_name}</p>
        <p>{warehouse.contact_position}</p>
        <p>CONTACT INFORMATION</p>
        <p>{warehouse.contact_phone}</p>
        <p>{warehouse.contact_email}</p>
      </div>
      <InventoriesList id={id} />
    </div>
  );
};
export default WarehouseDetailsPage;
