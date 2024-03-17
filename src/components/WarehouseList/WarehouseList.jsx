import './WarehouseList.scss';

import arrowImage from "../../assets/icons/chevron_right-24px.svg"
import deleteIcon from "../../assets/icons/delete_outline-24px.svg"
import editIcon from "../../assets/icons/edit-24px.svg"
import sortIcon from "../../assets/icons/sort-24px.svg"
import WarehouseDeletePage from "../../pages/WarehouseDeletePage/WarehouseDeletePage"
import { useState } from 'react';
import { Link} from 'react-router-dom';
import Sorting from "../Sorting/Sorting";


function WarehouseList({ warehouses , setWarehouses, handleAscClick, handleDescClick}) {

  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [selectedWarehouseName, setSelectedWarehouseName] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteClick = (warehouseId,warehouseName) => {
    setSelectedWarehouseId(warehouseId);
    setSelectedWarehouseName(warehouseName);
    setModalOpen(true);
  };




  return (
    <section className="warehouse">

      <div className= "warehouse__box">
        <div className="warehouse__tab-headings">
          <div className="warehouse__headings-name">
            <h4 className="warehouse__name-heading">Warehouse</h4>
            <Sorting onAscClick={() => handleAscClick('warehouse_name')} onDescClick={() => handleDescClick('warehouse_name')} />
          </div>
          <div className="warehouse__headings-address">
            <h4 className="warehouse__address-heading">Address</h4>
            <Sorting onAscClick={() => handleAscClick('address,city,country')} onDescClick={() => handleDescClick('address,city,country')} />
          </div>
          <div className="warehouse__headings-contact-name">
            <h4 className="warehouse__contact-name-heading">Contact Name</h4>
            <Sorting onAscClick={() => handleAscClick('contact_name')} onDescClick={() => handleDescClick('contact_name')} />
          </div>
          <div className="warehouse__headings-contact-info">
            <h4 className="warehouse__contact-info-heading">Contact Information</h4>
            <Sorting onAscClick={() => handleAscClick('contact_phone,contact_email')} onDescClick={() => handleDescClick('contact_phone,contact_email')} />
          </div>

          <h4 className="warehouse__actions">Actions</h4>

          {/* <img className="warehouse__sort" src={sortIcon} alt="sorting icon" /> */}
        </div>


        {warehouses.length >0 && warehouses
.map((warehouse) => (

          <div className="warehouse__test" key={warehouse.id}>

            <div className='warehouse__wrapper'>

              <div className="warehouse__container">

                <div className="warehouse__left-container">
                  <div className="warehouse__name-container">

                    <h4 className="warehouse__name-label">Warehouse</h4>
               <Link to ={`/warehouses/${warehouse.id}`}> <div className="warehouse__arrow-wrapper">
                      <div className="warehouse__name">{warehouse.warehouse_name}</div>
                      <img className="warehouse__arrowImg" src={arrowImage} alt="arrowImage" />
                    </div></Link>


                  </div>
                  <div className="warehouse__address-container">
                    <h4 className="warehouse__address-label">Address</h4>
                    <p className="warehouse__address">{warehouse.address}, {warehouse.city}, {warehouse.country}</p>
                  </div>

                </div>
                <div className="warehouse__right-container">
                  <div className="warehouse__contact-name-container">
                    <h4 className="warehouse__contact-name-label">Contact Name</h4>
                    <div className="warehouse__contact-name">{warehouse.contact_name}</div>
                  </div>

                  <div className="warehouse__contact-info-container">
                    <h4 className="warehouse__contact-info-label">Contact Information</h4>
                    <div className='warehouse__contact-info'>
                      <div className="warehouse__contact-phone" >{warehouse.contact_phone}</div>
                      <div className="warehouse__contact-email">{warehouse.contact_email}</div>
                    </div>
                  </div>

                </div>


              </div>
              <div className='warehouse__icons'>
          <button className= "warehouse__delete-btn" onClick={() => handleDeleteClick(warehouse.id,warehouse.warehouse_name)}><img className="warehouse__delete-icon" src={deleteIcon} alt="delete-trash" /></button>

             <Link to={`/warehouses/${warehouse.id}/edit`} >  <button className="warehouse__edit-icon"><img src={editIcon} alt="edit-icon" /></button> </Link>
              </div>

            </div>

          </div>

        ))
      }


      </div>
      {modalOpen && <WarehouseDeletePage setOpenModal={setModalOpen} warehouseId={selectedWarehouseId} warehouseName={selectedWarehouseName} setWarehouses={setWarehouses}/>}

    </section>
  );
}

export default WarehouseList;