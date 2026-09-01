import InputCrudFloating from "@/features/crud/components/InputCrudFloating";

import userDefault from "/user-default-xl.png"
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { Button } from "react-bootstrap";
import FormRole from "@features/user/components/UserForm/FormRole";

export default function FormBasic({ children, className, crudHook }) {

  const { currentItem } = crudHook


  return (
    <>
      {/* Producto */}

      {children}
      <>


        <div className="d-flex flex-column flex-lg-row mb-3">

          <div className="me-4">

            <ImageWithFallback
              className="rounded-circle border mb-3 mx-auto" 
              src={currentItem?.image || '#'}
              fallbackSrc={userDefault}
              width={70} 
              height={70}
            />

          </div>


          <div className="d-flex flex-fill flex-column">

            <div className="flex-fill d-flex gap-2 flex-column flex-lg-row">
              <InputCrudFloating
                name={"username"}
                label={"Username"}
                {...crudHook}
                showEditButton={false}
              />

              <InputCrudFloating
                name={"email"}
                label={"Email"}
                {...crudHook}
              />

              <div className="w-100 position-relative">
                <FormRole crudHook={crudHook} />
              </div>

            </div>

            

          </div>
        </div>
      </>
    </>
  )
}
