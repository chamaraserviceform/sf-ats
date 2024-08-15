import {useEffect, useState} from "react";
import {generateId, loadScript} from "../helpers/util.js";
import {useNavigate, useParams} from "react-router-dom";
import SocialShare from "./SocialShare.jsx";

export default function ObjectBody ({objectData, pageData}) {

    const {url, objectId} = useParams();
    const navigation = useNavigate()

    const [jobTags, setJobTags] = useState([])

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

            getTags()
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

    function getTags () {
        const tagNames = ['tag1', 'tag2', 'tag3'];

        const allTags = []

        for (const tag of tagNames) {

            const pageTag = pageData[tag]

            const fieldConfig = objectData.fields.find(f => f.machine === pageTag);


            if (fieldConfig?.type === "select") {
                const selectOptions = fieldConfig.options.find(p => p.value ===  object[pageTag]);
                allTags.push(selectOptions?.label)
                continue
            }

            if (fieldConfig?.type === "tags") {

                if (Array.isArray(object[pageTag])) {
                    object[pageTag]
                      .forEach(t => {
                          allTags.push(fieldConfig.options.find(p => p.value === t)?.label);
                      })
                }
                continue
            }

            allTags.push(object[pageTag])
        }

        setJobTags(allTags)
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

            xhr.open("GET", currentUrl + "/api/public/tid/" + (object?.ats_form_select_4?.value || pageData.contactForm));
            xhr.send(data);
        }
    }, [pageData?.contactForm, object.ats_form_select_4]);

    function goBack () {
        navigation(`/${url}`)
    }


    return <div className={"sf-landing-page-body"}>
        <div className={"sf-landing-page-content"}>
            <div className={"flex justify-between items-center"}>
                <div className={"sf-landing-button sf-landing-button-back sf-anim mt-6"}
                     onClick={goBack}>
                    {pageData.objectBackLinkText}</div>
                <SocialShare object={object}/>
            </div>
            <div className={"sf-landing-page-item sf-landing-page-item-open"}>
                <div className={"sf-landing-page-item-item sf-landing-page-field"}
                     dangerouslySetInnerHTML={{__html: object[pageData.fullText]}}/>
                {
                    jobTags.map(tag => <div key={tag}
                      className={"sf-landing-page-item-item-2 sf-landing-page-field"}>{tag}</div>)
                }
            </div>


            <div id="sf-chat-tool-form" className={"sf-landing-page-contact-form"}>
            </div>
        </div>
    </div>
}