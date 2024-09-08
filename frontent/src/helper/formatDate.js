const formatMiliToYY_MM_DD = (mili) => {
  var date = new Date(Number(mili));
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() : "0" + (date.getMonth() + 1);

  const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

  date = date.getFullYear() + "-" + month + "-" + day;
  return date;
};
export default formatMiliToYY_MM_DD;
