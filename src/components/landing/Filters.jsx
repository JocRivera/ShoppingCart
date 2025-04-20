import * as React from "react";
import { useState, useId } from "react";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFilters } from "@/hooks/useFilters";

export default function Filters() {

    const { filters, setFilters } = useFilters();
    const minPriceFilterId = useId();
    const categoryFilterId = useId();

    const handleCategoryChange = (value) => {
        setFilters((prevState) => ({
            ...prevState,
            category: value,
        }));
    };

    const handleChangeMinPrice = (value) => {
        setFilters((prevState) => ({
            ...prevState,
            minPrice: value[0],
        }));
    };

    return (
        <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center gap-2">
                <label htmlFor={categoryFilterId} className="text-sm font-medium">
                    Category
                </label>
                <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <label htmlFor={minPriceFilterId} className="text-sm font-medium">
                    Price
                </label>
                <Slider
                    id={minPriceFilterId}
                    className="w-[300px]"
                    defaultValue={[filters.minPrice]}
                    max={2000}
                    step={10}
                    onValueChange={handleChangeMinPrice}
                />
                <span className="text-sm font-medium">${filters.minPrice}</span>
            </div>
        </div>
    );
}
