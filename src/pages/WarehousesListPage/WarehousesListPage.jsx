import './WarehousesListPage.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList";

function WarehousesListPage (){

    const [warehouses, setWarehouse] = useState([]);

    useEffect (()=>{
            const fetchWarehouses = async ()=>{
                try {
                const response = await axios.get(
                    `http://localhost:8080/api/warehouses`
                  );

                  setWarehouse(response.data)
                }
             catch (error) {
                console.error("Error fetching videos:", error);
              }
            };
            fetchWarehouses();
        },[]);


    return (
        <section className="warehouses">
            <div className="warehouses__top-container">
            <h1 className="warehouses__title">Warehouses</h1>
             <div className="warehouses__left-wrapper">
            <div>
            <input className='warehouses__search' type = "text" placeholder="Search..."/>
           </div>
    <div>
    <button className="warehouses__button">+ Add New Warehouse</button>
    </div>
    </div>

    </div>
    <section>
     <WarehouseList warehouses={warehouses}/>
        </section>

    </section>
    );
}

export default  WarehousesListPage;
