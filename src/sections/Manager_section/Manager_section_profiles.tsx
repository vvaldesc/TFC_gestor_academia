import Profiles_table from "@/components/AntDesign/tables/Profiles_table";
import { Modal } from "antd";
import Profile_post_modal from "@/components/AntDesign/modals/Profile_post_modal";

import useGetProfiles from '@/services/client/customhooks/useGetProfiles';

export default function Manager_section_profiles(props: {sessionInfo: ProfileSession}) {
    const { profiles, loading } = useGetProfiles();

  return (
    <>
      <Profile_post_modal />
      <Profiles_table profiles={profiles} loading={loading} />
    </>
  );
}
