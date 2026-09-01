import InputCrudFloating from "@/features/crud/components/InputCrudFloating.jsx";

function FormSku({children, className, baseHook}){


    return (
        <>
            {/* Detalles */}
            {children}

        <div className="d-flex gap-2 flex-column flex-lg-row">

          <InputCrudFloating
            name={"sku"}
            label={"Sku"}
            {...baseHook}
            showEditButton={false}
          />

          <InputCrudFloating
            name={"stock"}
            label={"stock"}
            {...baseHook}
          />

        </div>
          </>
    )
}


export default FormSku;