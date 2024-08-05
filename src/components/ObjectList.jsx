import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import {useNavigate} from "react-router-dom";

export default function ObjectList({pageData, objects, loading,url}) {

    const [searchTerm, setSearchTerm] = useState("")
    const [filteredFlexData, setFilteredFlexData] = useState(objects.items)
    const navigation = useNavigate()

    useEffect(() => {

        if (searchTerm !== "") {
            const fuse = new Fuse(objects.items, {
                keys: [
                    'primary_field',
                    'note'// will be assigned a `weight` of 1
                ],
                includeScore: true,
            })

            let result = fuse.search(searchTerm);

            let filtered = [];
            for (let i = 0; i < result.length; i++) {
                filtered.push(result[i].item);
            }
            setFilteredFlexData(filtered);
        }else {
            setFilteredFlexData(objects.items);
        }

    }, [searchTerm])

    function gotObjectDetails (objectId) {
        navigation(`${objectId}`)
    }

    return <div className={"sf-landing-page-body"}>
        <div className={"sf-landing-page-search sf-anim"}>
            <label className={"sf-landing-page-search-label"}
                   htmlFor={"sf-landing-page-search"}>{pageData.searchTitle}</label>
            <input style={{borderRadius: pageData.borderRadius}} id={"sf-landing-page-search"} type={"text"}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder={pageData.searchTitle}/>
        </div>
        <div className={"sf-landing-page-content"}>
            {(!loading) && filteredFlexData.map((data, index) => {
                return <div key={data.id} className={"sf-landing-page-item sf-anim"} onClick={() => gotObjectDetails(data.id)}>
                    <div className={"sf-landing-page-item-title"}>{data[pageData.title]}</div>
                    <div
                        className={"sf-landing-page-item-item sf-landing-page-field"}>{data[pageData.subtitle]}
                    </div>
                    <div
                        className={"sf-landing-page-item-item-2 sf-landing-page-field"}>{data[pageData.tag1]}</div>
                </div>
            })}
            {(filteredFlexData && filteredFlexData.length === 0) && <div className={"sf-landing-no-data"}>
                {pageData.noDataText}
            </div>}
        </div>
    </div>
}