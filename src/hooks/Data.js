import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getLandingPageData from "../pages/repository.js";

export default function useData () {
    const {url, objectId} = useParams();
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        (async () => {
            setPageData(
                await getLandingPageData(url)
            )
        })()
    }, []);

    return [pageData]
}