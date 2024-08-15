import {
    TwitterShareButton,
    TwitterIcon,
    FacebookShareButton,
    FacebookIcon,
    EmailShareButton,
    EmailIcon,
    LinkedinIcon,
    LinkedinShareButton,
} from 'next-share'

import QRCode from 'qrcode.react';
import {useEffect, useState} from "react";
import qrIcon from "../assets/qr-code.png"
import copyIcon from "../assets/copy.png"
import whatsAppIcon from "../assets/whatsapp.png"
// import share from "../assets/share.png"
import { isBrowser, isMobile } from 'react-device-detect';


export default function SocialShare({object}) {

    const [title, setTitle] = useState("");

    useEffect(() => {
        if (object?.short_description_text) {
            setTitle(object?.short_description_text)
        }
    },[object])

    function downloadQRCode () {
        const qrCodeURL = document.getElementById('qrCodeEl')
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        console.log(qrCodeURL)
        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = "QR_Code.png";
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    }

    function copyLink() {
        navigator.clipboard.writeText(window.location.href)
    }

    function shareToApp() {
        if (navigator.share) {

            navigator.share({
                title: title,
                url: window.location.href
            })
            .then(() => console.log('Successful share'))
            .catch(error => console.log('Error sharing:', error));
        }
    }

    function shareToWhatsApp () {
        if (isMobile) {
            window.open(`whatsapp://send?text=${title} ${window.location.href}`);
        }

        if (isBrowser) {
            window.open(`https://web.whatsapp.com://send?text=${title} ${window.location.href}`);
        }
    }

    return <>
        <div className={"flex my-4 justify-end"}>
            <TwitterShareButton
                url={window.location.href}
                title={title}
            >
                <TwitterIcon size={32} round/>
            </TwitterShareButton>
            <FacebookShareButton
                url={window.location.href}
                title={title}
            >

                <FacebookIcon size={32} round/>
            </FacebookShareButton>
            <EmailShareButton
                url={window.location.href}
                title={title}
            >

                <EmailIcon size={32} round/>
            </EmailShareButton>
            <LinkedinShareButton
                url={window.location.href}
                title={title}
            >

                <LinkedinIcon size={32} round/>
            </LinkedinShareButton>
            <div className={"rounded-[50%] bg-gray-200 p-2 hover:cursor-pointer"} onClick={downloadQRCode}>
                <img src={qrIcon} width={16} alt={"QR Code"} />
            </div>
            <div className={"rounded-[50%] bg-red-200 p-2 hover:cursor-pointer"} onClick={copyLink}>
                <img src={copyIcon} width={16} alt={"copy"}/>
            </div>
            {/*<div className={"rounded-[50%] bg-blue-200 p-2 hover:cursor-pointer"} onClick={shareToApp}>*/}
            {/*    <img src={share} width={16} alt={"copy"}/>*/}
            {/*</div>*/}
            <div className={"rounded-[50%] bg-green-200 p-2 hover:cursor-pointer"} onClick={shareToWhatsApp}>
                <img src={whatsAppIcon} width={16} alt={"copy"}/>
            </div>
        </div>
        <QRCode
            className={"hidden"}
            id="qrCodeEl"
            size={150}
            value={window.location.href}
        />
    </>

}