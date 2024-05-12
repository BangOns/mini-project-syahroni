import Quotes from "../Component_Auth/Quotes";
import FormLogin from "./Component_Login/FormLogin";
export default function Login() {
  return (
    <>
      <article className="w-full h-screen sm:min-h-full flex z-[1]  bg-white ">
        <FormLogin />
        <Quotes />
      </article>
    </>
  );
}
