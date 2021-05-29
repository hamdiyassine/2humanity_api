

const login = async (User, email, pass , adressIp, bcrypt, jwt, JWT_SECRET, JWT_EXPIRES_IN, Axios) => {
  console.log('login : ',email);
  
  if (!pass || pass == "") return { status: false, code: 401, err: { msg: "auth failed" } }
  
  try {
    const usr = await User.findOne({ email }).populate('avatar')
    
    if (!usr ) return { status: false, code: 401, err: { msg: "auth failed" } }

    const compare = await bcrypt.compare(pass, usr.pass)
    if (!compare) return { status: false, code: 401, err: { msg: "auth failed" } }



    const token = jwt.sign({
      email: usr.email,
      user_id: usr._id,
    },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    const user = await User.findOne({ email }).populate('avatar').select("-pass");
    let new_user = {
      ...user._doc
    }

    User.findByIdAndUpdate(user._id, {addresse_ip : adressIp} , { useFindAndModify: false })

    return { status: true, code: 200, data: { token, user: new_user } }

  } catch (err) {
    console.log('errr', err);

    return { status: false, code: 500, err: err }
  }
}

module.exports = login;