import { useCallback, useState } from "react";
import axios from "axios";

export default function useRequestResource({ endpoint, resourceLabel }) {
    const [resourceList, setResourceList] = useState({
        results: []
    })

    const getResourceList = useCallback(({query = ""} = {}) => {
        axios.get(`/api/${endpoint}/${query}`).then((res) => {
            setResourceList({
                results: res.data
            });
        }).catch((err) => {
            console.error(err);
        });
    }, [endpoint]);

    return {
        resourceList,
        getResourceList
    }
}