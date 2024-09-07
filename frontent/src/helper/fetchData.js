const fetchData = async (url, body) => {
  try {
    const response = await fetch(url, body);
    return await response.json();
  } catch (e) {
    console.log(e);
    return { status: "error", message: "could not connect to the server" };
  }
};
export default fetchData;
