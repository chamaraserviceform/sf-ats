import {useParams} from "react-router-dom";

export default function ObjectPage() {
    const {url, objectId} = useParams();
    return <div>
        <h1>Object Page</h1>
    </div>
}