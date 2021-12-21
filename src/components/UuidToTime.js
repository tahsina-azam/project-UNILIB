import "../styles/Fonts.css";
const Time = ({ time, caption }) => {
  const date = new Date(time);
  console.log(time);
  console.log({ caption });
  const print_time =
    caption +
    " " +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    "  " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return <sub className=" subs mx-2 text-capitalize">{print_time}</sub>;
};
export default Time;
