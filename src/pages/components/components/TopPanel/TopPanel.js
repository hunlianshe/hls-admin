
import React, {
  Component,
} from 'react';

import './TopPanel.css';

class TopPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="topPanel">
        <div className="title">
          <label>黄浦地理信息平台</label>
        </div>
      </div>
    )
  }
}

export default TopPanel;


