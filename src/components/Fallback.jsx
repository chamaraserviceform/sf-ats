import loadingImg from "../assets/black-oop.svg"
import "./Fallback.css"

export default function Fallback () {

    return <div className="no-chosen-chat-wrapper">
        <div className="no-tools-message-wrapper"><img src={loadingImg} alt=""/><span
            className="no-tools-message-title">No landing page found</span><span
            className="no-tools-message-description">Create your first landing page by clicking on the link below.</span>
            <button type="button" className="sf-btn sf-btn-primary"
                    onClick={() => window.location.href = 'https://dash.serviceform.com/signup'}>+ Create landing
                page
            </button>
        </div>
    </div>
}