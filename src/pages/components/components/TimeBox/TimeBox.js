

import React, {
	Component,
} from 'react';

import './TimeBox.css';

class TimeBox extends Component {
	constructor(props) {
		super(props);

		this.interval = null;
		this.state = {
			timeNow: '',
			dateNow: '',
		}
	}

	componentDidMount() {
		this.getdateNow();
	}

	componentWillUnmount() {
		if (this.interval !== null) {
			clearInterval(this.interval);
		}
	}

	// 获取实时time
	getdateNow() {
		let time = '';
		this.interval = setInterval(() => {
			time = new Date();
			const year = time.getFullYear();
			const month = (time.getMonth() + 1) > 9
										? (time.getMonth() + 1)
										: `0${(time.getMonth() + 1)}`;
			const day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;
			const hh = time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`;
			const mm = time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`;
			const ss = time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`;
			this.setState({
				timeNow: `${hh} : ${mm} : ${ss}`,
				dateNow: `${year}.${month}.${day}`,
			});
		}, 1000);
	}

	render() {
		const {
			timeNow,
			dateNow,
		} = this.state;
		return (
			<div className="TimeBox">
				<div>{timeNow} <span>|</span> {dateNow}</div>
			</div>
		)
	}
}

export default TimeBox;


