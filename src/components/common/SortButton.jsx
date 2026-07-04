import { useUrlState } from '@/hooks/useUrlState';
import { useState, useEffect } from 'react';


export default function SortByParam({ children, name }) {

    // 1. Lee el estado directamente de la URL
    const { searchParams, setSearchParams } = useUrlState();
    const currentSortParam = searchParams.sort;
    
    // Determina si está activo basándote en la URL
    const isActive = currentSortParam === (name || children);

    const handleToggle = () => {
        setSearchParams(prev => {
            const newSort = isActive ? null : (name || children);
            return { ...prev, sort: newSort || null };
        });
    };

    return (
        <div onClick={handleToggle} className='d-flex pointer'>
            <div style={{ marginTop: '-4px', height: '0px' }} className="d-flex flex-column me-2">
                <i className={`bi bi-caret-up${isActive ? '-fill' : ''}`}></i>
                <i style={{ marginTop: '-12px' }} className={`bi bi-caret-down${!isActive ? '-fill' : ''}`}></i>
            </div>
            {children}
        </div>
    );
}