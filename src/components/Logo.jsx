import { Link } from "react-router";

const Logo = ({ disabled }) => {
  if (disabled) {
    return (
      <span className="flex my-auto font-bold text-primary text-2xl select-none cursor-default">
        Ôn Thi Lý Thuyết
      </span>
    );
  }

  return (
    <>
      <Link to={"/"} className="flex my-auto font-bold text-primary text-2xl">
        Ôn Thi Lý Thuyết
      </Link>
    </>
  );
};

export default Logo;
