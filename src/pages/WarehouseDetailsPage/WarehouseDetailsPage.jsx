import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../constant-variables";
import axios from "axios";
import { InventoriesList } from "../../components/InventoriesList/InventoriesList";
import "./WarehouseDetailsPage.scss";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import Edit from "../../assets/icons/edit-white-24px.svg";

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
      <div className="single-warehouse-container">
        <div className="nav-link">
          <Link className="nav-link__city" to={"/warehouses"}>
            <img
              src={BackArrow}
              alt="Back arrow icon which navigates back to warehouse page"
            />
            <h1>{warehouse.city}</h1>
          </Link>

          <Link
            className="nav-link__edit-container"
            to={`/warehouses/${warehouse.id}/edit`}
          >
            <img
              className="nav-link__edit"
              src={Edit}
              alt="Edit button which navigate to edit page"
            />
            <div className="nav-link__edit--tablet">Edit</div>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="information-container">
          <div className="warehouse-address">
            <h4>WAREHOUSE ADDRESS</h4>
            <div className="warehouse-address__location">
              <p>{`${warehouse.address}, `}</p>
              <div>
                <p>{`${warehouse.city}, `}</p>
                <p>{`${warehouse.country}, `}</p>
              </div>
            </div>
          </div>
          <div className="contact">
            <div className="contact__name">
              <h4>CONTACT NAME</h4>
              <p>{warehouse.contact_name}</p>
              <p>{warehouse.contact_position}</p>
            </div>
            <div className="contact-details">
              <h4>CONTACT INFORMATION</h4>
              <p>{warehouse.contact_phone}</p>
              <p>{warehouse.contact_email}</p>
            </div>
          </div>
        </div>
      </div>
      <InventoriesList id={id} />
    </div>
  );
};
export default WarehouseDetailsPage;
