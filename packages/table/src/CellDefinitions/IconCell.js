import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';

const IconCell = ({ name, title }) => {
  const IconCellDef = ({ value }) => {
    let generatedTitle;
    if (typeof title === 'function') {
      generatedTitle = title(value);
    } else if (typeof title === 'string') {
      generatedTitle = title;
    }
    return value ? <Icon name={name} title={generatedTitle} /> : null;
  };

  IconCellDef.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
  };

  return IconCellDef;
};

IconCell.propTypes = {
  iconConfig: PropTypes.shape([
    {
      name: PropTypes.string,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    },
  ]),
};

export default IconCell;
