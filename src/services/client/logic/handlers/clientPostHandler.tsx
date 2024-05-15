import useCheckProfilePhoto from "@/services/client/customhooks/useCheckProfilePhoto";
import usePostClient from "@/services/client/customhooks/usePostClient";
import type {Client} from "@/models/types"; // prettier-ignore



import { useEffect } from "react";


export const clientPostHandler = (client: Client) => {
    debugger;
    let {valid, loading, error} = useCheckProfilePhoto(client.image as string);
    console.log(valid, loading, error);
    useEffect(() => {
        if(valid){
            console.log("Valid");
            //client.image = encodeImage(client.image as string);
            valid && usePostClient(client)
        }else{
            console.log("Invalid");
        }
    },[valid]);
    return {
        valid: valid || false,
        loading,
        error,
    };
};
export default clientPostHandler;