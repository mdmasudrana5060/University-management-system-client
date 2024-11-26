import { Button, Row } from "antd";
import { FieldValues,} from "react-hook-form"
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";




const Login = () => {
  const dispatch=useAppDispatch();
  const navigate=useNavigate();
 
  
  // const defaultValue={
  //   userId:A-0001
  //   Password:123456789
  // }
  const[login]=useLoginMutation();
  
  const onSubmit=async(data:FieldValues)=>{
   const toastId= toast.loading('Logging in...');
  try{
    const userInfo={
      id:data.userId,
      password:data.password
    };
    console.log('userInfo from login 26 no line',userInfo)
  
    const res=await login(userInfo).unwrap();
    const user=verifyToken(res.data.accessToken) as TUser;
    
    dispatch(setUser({user:user,token:res.data.accessToken}));
    toast.success('Logged in successfully',{id:toastId,duration:2000})
    navigate(`/${user.role}/dashboard`)
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(err){
    toast.error('Something went wrong',{id:toastId,duration:2000})
  }

  

  }
 
  return (
    <Row justify='center' align="middle" style={{height:'100vh'}}>
         <PhForm onSubmit={onSubmit}>
          <PhInput type="text" name="userId" label="ID:"/>
         <PhInput type='text' name="password" label="password"/>
         <Button htmlType="submit"> Login</Button>
         </PhForm>
    </Row>
  );
};
export default Login;