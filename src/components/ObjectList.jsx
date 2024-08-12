import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import {useNavigate} from "react-router-dom";
import Filters from "./Filters.jsx";

export default function ObjectList({pageData, objects, loading,url}) {

    const [searchTerm, setSearchTerm] = useState("")
    const [filteredFlexData, setFilteredFlexData] = useState(objects.items)
    const [filters, setFilters] = useState([])
    const navigation = useNavigate()

    useEffect(() => {

        let filtered = []

        if (searchTerm !== "") {
            const fuse = new Fuse(objects.items, {
                keys: [
                    'primary_field',
                    'note'// will be assigned a `weight` of 1
                ],
                includeScore: true,
            })

            let result = fuse.search(searchTerm);

            filtered = filterAppliedItems(result.map(r => r.item))
        }else {
            filtered = filterAppliedItems(objects.items)
        }

        setFilteredFlexData(filtered);

    }, [searchTerm, filters])


    function gotObjectDetails (object) {

        window.sfDynamicData = {
            relation: [{
                "label": object.primary_field,
                "value": object.id,
                "spaceId" : object.space_id,
            }]
        }

        navigation(`${object.id}`)
    }

    function filterAppliedItems (result) {
        const filtered = []

        if (filters.length === 0) {
            return result
        }

        for (let i = 0; i < result.length; i++) {
            const item = result[i]

            if (filters.length > 0) {
                let add = true
                for (let j = 0; j < filters.length; j++) {
                    const filter = filters[j]
                    if (filter.values.length > 0) {
                        let found = false
                        for (let k = 0; k < filter.values.length; k++) {
                            const val = filter.values[k]
                            if (item[filter.machine] === val.value) {
                                found = true
                                break
                            }
                        }
                        if (!found) {
                            add = false
                            break
                        }
                    }
                }
                if (add) {
                    filtered.push(item);
                }
            }
        }



        return filtered
    }

    function handleFilterChange(value, machine) {

        const temFilters =  filters
        const filter = temFilters.find(f => f.machine === machine)

        //remove the filter
        if(value.length === 0 && filter) {
            temFilters.splice(temFilters.indexOf(filter), 1)
        }

        if (!filter) {
            temFilters.push({machine: machine, values: value})
        }

        if (filter) {
            filter.values = value
        }

        setFilters([...temFilters])
    }

    function getTagName(field, data) {

        if (objects?.fields?.length) {
            const fieldConfig = objects.fields.find(f => f.machine === field);

            if (fieldConfig?.type === "select") {
                const selectOptions = fieldConfig.options.find(p => p.value ===  data[field]);
                return selectOptions?.label
            }
        }

        return data[field]
    }


    return <div className={"sf-landing-page-body"}>
        <div className={"sf-landing-page-search sf-anim"}>
            <label className={"sf-landing-page-search-label"}
                   htmlFor={"sf-landing-page-search"}>{pageData.searchTitle}</label>
            <input style={{borderRadius: pageData.borderRadius, borderColor : "#6b7280"}} id={"sf-landing-page-search"} type={"text"}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder={pageData.searchTitle}/>
        </div>
        <Filters pageData={pageData} fields={objects.fields} objects={objects.items} onFilterChange={handleFilterChange}/>
        <div className={"sf-landing-page-content"}>
            {(!loading) && filteredFlexData.map((data, index) => {
                return <div key={data.id} className={"sf-landing-page-item sf-anim"} onClick={() => gotObjectDetails(data)}>
                    <div className={"sf-landing-page-item-title"}>{data[pageData.title]}</div>
                    <div
                        className={"sf-landing-page-item-item sf-landing-page-field"}>{data[pageData.subtitle]}
                    </div>
                    <div
                        className={"sf-landing-page-item-item-2 sf-landing-page-field"}>{getTagName(pageData.tag1, data)}</div>
                </div>
            })}
            {(filteredFlexData && filteredFlexData.length === 0) && <div className={"sf-landing-no-data"}>
                {pageData.noDataText}
            </div>}
        </div>
    </div>
}