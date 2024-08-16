import {useContext, useEffect} from "react";
import {DataContext} from "../providers/DataProvider.jsx";
import MainPageLoading from "../components/MainPageLoading.jsx";
import './LandingPage.css'
import ObjectList from "../components/ObjectList.jsx";
import {useParams} from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Footer from "../components/Footer.jsx";
import Fallback from "../components/Fallback.jsx";
import {Helmet} from "react-helmet-async";

export default function pageData () {
    const {pageData, pageDataLoading, objectData, objectDataLoading} = useContext(DataContext);
    const {url} = useParams()


    if (pageDataLoading) {
        return <MainPageLoading loading={pageDataLoading}/>
    }



    if (pageData) {
        return <div>
            <Helmet>
                <title>{pageData?.h1 || "Serviceform"}</title>
                <meta property="og:title" content={pageData?.h1 || "Serviceform"} />
            </Helmet>

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