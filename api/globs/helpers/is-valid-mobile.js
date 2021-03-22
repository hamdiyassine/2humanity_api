//const Partner = require('../../models/Schooling/Partner');
const User = require('../../models/User');

export default async function isValidMobile(mobile, is_user = false) {
    const valid = new RegExp(/^[0-9]{8}$/);
    let test = valid.test(mobile)

    if (!test) return false

    try {

        if (is_user) {
            const old_user = await User.findOne({ mobile });
            if (old_user) return false
            else return true

        }
        // find  partner using mobile number
        // const partner = await Partner.findOne({ mobile });

        // if (partner) return false
        return true

    } catch (err) {
        console.log('err', err);
        return false
    }
}
