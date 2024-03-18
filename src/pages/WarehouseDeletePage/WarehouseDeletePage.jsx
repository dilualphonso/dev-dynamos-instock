import "./WarehouseDeletePage.scss";
import axios from "axios";
import closeX from "../../assets/icons/close-24px.svg";

function WarehouseDeletePage({
  setOpenModal,
  warehouseId,
  warehouseName,
  setWarehouses,
}) {
  const deleteWarehouse = async (warehouseId) => {
    try {
      await axios.delete(`http://localhost:8080/api/warehouses/${warehouseId}`);

      // Fetch updated list after deletion
      const deleteResponse = await axios.get(
        "http://localhost:8080/api/warehouses"
      );
      setWarehouses(deleteResponse.data);

      setOpenModal(false); // Close the modal after successful deletion
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="popup">
      <div className="popup__container">
        <div className="popup__top-btn-container">
          <button
            className="popup__closeBtn"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <img className="popup__closeIcon" src={closeX} alt="X for close" />
          </button>
        </div>
        <div className="popup__wrapper">
          <div className="popup__text-container">
            <div className="popup__title1">
              <h1 className="popup__title">
                Delete {warehouseName} warehouse?
              </h1>
            </div>
            <div className="popup__body-container">
              <p className="popup__body">
                Please confirm that you'd like to delete the {warehouseName}{" "}
                from the list of warehouses. You won't be able to undo this
                action.{" "}
              </p>
            </div>
          </div>
          <div className="popup__footer">
            <button
              className="popup__cancel"
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteWarehouse(warehouseId)}
              className="popup__delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseDeletePage;
