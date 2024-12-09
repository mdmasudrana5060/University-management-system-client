import { Button, Row } from "antd";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/useManagement.api";
import { TResponse } from "../types";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = (await changePassword(data)) as TResponse<any>;

    if (res.data.success == true) {
      dispatch(logout());
      navigate("/login");
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit}>
        <PhInput type="text" name="oldPassword" label="Old Password" />
        <PhInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit"> Change Password</Button>
      </PhForm>
    </Row>
  );
};
export default ChangePassword;
