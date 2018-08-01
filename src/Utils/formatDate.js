export const formatDate = () => {
  let q = new Date();
  let m = q.getMonth() + 1;
  let d = q.getDate();
  let y = q.getFullYear();
  let h = q.getHours();
  let min = q.getMinutes();
  let s = q.getSeconds();
  if (min < 10) min = "0" + min;
  if (s < 10) s = "0" + s;

  if (m < 10) m = "0" + m;
  if (d < 10) d = "0" + d;
  return {
    date: `${y}-${m}-${d}`,
    time: `${h}:${min}:${s}`,
    year: y,
    month: m
  };
};
