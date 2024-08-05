import {useContext, useEffect} from "react";
import {DataContext} from "../providers/DataProvider.jsx";
import MainPageLoading from "../components/MainPageLoading.jsx";
import './LandingPage.css'
import ObjectList from "../components/ObjectList.jsx";
import {useParams} from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Footer from "../components/Footer.jsx";
import Fallback from "../components/Fallback.jsx";

export default function pageData () {
    const {pageData, pageDataLoading, objectData, objectDataLoading} = useContext(DataContext);
    const {url} = useParams()


    if (pageDataLoading) {
        return <MainPageLoading loading={pageDataLoading}/>
    }

    useEffect(() => {
        if (pageData?.h1) {
            document.title = pageData?.h1;
        }
    }, [pageData?.h1]);



    if (pageData) {
        return <div>
            <PageHeader pageData={pageData} mainHeading={pageData?.h1} subHeading={pageData?.h2}/>

            {objectDataLoading && <div className={"flex justify-center m-10"}>
                Loading...
            </div>}

            {!objectDataLoading && <ObjectList pageData={pageData} objects={objectData} loading={objectDataLoading} url={url}/>}

            <Footer pageData={pageData}/>
        </div>
    }

    return <>
        <Fallback />
    </>
}