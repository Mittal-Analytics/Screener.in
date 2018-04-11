import React from 'react'
import Modal from '../components/modal.jsx'
import Confirm from '../components/confirm.jsx'
import Icon from '../components/icon.jsx'
import {Link} from 'react-router'
import RatioSearch from '../components/ratio.search.jsx'
import api from '../api.js'
import ActionRows from './action.rows.jsx'


class ManageColumns extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      items: []
    }
    this.onOpen = this.onOpen.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  onOpen() {
    this.req = api.get(api.me).then(resp => {
      this.setState({
        items: resp.icolumns.split(',')
      });
    });
  }

  handleAdd(ratio) {
    var name = ratio.name;
    var data = {'ratio': name};
    return api.post(['users', 'column'], data).then(() => {
      this.setState({
        items: this.state.items.concat([name])
      });
    });
  }

  handleRemove(ratio) {
    var name = this.getDisplayName(ratio);
    var data = {'ratio': name};
    return api.delete(['users', 'column'], data);
  }

  handleReset() {
    var data = {columns: ''};
    return api.patch(['users', window.userId], data).then(resp => {
      this.setState({
        items: resp.icolumns.split(',')
      });
    })
  }

  getDisplayName(item) {
    return item
  }

  render() {
    return <span>
      <Modal
        onOpen={this.onOpen}
        onClose={this.props.onClose}
        style={this.props.style || 'default'}
        icon="pencil"
        name="Customize columns"
        title="Choose display columns"
        >
        <div>
          <RatioSearch onSelect={this.handleAdd} />
          <br />
          <ActionRows
            getDisplayName={this.getDisplayName}
            handleRemove={this.handleRemove}
            items={this.state.items} />
          <Confirm
            style="default"
            icon="repeat"
            onClick={this.handleReset}
            name="Reset to default"
          /> <Link to='/ratios/' className="btn btn-default">
            <Icon name="plus" /> Create new ratio
          </Link>
        </div>
      </Modal>
    </span>
  }

}

ManageColumns.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  style: React.PropTypes.string
}


export default ManageColumns
