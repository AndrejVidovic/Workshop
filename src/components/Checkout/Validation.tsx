const Validation=(user,setErrors,InitalValuesErrors)=>{
    let temp=InitalValuesErrors;
    let errorExists=false;

    temp.name = user.name ? "" : "First name is required!";
    if (temp.name == "First name is required!") {
        temp.nameError = true;
        errorExists = true;
    } else temp.nameError = false;
    temp.surname = user.surname ? "" : "Last name is required!";
    if (temp.surname == "Last name is required!") {
        temp.surnameError = true;
        errorExists = true;
    } else temp.surnameError = false;
    temp.email = user.email ? "" : "Email is required!";
    if (temp.email == "Email is required!") {
        temp.emailError = true;
        errorExists = true;
    } else temp.emailError = false;
    temp.address = user.address ? "" : "Address is required!";
    if (temp.address == "Address is required!") {
        temp.addressError = true;
        errorExists = true;
    } else temp.addressError = false;
    temp.dateOfBirth = user.dateOfBirth ? "" : "DateOfBirth is required!";
    if (temp.dateOfBirth == "DateOfBirth is required!") {
        temp.dateOfBirthError = true;
        errorExists = true;
    } else temp.dateOfBirthError = false;
    let zip=parseInt(user.ZIPcode)
    temp.ZIPcode = isNaN(zip) ? "ZIP code is not number!" : "";
    if (temp.ZIPcode == "ZIP code is not number!") {
        temp.ZIPcodeError = true;
        errorExists = true;
    } 
    else temp.ZIPcodeError = false;

    setErrors({ ...temp });

    return !errorExists;
}
export default Validation;