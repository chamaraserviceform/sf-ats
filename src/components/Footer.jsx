import {lightOrDark} from "../helpers/util.js";
import "./Footer.css"

export default function Footer({pageData}) {

    let logoImage = <img className="sf-runon-landing sf-anim" alt="Best Free Chatbot for Your Website" src={'https://cdn.serviceform.com/assets/images/chat/powered-by-serviceform-gray.svg'} />
    if (lightOrDark(pageData.headerBackgroundColor) === 'dark') {
        logoImage =  <img className="sf-runon-landing sf-anim" alt="Best Free Chatbot for Your Website" src={'https://cdn.serviceform.com/assets/images/chat/powered-by-serviceform-light.svg'} />
    }

    return <footer className={"sf-landing-footer"}
                   style={{backgroundColor: pageData.headerBackgroundColor, color: pageData.headerTextColor}}>
        <a className={"sf-landing-page-link"} href={pageData.mainSiteLink}>{pageData.mainSite}</a>
        <div className={"sf-powered-by-footer"}>
            <a target="_blank" rel={"noreferrer"} className="sf-landing-powered-link"
               title={"Best free landing page creator"}
               href={"https://serviceform.com/landing-page"}>
                {logoImage}
            </a>
        </div>
    </footer>
}