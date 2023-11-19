const HasAllData = (data) => (data.Name != '' && data.Phone != '' && data.Email != '');

const NameFormat = (name) => name.match(/^[a-zA-Z .]*$/);

const PhoneFormat = (phone) => phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const EmailFormat = (email) => email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const FormValid = (req, res) => {

    if (!HasAllData(req))        return("/400");
    if (!NameFormat(req.Name))   return("/nameinvalid");
    if (!PhoneFormat(req.Phone)) return("/phoneinvalid");
    if (!EmailFormat(req.Email)) return("/emailinvalid");

    return true;
}

module.exports = { HasAllData, PhoneFormat, EmailFormat, FormValid };