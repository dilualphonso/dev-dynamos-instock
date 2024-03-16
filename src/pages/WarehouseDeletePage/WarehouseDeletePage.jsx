import { useState } from "react";
import "./WarehouseDeletePage.scss"
import axios from "axios";
import { Link } from 'react-router-dom';


function WarehouseDeletePage({ setOpenModal,warehouseId, warehouseName,warehouses  }) {

    const [warehousesList, setWarehousesList] = useState([...warehouses]);
console.log(warehouseId);
console.log(warehouseName);



const deleteWarehouse = async (warehouseId)=> {

    try{
        await axios.delete(
            `http://localhost:8080/api/warehouses/${warehouseId}`
          )

            setOpenModal(false);

         const updatedWarehouseList = warehousesList.filter(
            (warehouse) => warehouse.id !== warehouseId
          );
          setWarehousesList(updatedWarehouseList);


    }
    catch (error){
        console.error(error);
    }

}



    return (
        <div className="popup">
            <div className="popup__container">

                    <button className="popup__closeBtn"
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>

                <div className="popup__title1">
                    <h1 className="popup__title">Delete {warehouseName} warehouse?</h1>
                </div>
                <div className="popup__body-container">
                    <p className ="popup__body">Please confirm that you'd like to delete the {warehouseName} from the list of warehouses.You won't be able to undo this action. </p>
                </div>
                <div className="popup__footer">
                    <button className="popup__cancel"
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                 <button onClick={() => deleteWarehouse(warehouseId)} className="popup__delete">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default WarehouseDeletePage;