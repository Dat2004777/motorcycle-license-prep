import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import userService from "@/services/userService";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { getAllUsers, register } = userService;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = () => {
    if (
      name.trim().length === 0 ||
      username.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const allUsers = await getAllUsers();

      if (allUsers.some((user) => user.username === username)) {
        toast.error("Tên đăng nhập đã tồn tại");
        return;
      }

      const newUser = {
        name,
        username,
        password,
        role: "user",
      };

      const result = await register(newUser);
      if (result) {
        toast.success("Đăng ký thành công");

        navigate("/login");
      } else {
        toast.error("Đăng ký thất bại");
      }
    } catch (error) {
      console.log("Lỗi khi đăng ký tại RegisterPage: ", error);
      toast.error("Lỗi khi đăng ký");
    }
  };

  return (
    <>
      <div className="my-auto text-center mt-16">
        <h1 className="text-2xl font-bold text-primary">Ôn Thi Lý Thuyết</h1>
        <p className="text-muted-foreground">
          Hệ thống học và thi bằng lái xe chuyên nghiệp
        </p>
      </div>

      <div className="flex flex-col justify-center mx-auto w-96 mt-8">
        <form onSubmit={handleRegister}>
          <Card>
            <CardHeader>
              <CardTitle>Đăng ký</CardTitle>
              <CardContent className="flex flex-col gap-4 mt-4">
                <div>
                  <p>Họ và Tên</p>
                  <Input
                    value={name}
                    placeholder="Nhập họ và tên..."
                    className="mt-2"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <p>Tên đăng nhập</p>
                  <Input
                    value={username}
                    placeholder="Nhập tên đăng nhập..."
                    className="mt-2"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <p>Mật khẩu</p>
                  <Input
                    placeholder="Nhập mật khẩu..."
                    type="password"
                    className="mt-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <p>Xác nhận mật khẩu</p>
                  <Input
                    placeholder="Xác nhận lại mật khẩu..."
                    type="password"
                    className="mt-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <Button type="submit" className="p-6">
                  Đăng ký
                </Button>
              </CardContent>
            </CardHeader>
          </Card>
        </form>

        <div className="flex justify-between mt-8">
          <div>
            <Link to="/">Quay lại trang chủ</Link>
          </div>
          <div>
            Đã có tài khoản?{" "}
            <Link to="/login">
              <span className="text-primary">Đăng nhập</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
