import './WarehouseList.scss';

import ArrowImage from "../../assets/Icons/chevron_right-24px.svg"
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg"
import editIcon from "../../assets/Icons/edit-24px.svg"
function WarehouseList ({warehouses}){
  // console.log(warehouses);

    return (
        <section className="warehouse">

        <div>



      {warehouses.map((warehouse) => (
        <div key={warehouse.id}>
               <hr className="warehouse__divider"/>

               <div className="warehouse__container">

<div className="warehouse__left-container">
          <div className="warehouse__name-container">

            <h4 className="warehouse__name-label">Warehouse</h4>
            <div className="warehouse__arrow-wrapper">
            <div className="warehouse__name">{warehouse.warehouse_name}</div>
            <img className="warehouse__arrowImg" src={ArrowImage} alt= "arrowImage"/>
            </div>


          </div>
          <div className="warehouse__address-container">
            <h4 className="warehouse__address-label">Address</h4>
            <div className="warehouse__address">{warehouse.address},<div>{warehouse.city},{warehouse.country}</div></div>
          </div>
          <img src ={deleteIcon} alt ="delete-trash"/>
          </div>
          <div className="warehouse__right-container">
          <div className="warehouse__contact-name-container">
            <h4 className="warehouse__contact-name-label">Contact Name</h4>
            <div className="warehouse__contact-name">{warehouse.contact_name}</div>
          </div>

          <div className="warehouse__contact-info-container">
            <h4 className="warehouse__contact-info-label">Contact Information</h4>
            <div className="warehouse__contact-phone" >{warehouse.contact_phone}</div>
            <div className="warehouse__contact-email">{warehouse.contact_email}</div>
          </div>
            <img className ="warehouse__edit-icon"src={editIcon} alt="edit-icon" />
          </div>
          </div>

        </div>
      ))}
    </div>

    </section>
    );
}

export default  WarehouseList;