const getAll = async (User) => {
  const users = await User.find();
  return { status: true, code: 500, data: { users } }
}
export default getAll