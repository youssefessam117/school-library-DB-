import bcrypt from "bcrypt";

export const hashPassword = (
  password,
  saltround = parseInt(process.env.saltround)
) => {
  try {
    const hash = bcrypt.hashSync(password, saltround);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

export const checkedPassword = (password, hash) => {
  const isTrue = bcrypt.compareSync(password, hash);
  return isTrue;
};
