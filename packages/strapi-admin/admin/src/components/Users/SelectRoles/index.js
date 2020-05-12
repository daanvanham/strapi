import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { ErrorMessage } from '@buffetjs/styles';
import { useGlobalContext } from 'strapi-helper-plugin';
import styles from './utils/styles';
import ClearIndicator from './ClearIndicator';
import DropdownIndicator from './DropdownIndicator';
import IndicatorSeparator from './IndicatorSeparator';
import MultiValueContainer from './MultiValueContainer';

const SelectRoles = ({ error, name, onChange, value }) => {
  const [options, setOptions] = useState([]);
  const { formatMessage } = useGlobalContext();
  const translatedError = error ? formatMessage(error) : null;

  useEffect(() => {
    // TODO
    setOptions([
      { id: 1, name: 'Super Admin' },
      { id: 2, name: 'Author' },
      { id: 3, name: 'Editor' },
    ]);
  }, []);

  return (
    <>
      <Select
        components={{
          ClearIndicator,
          DropdownIndicator,
          IndicatorSeparator,
          MultiValueContainer,
        }}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id}
        onChange={data => {
          onChange({ target: { name, value: data } });
        }}
        isMulti
        isClearable
        options={options}
        styles={styles}
        value={value}
      />
      {error && value.length === 0 ? (
        <ErrorMessage style={{ paddingTop: 11, paddingBottom: 0, marginBottom: 17 }}>
          {translatedError}
        </ErrorMessage>
      ) : (
        <div style={{ height: 11 }} />
      )}
    </>
  );
};

SelectRoles.defaultProps = {
  error: null,
  value: [],
};

SelectRoles.propTypes = {
  error: PropTypes.shape({
    id: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
};

export default SelectRoles;