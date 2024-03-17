import './WarehousesListPage.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import { Link } from 'react-router-dom';
import { BASE_URL } from "../../constant-variables.js";
import SearchMessage from '../../components/SearchMessege/SearchMessege';


function WarehousesListPage() {

    const [warehouses, setWarehouse] = useState([]);

    const [search, setSearch] = useState('');


    const [noResultMessage, setnoResultMessage] = useState("")
    const [completedUrl, setCompletedUrl] = useState(`${BASE_URL}/warehouses`);

    console.log(search);
    //display data
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get(
                    completedUrl
                );

                if (response.data.message=== "No result") {
                    setnoResultMessage(`No search result`);
                  } else {
                    setnoResultMessage(""); // Clear the message if there are results
                  }

                setWarehouse(response.data)

            }
            catch (error) {
                console.error("Error fetching warehouse:", error);
            }
        };
        fetchWarehouses();
    }, [completedUrl]);


    const handleAscClick = (sortingType) => {
        setCompletedUrl(`${BASE_URL}/warehouses?sort_by=${sortingType}&order_by=asc`);
    };

    const handleDescClick = (sortingType) => {
        setCompletedUrl(`${BASE_URL}/warehouses?sort_by=${sortingType}&order_by=desc`);
    };
    const handleChange = e => {

        const inputValue = e.target.value;
        setSearch(inputValue); // Update 'searchValue' with input value
        setCompletedUrl(`${BASE_URL}/warehouses?s=${inputValue}`);


    }
    return (
        <section className="warehouses">

            <div className="warehouses__top-container">
                <h1 className="warehouses__title">Warehouses</h1>

                <div className="warehouses__left-wrapper">
                    <div>
                        <input onChange={handleChange} name='searching' value={search} className='warehouses__search' type="text" placeholder="Search..." />
                    </div>


                    <div>
                        <Link to="/warehouses/add"> <button className="warehouses__button">+ Add New Warehouse</button></Link>
                    </div>
                </div>

            </div>
            {/* <section> */}
                <WarehouseList warehouses={warehouses} setWarehouses={setWarehouse} handleAscClick={handleAscClick} handleDescClick={handleDescClick}setSearch={setSearch} search={search} noResultMessage={noResultMessage}  />
            {/* </div> */}
            <section>






                {noResultMessage && <SearchMessage setnoResultMessage={setnoResultMessage} noResultMessage={noResultMessage} />}
            </section>


        </section>
    );
}

export default WarehousesListPage;
