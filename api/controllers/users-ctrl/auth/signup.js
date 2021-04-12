
import isValidMobile from "../../../globs/helpers/is-valid-mobile";
import sendSms from "../../../globs/utils/sms";
const signup = async (User, data, bcrypt , shortid, jwt, JWT_SECRET, JWT_EXPIRES_IN, createOneMedia, files = null, Axios) => {

  if (!data.pass || data.pass.toString().length == 0)
    return { status: false, code: 409, err: { msg: "wrong password" } }
  let is_valid_mobile = await isValidMobile(data.mobile, true)

  if (!data.mobile || !is_valid_mobile)
    return { status: false, code: 409, err: { msg: "wrong mobile number or there's already a user with the same mobile number" } }
  const doc = await User.findOne({ email: data.email }).exec()
  if (doc !== null) return { status: false, code: 409, err: { msg: "email already exist" } }

  const document = await User.findOne({ mobile: data.mobile }).exec()
  if (document !== null) return { status: false, code: 409, err: { msg: "mobile already exist" } }

  let password = ''
  let new_email = ''
  let generated_password = ''
  if(data.type == 'association') {
    password = await bcrypt.hash(data.pass, 12);
    if (!password) return { status: false, code: 500, err: { msg: "error password" } };
    new_email = data.email
  }else{
    generated_password = shortid.generate()
    new_email = data.mobile
    password = await bcrypt.hash(generated_password, 12);
  }
  



  let avatar = null;
  if (files && files.avatar) {
    const new_media = await createOneMedia({},
      `uploads/users/avatars`, files.avatar, "image"
    )

    if (!new_media.status) return { status: false, code: new_media.code, err: new_media.err }

    avatar = new_media.data.media._id
  }

  const usr = new User({
    email: new_email,
    type: data.type ,
    name : data.name ,
    pass: password,
    avatar,
    addresse : data.addresse,
    mobile: data.mobile
  });

  const created_user = await usr.save();
  if (!created_user) return { status: false, code: 500, err: { msg: "error saving" } }

  const user = await User.findOne({ email: created_user.email }).populate('avatar').select("-pass");

  let new_user = {
    ...user._doc,
  }


  const token = jwt.sign({
    email: new_user.email,
    user_id: new_user._id,
  },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  if(user.type == 'volunteer') {
    const message = 'Votre mot de passe est : '+generated_password
    sendSms({mobile : user.mobile , message})
  }


  return { status: true, code: 201, data: { token, user: new_user } }
}

module.exports =signup;