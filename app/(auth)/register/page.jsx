import Quotes from "../Component_Auth/Quotes";
import FormRegister from "./Component_Register/FormRegister";

export default function Register() {
  return (
    <>
      <article className="w-full min-h-full flex  bg-white ">
        <Quotes />
        <FormRegister />
      </article>
    </>
  );
}
