import {buildOptions} from "../helpers/util.js";
import Select from "react-select";
import "./Filter.css"
import {Fragment} from "react";

export default function Filters ({pageData, fields, objects, onFilterChange}) {

    const tagNames = [
        'tag1',
        'tag2',
        'tag3',
    ]

    const customStyles = {
        valueContainer: (base) => ({
            ...base,
            maxHeight: 50,
            overflowY: "auto"
        }),
        multiValue: (base, state) => {
            return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
        },
        multiValueLabel: (base, state) => {
            return state.data.isFixed
                ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
                : base;
        },
        multiValueRemove: (base, state) => {
            return state.data.isFixed ? { ...base, display: "none" } : base;
        },
        menu: (provided) => ({
            ...provided,
            marginTop: '0px',
            marginBottom: '0px',
            fontSize: '11px',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            padding: '0px 4px',
            height: '20px',
        }),
    };

    const filterList = tagNames.map(name => pageData[name])
        .map(machine => {

            const config = fields.find(f =>f.machine === machine)

            if (config && (config.type === 'tags' || config.type === 'select')) {
                return config
            }

            if (config && ['number', 'text', 'address'].includes(config.type))
            {

                const options = buildOptions(objects, machine)

                return {
                    ...config,
                    type: 'text',
                    options
                }
            }
        })
        .filter(value => value)

    function handleFilterChange (value, machine) {
        onFilterChange(value,machine)
    }

    return <div className={"sf-landing-page-content flex space-x-5 justify-end"}>
        {filterList.map(config => {
            return <Fragment key={config?.id}>
                <div className={"sf-landing-page-filter w-1/4"}>
                    <Select styles={customStyles} isClearable={true} isMulti={true} options={config?.options || []} placeholder={config?.name} onChange={(e) => handleFilterChange(e, config?.machine)}/>
                </div>
            </Fragment>
        })}
    </div>

}