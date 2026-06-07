import InputCrudFloating from "@/features/crud/components/InputCrudFloating";


export default function FormBasic({ children, className, crudHook }) {

 const {formData} = crudHook


  return (
    <>
      {/* Producto */}

      {children}
      <>


        <div className="d-flex flex-column flex-lg-row mb-3">

          <div className="me-4">
          <img 
             className="rounded mb-3 border" 
             height={140} 
             width={140} 
             src={formData?.image} 
           />
          </div>


          <div className="d-flex flex-fill flex-column">

        <div className="flex-fill d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloating
            name={"username"}
            label={"Username"}
            baseHook={crudHook}
          />

          <InputCrudFloating
            name={"email"}
            label={"Email"}
            baseHook={crudHook}
          />

        </div>


          <InputCrudFloating
            name={"role"}
            label={"Role"}
            baseHook={crudHook}
          />
          </div>


        </div>








      
      </>

    </>
  )
}
