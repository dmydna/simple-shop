import { useEffect } from "react";


import FetchState from "@/components/common/FetchState";
import { pillColor } from '@utils/enums.js';
import CompactDateInput from "@common/CompactDateInput";
import InputCrudFloating from "@features/crud/components/InputCrudFloating";
import { useUserCrud } from '@features/user/hooks/useUserCrud';
import { CRUD } from "@utils/enums";
import { placeholder } from "@utils/image.js";
import { arrayToDate } from "@utils/mappers.js";
import { Button, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";


import 'react-datepicker/dist/react-datepicker.css';


function BanUser({ close }) {

    const [searchParams, setSearchParams] = useSearchParams();
    const idParam = searchParams.get('id');
    const createMode = searchParams.get('dialog') == "ban.create";
    const updateMode = searchParams.get('dialog') == "ban.update";


    const crudHook = useUserCrud(false);

    const { setCurrentItem, currentItem, setId, 
          loading, error, crudMode, reset, success, setError, 
          setSuccess, formData, banUser, unbanUser, setCrudMode } = crudHook;


    useEffect(() => {
        if (idParam) { 
            setId(idParam) 
            // Inicializa los campos del formulario
            reset({
                banExpiresAt: arrayToDate(currentItem?.meta?.banExpiresAt),
                banReason: currentItem?.meta?.banReason
            })
        } else { 
            setCurrentItem(null) 
        }

        if (createMode) {
            setCrudMode(CRUD.CREATE);
            reset({})
            //setEnableEditableField(false);
        }

        if (updateMode) { setCrudMode(CRUD.READ) }

       //NOTA: al aceptar success se convierte en null (por FetchState)
       if(success == null){
             // Actualizacion de estados:
             // 1. Cierra el Modal.
             // 2. Deselecciona elemento de tabla.
             // 3. Refresca (refetch) tabla y sidebar.
            setSearchParams(prev => { 
                const newParams = new URLSearchParams(prev);
                newParams.delete('dialog');// (1*)
                newParams.delete('id');    // (2*)
                newParams.set('tableVersion', Date.now()); // (3*)
                return newParams;
            },{ replace: true }); 
       }
    }, [createMode, updateMode, idParam, currentItem, success])



    const handleSubmit = async (e) => {
        e.preventDefault()
        await banUser(currentItem?.id, formData);
    }

    const handleUnbanUser = async (e) => {
        e.preventDefault()
        await unbanUser(currentItem?.id);
    }


    return (
        <div className="p-3">

            <FetchState
                fluid
                hook={{ loading, error, setError, success, setSuccess }}
            >
                <>

                    <div style={{ lineHeight: '2.5rem' }}
                        className="d-flex justify-content-between mb-2">
                        <p className="fs-6 mb-0 fw-medium">
                            Ban User
                        </p>
                        {close && (
                            <Button onClick={close} variant="light" className="">
                                <i className="bi-x-lg "></i>
                            </Button>
                        )}

                    </div>

                    <Form id='reviewForm' style={{ minHeight: '190px' }} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 w-100">
                            <div className='d-flex gap-3 mb-3  border-0 rounded-3'>
                                <img
                                    style={{ height: '55px', width: '55px' }}
                                    className='border rounded'
                                    src={currentItem?.image || placeholder({ dimension: "45x45", background: ".menta", fontSize: "20", icon: "bi-person" })} />
                                <div className="flex-fill my-1">
                                    <p className='small fw-semibold text-uppercase m-0'>{currentItem?.username || 'Username'}</p>
                                    <p className='small text-lowercase'>
                                        <span
                                            className={`text-lowercase ${pillColor[currentItem?.meta?.status]}`} >
                                            {currentItem?.meta?.status || '-.-'}
                                        </span>
                                    </p>
                                </div>
                            </div>


                            <CompactDateInput
                                name="banExpiresAt"
                                label={"Ban expires"}
                                crudHook={crudHook}
                            />


                            <InputCrudFloating
                                name={"banReason"}
                                label={"Motivo del baneo"}
                                as={"textarea"}
                                baseHook={crudHook}
                            />


                        </Form.Group>
                    </Form>

                    <div className='w-100 d-flex justify-content-center gap-3'>
                        {crudMode == CRUD.CREATE && (
                            <Button form='reviewForm' variant="primary" type="submit" className="btn-sm my-2" >
                                <i className="bi bi-check"></i> Confirm
                            </Button>
                        )}
                        {crudMode !== CRUD.CREATE && (
                            <Button variant="dark" onClick={handleUnbanUser} className="my-2 btn-sm" >
                                <i className="bi bi-unlock"></i>  Unban
                            </Button>
                        )}
                    </div>

                </>
            </FetchState>
        </div>)
}

export default BanUser;
