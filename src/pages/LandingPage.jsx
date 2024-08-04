import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getLandingPageData from "./repository.js";

export default function LandingPage () {
    const {url} = useParams();
    const controller = new AbortController();
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        (async () => {
            setPageData(
                await getLandingPageData(url)
            )
        })()
    }, []);

    return <div>
        <h1>Landing Page</h1>
    </div>
}