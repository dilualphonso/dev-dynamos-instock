import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeadingWithBackArrow from "../../components/HeadingWithBackArrow/HeadingWithBackArrow";
import "./InventoryEditPage.scss";
import { BASE_URL } from "../../constant-variables";
import axios from "axios";
import InventoryItemForm from "../../components/InventoryItemForm/InventoryItemForm";
// add form here and include axios call to get the inventory item that is going to be edited (Ilaria)
function InventoryEditPage() {
  // Get the inventory item id from the browser path
  const { id } = useParams();

  // State variables for page
  const [inventoryData, setInventoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Grab the warehouse object from the database. If it doesn't exist, return the user to the warehouse list page
  // TODO: add a message to the user stating that there is no warehouse with this id?
  //UseEffect Hook to ensure program doesn't end up in an infinite loop setting the warehouse to edit
  useEffect(() => {
    /**
     * getWarehouseDetails is an asynchronous function that makes the api request to get the warehouse object based on the warehouse id in the url path params.
     */
    const getInventoryDetails = async () => {
      try {
        //Get the warehouse details from the api using the given id
        const response = await axios.get(`${BASE_URL}/inventories/${id}`);

        //Set the warehouse details state variable to the received warehouse details object and indicate that the webpage has finished loading
        setInventoryData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        // TODO: notify the user that something went wrong outside of a console log

        // Set the Warhouse Data to null and stop loading
        setInventoryData(null);
        setIsLoading(false);
      }
    };

    getInventoryDetails();
  }, [id]);

  // Display "Loading..." while getting the warehouse data
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log("what", inventoryData);
  // Return to the homepage if the is no warehouse object returned from the server request
  if (!inventoryData) {
    return <Navigate to="/inventory" />;
  }
  return (
    <section className="edit-inventory">
      <div className="edit-inventory__heading-container">
        <HeadingWithBackArrow
          link={`/inventory/${id}`}
          heading={"Edit Inventory Item"}
        />
      </div>
      <InventoryItemForm itemToEdit={inventoryData} />
    </section>
  );
}
export default InventoryEditPage;
