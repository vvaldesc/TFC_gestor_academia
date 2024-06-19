import React, { useState } from "react";
import { AutoComplete } from "antd";

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const Autocomplete_Mail: React.FC<{ profiles: any; loading: boolean; value: string; setEmailFilter: (value: string) => void }> = ({
  profiles,
  loading,
  setEmailFilter
}) => {
    let emailsArray = profiles.result.data.rows.map((row) => row[3]);
    // Mapear emailsArray a la estructura esperada
    let emailOptions = emailsArray.map(email => ({ value: email }));
    const [value, setValue] = useState("");
    const [options, setOptions] = useState<{ value: string }[]>(emailOptions);

  const onSelect = (data: string) => {
    onChange(data);
  };

  const onChange = (data: string) => {
    setValue(data);
    setOptions(emailOptions.filter((option) => option.value.includes(data)));
    setEmailFilter(data); // Aquí llamamos a setEmailFilter
  };

  return (
    <>
      <AutoComplete
        value={value}
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={onChange}
        placeholder="email"
      />
    </>
  );
};

export default Autocomplete_Mail;
