import type { ProfileSession } from "@/models/types";

import Profiles_table from "@/components/AntDesign/tables/Profiles_table";

import useGetProfiles from '@/services/client/customhooks/useGetProfiles';

export default function Manager_section_profiles(props: {sessionInfo: ProfileSession}) {
    const { profiles, loading } = useGetProfiles();

  return (
    <>
      <Profiles_table profiles={profiles} loading={loading} />
    </>
  );
}
