import isValidMobile from "../../../globs/helpers/is-valid-mobile";

const signup = async (User, data, bcrypt, jwt, JWT_SECRET, JWT_EXPIRES_IN, createOneMedia, files = null, Axios) => {
  if (!data.pass || data.pass.toString().length == 0)
    return { status: false, code: 409, err: { msg: "wrong password" } }
  let is_valid_mobile = await isValidMobile(data.mobile, true)

  if (data.mobile && !is_valid_mobile)
    return { status: false, code: 409, err: { msg: "wrong mobile number or there's already a user with the same mobile number" } }
  const doc = await User.findOne({ email: data.email }).exec()
  if (doc !== null) return { status: false, code: 409, err: { msg: "email already exist" } }

  const hashed_pass = await bcrypt.hash(data.pass, 12);
  if (!hashed_pass) return { status: false, code: 500, err: { msg: "error password" } };



  let avatar = null;
  if (files && files.avatar) {
    const new_media = await createOneMedia({},
      `uploads/users/avatars`, files.avatar, "image"
    )

    if (!new_media.status) return { status: false, code: new_media.code, err: new_media.err }

    avatar = new_media.data.media._id
  }
  const usr = new User({
    email: data.email,
    type: data.type ,
    pass: hashed_pass,
    avatar,
    mobile: data.mobile
  });

  const created_user = await usr.save();
  if (!created_user) return { status: false, code: 500, err: { msg: "error saving" } }

  if (data.is_white_mark) return { status: true, code: 201 }

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


  return { status: true, code: 201, data: { token, user: new_user } }
}

export default signup