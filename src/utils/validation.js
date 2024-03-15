/**
 * validateWarehouseForm is a helper function that checks if the provided warehouse object meets all validation requirements to be posted to be created in the backend of the website.
 * 
 * @param {Object}      warehouse 
 * 
 * @returns {Object}
 */
export function validateWarehouseForm(warehouse){
    let hasErrors = false;
    let phoneErrMsg = "";
    let emailErrMsg = "";

    // Check if any if the non-formatted fields are empty
    if(isFieldEmpty(warehouse.warehouse_name) || isFieldEmpty(warehouse.address)
    || isFieldEmpty(warehouse.city) || isFieldEmpty(warehouse.country)
    || isFieldEmpty(warehouse.contact_name) || isFieldEmpty(warehouse.contact_position)){
        hasErrors = true;
    }

    // Check what type of error (if any) the phone number field has
    if(isFieldEmpty(warehouse.contact_phone)){
        hasErrors = true;
        phoneErrMsg = "This field is required";
    }else if(!isPhoneFormatValid(warehouse.contact_phone)){
        hasErrors = true;
        phoneErrMsg = "Invalid format. [Example: +1 (321) 456-7890 ]"
    }

    // Check what type of error (if any) the email field has
    if(isFieldEmpty(warehouse.contact_email)){
        hasErrors = true;
        emailErrMsg = "This field is required";

    }else if(!isEmailFormatValid(warehouse.contact_email)){
        hasErrors = true;
        emailErrMsg = "Invalid format"
    }

    // Create an object that has all information the form will need to populate error fields (if necessary)
    const errorsRecord = {
        errorsExist: hasErrors, 
        isWarehouseNameError: isFieldEmpty(warehouse.warehouse_name),
        isAddressError: isFieldEmpty(warehouse.address),
        isCityError: isFieldEmpty(warehouse.city),
        isCountryError: isFieldEmpty(warehouse.country),
        isContactNameError: isFieldEmpty(warehouse.contact_name),
        isPositionError: isFieldEmpty(warehouse.contact_position),
        isPhoneError: phoneErrMsg,
        isEmailError: emailErrMsg
    };

    // Return the validation results
    return errorsRecord;
}

 /**
 * isFieldEmpty is a helper function that checks if the given input is an empty string
 * 
 * @param {string}      input 
 * 
 * @returns {boolean}
 */
function isFieldEmpty(input){
    return (!input || input.length === 0);
}


 /**
 * isPhoneFormatValid is a helper function that checks if the given phone number matches the pattern of a US/Canada phone number. It must have the punctuation that matches the example input here: +1 (647) 504-0911
 * TODO: Globalize?!
 * 
 * @param {string}      phoneNumber 
 * 
 * @returns {boolean}
 */
function isPhoneFormatValid(phoneNumber){
    const phoneUSCanRegex = /^[+]{1}[1]{1}[ ]{1}[(]{1}[\d]{3}[)]{1}[ ]{1}[\d]{3}[-]{1}[\d]{4}$/;
    return phoneUSCanRegex.test(phoneNumber);
}

 /**
 * isEmailFormatValid is a helper function that checks if the given email is a properly formatted email.
 * 
 * @param {string}      email 
 * 
 * @returns {boolean}
 */
function isEmailFormatValid(email){
    // Create a regex pattern that looks for an alphanumeric.,_%+- in the initial part, @,  alphanumeric.- in middle, .(dot), and an alphabet ending with 2 to 63 chararacter.
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
    return emailRegex.test(email);
}