import * as React from "react";
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Filters() {
    const [value, setValue] = useState([0]);
    return (
        <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center gap-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select>
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
                <label htmlFor="minPrice" className="text-sm font-medium">Price</label>
                <Slider className="w-[300px]" defaultValue={[0]} max={100} step={1}
                    onValueChange={(value) => setValue(value)}
                />
                <span className="text-sm font-medium">${value}</span>
            </div>
        </div>
    )
}