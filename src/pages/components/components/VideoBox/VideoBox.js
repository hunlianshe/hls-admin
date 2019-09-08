

import React, {
  Component,
} from 'react';

import './VideoBox.css';
import icon_close from '../../../public/images/icon-close.png';

class VideoBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoUrl:"http://15.112.37.157",
    }

    // this.closeVideo = this.closeVideo.bind(this);

  }

  componentDidMount() {
  }

  closeVideo() {
    console.log('closeVideo');
    return this.props.closeVideo ? this.props.closeVideo() : null;
  }

  render() {
    const {
      videoPlay,
      source,
    } = this.props;
    // alert(this.props.videoUrl);
    return (
      <div className="videoBox">
        <div className="close" onClick={() => this.closeVideo()}>
          <img src={icon_close} />
        </div>
        <iframe name="videoThumb"  id="videoThumb"  src={this.props.videoUrl}  frameBorder="0" align="middle"  width="100%"  height="90%"  scrolling="no"></iframe>
        <div className="text-part">实时监控画面</div>
      </div>
    )
  }
}

export default VideoBox;


