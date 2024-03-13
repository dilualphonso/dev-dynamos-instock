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
  // console.log(warehouses);

    return (
        <section className="warehouses">
            <h1 className="warehouses__title">Warehouses</h1>
        <div>
            <div>
            <input type = "text" placeholder="Search"/>
           </div>
    <div>
    <button className="warehouses__button">Add New Warehouse</button>
    </div>


    </div>
    <section>
     <WarehouseList warehouses={warehouses}/>
        </section>

    </section>
    );
}

export default  WarehousesListPage;