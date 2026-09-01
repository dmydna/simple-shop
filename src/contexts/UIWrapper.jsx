import LoginModalParam from "@/features/auth/components/LoginModalParam";
import ContactModalParam from "@/features/contact/components/ContactModalParam";

export default function UIWrapper({children}) {

  return (
    <>
      {children}
      <LoginModalParam />
      <ContactModalParam />
    </>
  );
}