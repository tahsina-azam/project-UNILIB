import "../styles/Fonts.css";
const Time = ({ time, caption }) => {
  const date = new Date(time);
  console.log(time);
  console.log({ caption });
  const day =
    " " +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear();
  const clock =
    " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return (
    <sub className=" subs mx-2 text-capitalize">
      <i class="fas fa-calendar-alt" />
      {day} <i class="fas fa-clock ms-2" /> {clock}
    </sub>
  );
};
export default Time;
