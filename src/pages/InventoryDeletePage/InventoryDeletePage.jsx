
import axios from "axios";

function InventoryDeletePage({ setDeleteConfirm, inventoryId, inventoryName, setInventories }){


    const deleteInventory = async (inventoryId) => {
        try {
            await axios.delete(`http://localhost:8080/api/inventories/${inventoryId}`);

            // Fetch updated list after deletion
             const deleteResponse = await axios.get('http://localhost:8080/api/inventories');
             console.log(`Warehouse ${inventoryId} was deleted`);
            setInventories(deleteResponse.data);

            setDeleteConfirm(false); // Close the modal after successful deletion
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <div className="popup">
            <div className="popup__container">

                <button className="popup__closeBtn"
                    onClick={() => {
                        setDeleteConfirm(false);
                    }}
                >
                    x
                </button>
                <div className="popup__wrapper">
                <div className="popup__text-container">
                    <div className="popup__title1">
                        <h1 className="popup__title">Delete {inventoryName} warehouse?</h1>
                    </div>
                    <div className="popup__body-container">
                        <p className="popup__body">Please confirm that you'd like to delete the {inventoryName} from the list of warehouses.You won't be able to undo this action. </p>
                    </div>
                </div>
                <div className="popup__footer">
                    <button className="popup__cancel"
                        onClick={() => {
                            setDeleteConfirm(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button onClick={() => deleteInventory(inventoryId)} className="popup__delete">Delete</button>
                </div>
                </div>
            </div>
        </div>

    );
}
export default InventoryDeletePage;