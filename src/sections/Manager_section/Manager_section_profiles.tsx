import Profiles_table from "@/components/AntDesign/tables/Profiles_table";
import Docent_post_modal from "@/components/AntDesign/modals/Docent_post_modal";
import { Modal } from "antd";

import useGetProfiles from '@/services/client/customhooks/useGetProfiles';

export default function Manager_section_profiles(props: {sessionInfo: ProfileSession}) {
    const { profiles, loading } = useGetProfiles();

  return (
    <>
      <Docent_post_modal />
      <Profiles_table profiles={profiles} loading={loading} />
    </>
  );
}
