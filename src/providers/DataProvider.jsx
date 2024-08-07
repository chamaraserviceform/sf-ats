import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {getLandingPageData, getObjectData} from "../helpers/repository.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [pageData, setPageData] = useState(null);
    const [pageDataLoading, setPageDataLoading] = useState(false);
    const [objectData, setObjectData] = useState(null);
    const [objectDataLoading, setObjectDataLoading] = useState(false);
    const { url,objectId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            let data = null;
            setPageDataLoading(true)
            setObjectDataLoading(true)
            if (url) {
                data = await getLandingPageData(url);
                setPageData(data);
                setPageDataLoading(false)
            }

            if (data) {
                const object = await getObjectData(data.uid,data.flexSpace)
                setObjectData(object)
            }

            setPageDataLoading(false)
            setObjectDataLoading(false)
        };

        if (pageData === null || objectData === null) {
            fetchData()
        }

    }, []);

    return (
        <DataContext.Provider value={{pageData, objectData, pageDataLoading, objectDataLoading}}>
            {children}
        </DataContext.Provider>
    );
};
