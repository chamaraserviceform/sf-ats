import {firestore} from "../helpers/firebaseInit.js";
import {collection,getDocs, query, where} from "firebase/firestore"

export default async function getLandingPageData (landingPageUrl) {
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
    }
}