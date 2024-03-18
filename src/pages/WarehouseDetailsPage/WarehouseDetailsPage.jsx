import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../constant-variables";
import axios from "axios";
import { InventoriesList } from "../../components/InventoriesList/InventoriesList";
import "./WarehouseDetailsPage.scss";
import Edit from "../../assets/icons/edit-white-24px.svg";
import HeadingWithBackArrow from "../../components/HeadingWithBackArrow/HeadingWithBackArrow";

const WarehouseDetailsPage = (props) => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWarehouse = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/warehouses/${id}`);
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
    <section className="single-warehouse-page">
      <div className="single-warehouse-container">
        <div className="nav-link">
          <HeadingWithBackArrow
            className="nav-link__city"
            link={"/warehouses"}
            heading={warehouse.warehouse_name}
          />

          <Link
            className="nav-link__edit-container"
            to={`/warehouses/${warehouse.id}/edit`}
          >
            <div className="nav-link__button-content">
              <img
                className="nav-link__edit-icon"
                src={Edit}
                alt="Edit button which navigate to edit page"
              />
              <div className="nav-link__edit-tablet">Edit</div>
            </div>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="information-container">
          <div className="warehouse-address">
            <h4>WAREHOUSE ADDRESS:</h4>
            <div className="warehouse-address__location">
              <p>{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</p>
            </div>
          </div>
          <div className="contact">
            <div className="contact__name">
              <h4>CONTACT NAME:</h4>
              <p>{warehouse.contact_name}</p>
              <p>{warehouse.contact_position}</p>
            </div>
            <div className="contact-details">
              <h4>CONTACT INFORMATION:</h4>
              <p>{warehouse.contact_phone}</p>
              <p>{warehouse.contact_email}</p>
            </div>
          </div>
        </div>
      </div>
      <InventoriesList id={id} />
    </section>
  );
};
export default WarehouseDetailsPage;
