export default function PageHeader ({children,pageData, mainHeading, subHeading}) {

    return <div className={"sf-landing-page"}>
        <div className="sf-landing-page-header" style={{
            backgroundColor: pageData.headerBackgroundColor,
            backgroundImage: `url(${pageData.backgroundImage.url})`,
            color: pageData?.headerTextColor
        }}>
            <div className={"sf-landing-nav"}>
                <img className={"sf-landing-page-logo"} style={{height: `${pageData.logoHeight}px`}}
                     src={pageData.logo.url}/>
                <div className={"sf-landing-page-menu"}>
                    <a className={"sf-landing-page-link"} target={"_blank"} rel={"nofollow"}
                       href={pageData.mainSiteLink}>{pageData.mainSite}</a>
                </div>
            </div>
            <div className={"sf-landing-page-wrapper"}>
                <div className={"sf-lading-page-title"}>{mainHeading}</div>
                <div className={"sf-lading-page-subtitle"}>{subHeading}</div>
                {children}
            </div>
        </div>
    </div>
}