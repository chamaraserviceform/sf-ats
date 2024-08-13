import {useEffect} from "react";
import {generateId, loadScript} from "../helpers/util.js";
import {useNavigate, useParams} from "react-router-dom";
import SocialShare from "./SocialShare.jsx";

export default function ObjectBody ({objectData, pageData}) {

    const {url, objectId} = useParams();
    const navigation = useNavigate()

    const object = objectData?.items?.find(i => i.id === objectId);

    useEffect(() => {
        if (object) {

            window.sfDynamicData = {
                relation: [{
                    "label": object.primary_field,
                    "value": object.id,
                    "spaceId" : object.space_id,
                }]
            }
        }

    }, [])

    function getTagName(field, data) {

        if (objectData?.fields?.length) {
            const fieldConfig = objectData.fields.find(f => f.machine === field);

            if (fieldConfig?.type === "select") {
                const selectOptions = fieldConfig.options.find(p => p.value ===  data[field]);
                return selectOptions?.label
            }
        }

        return data[field]
    }


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
                            tid: (object?.ats_form_select_4?.value || pageData.contactForm),
                            tool: (object?.ats_form_select_4?.value || pageData.contactForm),
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
                            let u = 'http://localhost:3000';

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

            xhr.open("GET", currentUrl + "/api/public/tid/" + (object?.ats_form_select_4?.value || pageData.contactForm));
            xhr.send(data);
        }
    }, [pageData?.contactForm, object.ats_form_select_4]);

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
                <div className={"sf-landing-page-item-item-2 sf-landing-page-field"}>{getTagName(pageData.tag1, object)}</div>
                {object[pageData.tag2] && <div
                    className={"sf-landing-page-item-item-2 sf-landing-page-field"}>{getTagName(pageData.tag2, object)}</div>}
                {
                    object[pageData.tag3] && <div
                        className={"sf-landing-page-item-item-2 sf-landing-page-field"}>{getTagName(pageData.tag3, object)}</div>
                }
            </div>
            <SocialShare object={object}/>

            <div id="sf-chat-tool-form" className={"sf-landing-page-contact-form"}>
            </div>
        </div>
    </div>
}