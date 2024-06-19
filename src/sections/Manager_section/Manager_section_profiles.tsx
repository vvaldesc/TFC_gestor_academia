import type { sessionInfoState } from "@/models/types";
import { ConfigProvider } from 'antd';
import React, { useState, useEffect } from "react";

import Profiles_table from "@/components/AntDesign/tables/Profiles_table";
import Autocomplete_Mail from "@/components/AntDesign/inputs/Autocomplete_Mail";

import useGetProfiles from '@/services/client/customhooks/useGetProfiles';

export default function Manager_section_profiles(props: {sessionInfo: sessionInfoState}) {
    const {profiles, loading}: {profiles: any, loading: boolean} = useGetProfiles();
    const [filteredProfilesResult, setFilteredProfilesResult] = useState(null);

    const setNewEmailFilter = (value: string) => {
        if (value === "") {
            setFilteredProfilesResult(profiles);
        } else {
            let newFilteredProfiles = JSON.parse(JSON.stringify(profiles));
            if (newFilteredProfiles && newFilteredProfiles.result && newFilteredProfiles.result.data) {
                newFilteredProfiles.result.data.rows = newFilteredProfiles.result.data.rows.filter((row) => row[3].includes(value));
            }
            setFilteredProfilesResult(newFilteredProfiles);
        }
    }

    useEffect(() => {
        setFilteredProfilesResult(profiles);
    }, [profiles]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ea7af4',
            borderRadius: 5,
            colorBgElevated: '#fff1fa',
            colorLinkHover: '#ff69d4',
            colorLinkActive: '#ff69d4',
          },
        }}
      >
          {profiles?.result?.data && <Autocomplete_Mail profiles={profiles} loading={loading} setEmailFilter={setNewEmailFilter} />}
        <Profiles_table profiles={filteredProfilesResult} loading={loading} />
      </ConfigProvider>
    </>
  );
}