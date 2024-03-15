import './WarehouseList.scss';

import arrowImage from "../../assets/icons/chevron_right-24px.svg"
import deleteIcon from "../../assets/icons/delete_outline-24px.svg"
import editIcon from "../../assets/icons/delete_outline-24px.svg"
import sortIcon from "../../assets/icons/edit-24px.svg"
function WarehouseList({ warehouses }) {
  // console.log(warehouses);

  return (
    <section className="warehouse">

      <div className= "warehouse__box">
        <div className="warehouse__tab-headings">
          <div className="warehouse__headings-name">
            <h4 className="warehouse__name-heading">Warehouse</h4>
            <img className="warehouse__sort" src={sortIcon} alt="sorting icon" />
          </div>
          <div className="warehouse__headings-address">
            <h4 className="warehouse__address-heading">Address</h4>
            <img className="warehouse__sort" src={sortIcon} alt="sorting icon" />
          </div>
          <div className="warehouse__headings-contact-name">
            <h4 className="warehouse__contact-name-heading">Contact Name</h4>
            <img className="warehouse__sort" src={sortIcon} alt="sorting icon" />
          </div>
          <div className="warehouse__headings-contact-info">
            <h4 className="warehouse__contact-info-heading">Contact Information</h4>
            <img className="warehouse__sort" src={sortIcon} alt="sorting icon" />
          </div>

          <h4 className="warehouse__actions">Actions</h4>

          {/* <img className="warehouse__sort" src={sortIcon} alt="sorting icon" /> */}
        </div>

        {warehouses.map((warehouse) => (

          <div className="warehouse__test" key={warehouse.id}>

            <div className='warehouse__wrapper'>

              <div className="warehouse__container">

                <div className="warehouse__left-container">
                  <div className="warehouse__name-container">

                    <h4 className="warehouse__name-label">Warehouse</h4>
                    <div className="warehouse__arrow-wrapper">
                      <div className="warehouse__name">{warehouse.warehouse_name}</div>
                      <img className="warehouse__arrowImg" src={arrowImage} alt="arrowImage" />
                    </div>


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
                <img className="warehouse__delete-icon" src={deleteIcon} alt="delete-trash" />
                <img className="warehouse__edit-icon" src={editIcon} alt="edit-icon" />
              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WarehouseList;