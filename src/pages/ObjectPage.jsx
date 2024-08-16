import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {DataContext} from "../providers/DataProvider.jsx";
import PageHeader from "../components/PageHeader.jsx";
import MainPageLoading from "../components/MainPageLoading.jsx";
import "./ObjectPage.css"
import ObjectBody from "../components/ObjectBody.jsx";
import Fallback from "../components/Fallback.jsx";
import Footer from "../components/Footer.jsx";

export default function ObjectPage() {
    const {objectData, pageData, pageDataLoading, objectDataLoading} = useContext(DataContext);

    const {objectId} = useParams();


    if (pageDataLoading || objectDataLoading) {
        return <MainPageLoading loading={pageDataLoading || objectDataLoading}/>
    }

    const object = objectData?.items?.find(i => i.id === objectId);

    function goToForm () {
        const footerElement = document.querySelector('.sf-landing-footer');

        if (footerElement) {
            footerElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        if (pageData?.h1) {
            document.title = `${pageData?.h1} | ${object[pageData?.title]}`;
        }
    }, [pageData?.h1]);


    if (pageData) {
        return <div>
            <PageHeader pageData={pageData} mainHeading={object[pageData?.title]}
                        subHeading={object[pageData?.subtitle]}>
                <div className={"sf-landing-button sf-landing-button-submit sf-anim"}
                     onClick={() => goToForm()}>{pageData.objectSubmitLinkText}</div>
            </PageHeader>
            <ObjectBody pageData={pageData} objectData={objectData}/>
            <Footer pageData={pageData}/>
        </div>
    }


    return <Fallback/>
}