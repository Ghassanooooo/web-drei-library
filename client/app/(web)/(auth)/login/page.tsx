import dynamic from "next/dynamic";

const Login: any = dynamic(() => import("@/modules/auth/login"), {
  ssr: false,
});
export default function LoginPage() {
  return <Login />;
}
