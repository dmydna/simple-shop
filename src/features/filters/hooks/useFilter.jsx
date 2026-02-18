// src/features/filters/hooks/useFiltersCallback.js
import {useState} from "react";

export const useFilter = (initialFilters = {}) => {

    const [filters, setFilters] = useState(initialFilters);
    const [filterDraft, setFilterDraft] = useState(initialFilters);
    const [isActiveFilter, setActiveFilter] = useState(false);

    const applyFilters = () => {
        setFilters(filterDraft);
        setActiveFilter(Object.keys(filterDraft).length > 0);
    };

    const reset = () => {
        setFilters(initialFilters);
        setFilterDraft(initialFilters);
        setActiveFilter(false);
    };

    return {
        filters,
        filterDraft,
        isActiveFilter,
        setFilters,
        setFilterDraft,
        setActiveFilter,
        applyFilters,
        reset
    };
};