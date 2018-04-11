"use strict";
import React from 'react'


function Icon(props) {
  var name = "glyphicon glyphicon-" + props.name;
  return <i
    className={name} />;
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default Icon
