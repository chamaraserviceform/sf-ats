import {
    TwitterShareButton,
    TwitterIcon,
    FacebookShareButton,
    FacebookIcon,
    EmailShareButton,
    EmailIcon,
    LinkedinIcon,
    LinkedinShareButton
} from 'next-share'

import QRCode from 'qrcode.react';
import {useEffect, useState} from "react";
import qrIcon from "../assets/qr-code.png"

export default function SocialShare({object}) {

    const [title, setTitle] = useState("");

    useEffect(() => {
        if (object?.short_description_text) {
            setTitle(object?.short_description_text)
        }
    },[object])

    const downloadQRCode = () => {
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

    return <>
        <div className={"flex my-4"}>
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
        </div>
        <QRCode
            className={"hidden"}
            id="qrCodeEl"
            size={150}
            value={window.location.href}
        />
    </>

}