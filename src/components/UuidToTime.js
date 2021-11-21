export const Time = ({ time }, caption) => {
  const date = new Date(time);
  console.log(time);
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
  return <sub className="show_time mx-2">{print_time}</sub>;
};
