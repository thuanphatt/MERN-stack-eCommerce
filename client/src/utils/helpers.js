import icons from "./icons";
const { AiFillStar, AiOutlineStar } = icons;
export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
export const formatMoney = (number) =>
  Number(number.toFixed(1)).toLocaleString();
export const renderStarFromNumber = (number) => {
  if (!Number(number)) return;
  const stars = [];
  // 4 => [1,1,1,1,0]
  // 2 => [1,1,0,0,0]
  for (let i = 0; i < number; i++) stars.push(<AiFillStar color="orange" />);
  for (let i = 5; i > number; i--) stars.push(<AiOutlineStar color="orange" />);
  return stars;
};
