import bcrypt from "bcrypt";
async function generateHash(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function compareHash(password, hash) {
  return await bcrypt.compare(password, hash);
}

export { generateHash, compareHash };
