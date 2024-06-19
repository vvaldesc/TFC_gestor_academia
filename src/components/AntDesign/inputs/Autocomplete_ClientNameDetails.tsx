import React, { useState } from "react";
import { AutoComplete } from "antd";

const Autocomplete_ClientNameDetails: React.FC<{ details_array: any; loading: boolean; setNamesFilter: (value: string) => void }> = ({
    details_array,
  loading,
  setNamesFilter
}) => {
    let namesOptions = details_array.map((item: any) => ({ value: item.client_id }));
    
    const uniqueNames = {};
    namesOptions = namesOptions.filter((item: any) => {
      if (uniqueNames[item.value]) {
        return false;
      } else {
        uniqueNames[item.value] = true;
        return true;
      }
    });

    namesOptions.sort((a: any, b: any) => a.value - b.value);

    const [value, setValue] = useState("");
    const [options, setOptions] = useState<{ value: string }[]>(namesOptions);

  const onSelect = (data: string) => {
    onChange(data);
    setNamesFilter(data);
  };

  const onChange = (data: string) => {
    setValue(data);
    if (data === "") {
        setOptions(namesOptions);
    } else {
        setOptions(namesOptions.filter((option) => option.value.toString().includes(data)));
    }
    setNamesFilter(data);
};

  return (
    <AutoComplete
        value={value}
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={onChange}
        placeholder="id de cliente"
      />
  );
};

export default Autocomplete_ClientNameDetails;