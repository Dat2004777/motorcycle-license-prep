import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, NavLink } from "react-router";
import Logo from "../Logo";
import User from "../User";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between p-4 shadow-md">
      <Logo />

      <div className="flex my-auto">
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary border-b-2 border-primary pb-1" : ""
              }
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "text-primary border-b-2 border-primary pb-1" : ""
              }
            >
              Lịch sử
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex my-auto gap-4">
        {user === null ? (
          <>
            <Link to={"/login"}>
              <Button variant="outline">Đăng nhập</Button>
            </Link>
            <Link to={"/register"}>
              <Button>Đăng ký</Button>
            </Link>
          </>
        ) : (
          <User />
        )}
      </div>
    </div>
  );
};

export default Header;
