import { useEffect, useState } from "react";
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import "./WarehousesEditPage.scss";
import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constant-variables";
import HeadingWithBackArrow from "../../components/HeadingWithBackArrow/HeadingWithBackArrow";

function WarehousesEditPage() {
  // Get the warehouse id from the browser path
  const { id } = useParams();

  // State variables for page
  const [warehouseData, setWarehouseData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Grab the warehouse object from the database. If it doesn't exist, return the user to the warehouse list page
  // TODO: add a message to the user stating that there is no warehouse with this id?
  //UseEffect Hook to ensure program doesn't end up in an infinite loop setting the warehouse to edit
  useEffect(() => {
    /**
     * getWarehouseDetails is an asynchronous function that makes the api request to get the warehouse object based on the warehouse id in the url path params.
     */
    const getWarehouseDetails = async () => {
      try {
        //Get the warehouse details from the api using the given id
        const response = await axios.get(`${BASE_URL}/warehouses/${id}`);

        //Set the warehouse details state variable to the received warehouse details object and indicate that the webpage has finished loading
        setWarehouseData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        // TODO: notify the user that something went wrong outside of a console log

        // Set the Warhouse Data to null and stop loading
        setWarehouseData(null);
        setIsLoading(false);
      }
    };

    getWarehouseDetails();
  }, [id]);

  // Display "Loading..." while getting the warehouse data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Return to the homepage if the is no warehouse object returned from the server request
  if (!warehouseData) {
    return <Navigate to="/" />;
  }

  return (
    <section className="edit-warehouse">
      <div className="edit-warehouse__heading-container">
        <HeadingWithBackArrow
          link={`/warehouses/${id}`}
          heading={"Edit Warehouse"}
        />
      </div>
      <WarehouseForm warehouseToEdit={warehouseData} />
    </section>
  );
}

export default WarehousesEditPage;
