const HasAllData = (data) => (data.Name != '' && data.Phone != '' && data.Email != '');

const PhoneFormat = (phone) => phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const EmailFormat = (email) => email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const FormValid = (req, res) => {

    if (!HasAllData(req))        return("/400");
    if (!PhoneFormat(req.Phone)) return("/phoneinvalid");
    if (!EmailFormat(req.Email)) return("/emailinvalid");

    return true;
}

module.exports = { HasAllData, PhoneFormat, EmailFormat, FormValid };