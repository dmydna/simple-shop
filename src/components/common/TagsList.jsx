import { useEffect, useRef, useState } from 'react';
import { Badge, Button, Col, Form, InputGroup } from 'react-bootstrap';

export const TagsList = ({ array = [], onChange, className = "", style = {}, locked = false }) => {

    const [list, setList] = useState(array);
    const [tag, setTag] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const inputRef = useRef(null);

    // Foco automático al abrir el input
    useEffect(() => {
        if (isAdding) inputRef.current?.focus();
    }, [isAdding]);

    useEffect(()=>{
        if(array.length !== 0){
             setList(array)
        }

    },[array])

    useEffect(()=>{
        onChange(list)
    },[list])


    const deleteTag = (indexToDelete) => {
        if(locked){
            setList(prev => prev.filter((_, index) => index !== indexToDelete));
        }
    };

    const handleSave = () => {
        // Sin espacios
        const cleanTag = tag.trim();
        // Sin repetidos
        if (cleanTag && !list.includes(cleanTag)) {
            setList([...list, cleanTag]);
        }
        setTag("");
        setIsAdding(false);
    };

    return (
        <Col className={`${className} d-flex flex-wrap align-items-center mx-auto`} style={style}>
            {list.map((item, index) => (
                <Badge
                    key={`${item}-${index}`}
                    pill
                    bg="light"
                    text="dark"
                    className="border me-2 mb-2 p-2 px-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteTag(index)}
                >
                    {item} <i className="ms-1 bi bi-x text-muted"></i>
                </Badge>
            ))}

            {isAdding ? (
                <InputGroup size="sm" className="mb-2" style={{ width: '150px' }}>
                    <Form.Control
                        ref={inputRef}
                        placeholder="Etiqueta..."
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        onBlur={() => !tag && setIsAdding(false)} // Se cierra al hacer click fuera y si está vacío
                    />
                    <Button variant="outline-primary" onClick={handleSave}>
                        <i className="bi bi-check"></i>
                    </Button>
                </InputGroup>
            ) : (
                <>
                {!locked && (
                  <Button
                    variant="link"
                    size="sm"
                    className="text-decoration-none mb-2 p-0 text-primary"
                    onClick={() => setIsAdding(true)}
                >
                    <i className="bi bi-plus-circle-fill me-1"></i> Añadir
                </Button>)}
                </>
            )}
        </Col>
    );
};
