import {firestore} from "./firebaseInit.js";
import {collection,getDocs, query, where} from "firebase/firestore"
import axios from "axios";

export async function getLandingPageData (landingPageUrl) {
    try {
        // Reference to the audiences collection
        const audiencesCollectionRef = collection(firestore, 'flows');

        // Query the audiences collection for documents where url === "careers"
        const querySnapshot = await getDocs(query(audiencesCollectionRef, where('url', '==', landingPageUrl)));

        // Get the first document from the query snapshot (assuming there's only one document with url === "careers")
        const docSnap = querySnapshot.docs[0];

        if (docSnap) {
            // Document exists, you can access its data using docSnap.data()
            let audienceData = docSnap.data();
            audienceData.id = docSnap.id;
            // Optionally set the audience state
            return audienceData;
        } else {
            return null
        }
    } catch (error) {
        console.error("Error fetching audience:", error);
        return null
    }
}

export async function getObjectData(masterId, spaceId) {
    const requestData = {
        pageSize: 20,
        masterId: masterId
    };

    try {

        const res = await axios.post(`https://link.serviceform.com/public/flex/spaces/${spaceId}/items`, requestData)

        return res.data

    } catch (e) {
        console.log(e)
        return null
    }
}