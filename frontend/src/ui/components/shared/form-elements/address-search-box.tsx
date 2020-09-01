import React, { FC, Dispatch, SetStateAction } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { 
  Combobox, ComboboxInput, ComboboxPopover, 
  ComboboxList, ComboboxOption 
} from "@reach/combobox";


interface Props {
  placeholder: string;
  setFn: Dispatch<SetStateAction<string>>
}

const autoCompleteOptions = {
  requestOptions: {
    componentRestrictions: { country: "gh" }
  }
}

const SearchBox: FC<Props> = ({
  placeholder, setFn
}) => {
  const { 
    ready, value,
    suggestions: { status, data }, 
    setValue, clearSuggestions
  } = usePlacesAutocomplete(autoCompleteOptions);

  const handleChange = (e: any) => setValue(e.target.value);

  return (
    <Combobox
      className="search-box ml-1 mr-1"
      onSelect={(address: string) => {
        setValue(address, false);
        clearSuggestions();
        setFn(address);
      }}
    >
      <ComboboxInput
        className="form-control"
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder={placeholder}
      />
      <ComboboxPopover className="search-popover">
        <ComboboxList>
          {status === "OK" && 
            data
              .map(
                ({description}, index) => (
                  <ComboboxOption key={index} value={description} />
                )
              )
          }
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default SearchBox;