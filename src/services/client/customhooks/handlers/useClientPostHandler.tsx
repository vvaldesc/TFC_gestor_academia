import useCheckProfilePhoto from "@/services/client/customhooks/useCheckProfilePhoto";
import usePostClient from "@/services/client/customhooks/usePostClient";
import type {Client, useCheckProfilePhotoType, usePostClientType} from "@/models/types"; // prettier-ignore
import { useEffect } from "react";


export const useClientPostHandler = (client: Client) => {
  let usePostClientResult = {} as usePostClientType;
  let useCheckProfilePhotoResult = {} as useCheckProfilePhotoType;
  debugger;

  useCheckProfilePhotoResult = useCheckProfilePhoto(client.image as string);

  useEffect(() => {
    if (useCheckProfilePhotoResult.validPhoto) {
      console.log("Valid");
      //client.image = encodeImage(client.image as string);
      usePostClientResult =
        useCheckProfilePhotoResult.validPhoto && usePostClient(client);
    } else {
      console.log("Invalid");
    }
  }, [useCheckProfilePhotoResult.validPhoto]);

  return {
    useCheckProfilePhotoType: useCheckProfilePhotoResult,
    usePostClientType: usePostClientResult,
  };
};
export default useClientPostHandler;
