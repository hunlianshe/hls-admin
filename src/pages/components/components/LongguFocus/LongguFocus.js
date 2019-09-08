

import React, {
  Component,
} from 'react';

import './LongguFocus.css';

class LongguFocus extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
  }

  close() {
    return this.props.close ? this.props.close() : null;
  }

  render() {
    return (
      <div className="longgu">
        <div className="longguName">龙骨结构</div>
        <div className="longguClose">关闭</div>
        <div className="longguBottom">
        </div>
      </div>


    )
  }
}

export default LongguFocus;
