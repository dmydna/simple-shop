import { authService } from "@/features/auth/services/authService";
import { listingService } from "@/features/listing/services/listingService";
import { devService } from "@/dev/services/devService";
import { useService } from "@/hooks/useService";
import { useMemo, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import FileUploader from "./FileUploader";

import PageLoading from "@/components/common/PageLoading";
import PageError from "@/pages/errors/PageError";
import PageSuccess from "@/pages/errors/PageSuccess";
import { listingDataList } from "../data/listingDataList.js";
import { productDataList } from "../data/productDataList.js";
import { userDataList } from "../data/userDataList.js";
import { ImgGenApi } from "../utils";



function UploadService() {

    const [fileMode, setFileMode] = useState(false)
    const [selected, setSelected] = useState('4');

    const [succes, setSuccess] = useState(false)
    const [data, setData] = useState(null);

    const selectedService = useMemo(() => {
        if (selected == "1" || selected == "4") return "auth"
        if (selected == "2" || selected == "5") return "products"
        if (selected == "3" || selected == "6") return "listings"
    }, [selected])

    const selectedContent = useMemo(() => {
        if (selected == "1" || selected == "4") return "usuarios"
        if (selected == "2" || selected == "5") return "productos"
        if (selected == "3" || selected == "6") return "publicaciones"
    }, [selected])

    const { loading, error, setError, createBulk } = useService({ service: devService, onSuccess: ()=>setSuccess(true) })

    const handleSubmit = () => {
        createBulk(selectedService, data)
    }

    const imgInfo = {
        "icon": "bi-braces",
        "dimension": "80x80",
        "background": ".menta",
        "fontColor": "000",
        "fontWeight": "normal",
        "fontSize": 50,
    }


    const img = fileMode ?
        ImgGenApi({ ...imgInfo, "icon": "F791" }) :
        ImgGenApi({ ...imgInfo, "background": ".melon", "icon": "bi-braces" })

    return (
        <Container>
            <div className="d-block mx-auto rounded island p-4 border mb-3" style={{ maxWidth: '500px' }}>
                {loading && (
                    <PageLoading></PageLoading>
                )}
                {!loading && !error && !succes && (
                    <>
                        <p className="h5 mb-4">Carga masiva de contenido </p>

                        <Form.Check
                            className="my-2"// prettier-ignore
                            value={fileMode}
                            type="checkbox"
                            id={`default-checkbox`}
                            label="subir archivo"
                            onChange={(e) => setFileMode(!fileMode)}
                        />

                        <p className="h6">Selecciona tipo contenido</p>

                        <Form.Select value={selected} onChange={(e) => setSelected(e.target.value)}>

                            {fileMode && (<>
                                <option value="">Selecciona una opción</option>
                                <option value="1">Usuarios (file*)</option>
                                <option value="2">Productos (file*)</option>
                                <option value="3">Publicaciones (file*)</option>
                            </>)}

                            {!fileMode && (<>
                                <option onClick={() => setData(userDataList)} value="4">Usuarios</option>
                                <option onClick={() => setData(productDataList)} value="5">Productos</option>
                                <option onClick={() => setData(listingDataList)} value="6">Publicaciones</option>
                            </>)}

                        </Form.Select>

                        {fileMode && (
                            <FileUploader
                                loading={loading}
                                setData={setData}
                                data={data}
                                label={false}
                            />
                        )}

                        <div className="d-flex py-2  mt-2 mb-3">
                            <img className="rounded" src={img}></img>
                            <div className="m-2 ms-3">
                                <p className="h6 mb-1">
                                    {selectedContent}
                                </p>
                                <p className="small text-secondary mb-0">
                                    cargar <b>lista</b> de {selectedContent}
                                </p>
                                <p className="small fw-bolder mb-0">
                                    cantidad: {data?.length || 0}
                                </p>
                            </div>

                        </div>

                        <Button className="d-block mx-auto rounded-4" onClick={handleSubmit} variant="dark">
                            Publicar
                        </Button>
                    </>
                )}
                {error && (
                    <PageError handle={()=>setError(null)}/>
                )}

                {succes && (
                    <PageSuccess handle={()=>setSuccess(false)}/>
                )}

            </div>

        </Container>

    )
}

export default UploadService;
