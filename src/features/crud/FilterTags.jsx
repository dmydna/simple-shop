import {Badge, Col} from "react-bootstrap";
import React from "react";
import { useUIContext } from "../../contexts/UIContext.jsx";

export const FilterTags = ({className, style})  => {

    const {selectedTags, setSelectedTags} = useUIContext();

    const deleteTag = (indexToDelete) => {
        setSelectedTags(prev => prev.filter((_, index) => index !== indexToDelete));
    };

    return (
        <Col className={`${className} ${selectedTags?.length !== 0 ? 'mt-3': ''} d-flex flex-wrap align-items-center mx-auto`} style={style}>
            {selectedTags.map((item, index) => (
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
        </Col>
    )
}