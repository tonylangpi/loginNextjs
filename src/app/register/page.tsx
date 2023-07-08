import dynamic from 'next/dynamic'
const Register = dynamic(() => import("@/components/register"),{ ssr: false, })
const RegisterPage = () => {
 
  return (
      <Register/>
  );
};

export default RegisterPage;