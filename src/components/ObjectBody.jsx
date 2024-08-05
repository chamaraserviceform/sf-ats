import {useEffect} from "react";
import {generateId, loadScript} from "../helpers/util.js";
import {useNavigate, useParams} from "react-router-dom";

export default function ObjectBody ({objectData, pageData}) {

    const {url, objectId} = useParams();
    const navigation = useNavigate()

    const object = objectData?.items?.find(i => i.id === objectId);


    useEffect(() => {

        if (pageData?.contactForm) {
            const currentUrl = "https://dash.serviceform.com"

            var data = "";
            var xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", async function () {
                if (this.readyState === 4) {
                    var response = this.responseText;
                    window.sf3pid = pageData.uid;
                    window.sfV3 = {
                        fsid: generateId(30),
                        browser: function () {
                            return ""
                        },
                        stats: {
                            tid: pageData.contactForm,
                            tool: pageData.contactForm,
                            device: "",
                            pid: window.sf3pid,
                            lang: "",
                            browser: ""
                        },
                        sendStats: function () {

                        }
                    }
                    response = JSON.parse(response);
                    window.formChatData = response;
                    window.formChatData.tid = response.id;

                    if (window.sfFormKit) {
                        window.sfFormKit.resetForm();
                    } else {
                        if (response !== '404') {
                            var link = document.createElement("link");
                            link.rel = "stylesheet";
                            let u = currentUrl;

                            if (window.location.href.includes('test.html')) {
                                u = 'http://localhost:3000';
                            }
                            link.href = u + '/embed/form.css?11';
                            document.getElementsByTagName("head")[0].appendChild(link);
                            // if (window.location.href.includes('test.html')) {
                            //   url = 'http://localhost:3000';
                            // }
                            loadScript(u + '/embed/form.js?11', console.log)
                        } else {
                            console.log("no response")
                        }
                    }
                }
            });

            xhr.open("GET", currentUrl + "/api/public/tid/" + pageData.contactForm);
            xhr.send(data);
        }
    }, [pageData?.contactForm]);

    function goBack () {
        navigation(`/${url}`)
    }


    return <div className={"sf-landing-page-body"}>
        <div className={"sf-landing-page-content"}>
            <div className={"sf-landing-button sf-landing-button-back sf-anim"}
                 onClick={goBack}>
                {pageData.objectBackLinkText}</div>
            <div className={"sf-landing-page-item sf-landing-page-item-open"}>
                <div className={"sf-landing-page-item-item sf-landing-page-field"}
                     dangerouslySetInnerHTML={{__html: object[pageData.fullText]}}/>
                <div className={"sf-landing-page-item-item-2 sf-landing-page-field"}>{object[pageData.tag1]}</div>
                {object[pageData.tag2] && <div
                    className={"sf-landing-page-item-item-2 sf-landing-page-field"}>{object[pageData.tag2]}</div>}
                {
                    object[pageData.tag3] && <div
                        className={"sf-landing-page-item-item-2 sf-landing-page-field"}>{object[pageData.tag3]}</div>
                }
            </div>

            <div id="sf-chat-tool-form" className={"sf-landing-page-contact-form"}>
            </div>
        </div>
    </div>
}