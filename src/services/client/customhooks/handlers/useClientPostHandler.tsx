import useCheckProfilePhoto from "@/services/client/customhooks/useCheckProfilePhoto";
import usePostClient from "@/services/client/customhooks/usePostClient";
import type {Client, useCheckProfilePhotoType, usePostClientType} from "@/models/types"; // prettier-ignore


export const useClientPostHandler = (client: Client,submit: boolean) => {
  let usePostClientResult = {} as usePostClientType;
  let useCheckProfilePhotoResult = {} as useCheckProfilePhotoType;


  useCheckProfilePhotoResult = useCheckProfilePhoto(client.image as string, submit as boolean);
  debugger
  useCheckProfilePhotoResult.validPhoto = true;
  usePostClientResult = usePostClient(client, useCheckProfilePhotoResult.validPhoto as boolean, submit as boolean);

  return {
    useCheckProfilePhotoType: useCheckProfilePhotoResult,
    usePostClientType: usePostClientResult,
  };
};
export default useClientPostHandler;
