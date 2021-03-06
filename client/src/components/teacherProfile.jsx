import React from 'react';
import Rating from './Rating.jsx';
class TeacherProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Rate: false,
			day: 'Sunday',
			startHour: '',
			endHour: ''
		};
	}

	openModal(e) {
		this.setState({
			[e]: true
		});
	}

	closeModal(e) {
		this.setState({
			[e]: false
		});
	}
	componentWillMount() {
		this.props.showTeacherInfo();
	}
	pick(e) {
		e.preventDefault();
		const { current_studentId, current_teacherId } = this.props;
		const { day, startHour, endHour } = this.state;
		const info = {
			studentId: current_studentId,
			teacherId: current_teacherId,
			day,
			startHour,
			endHour
		};
		console.log('okkkk', info);
		return fetch('/pickTeacher', {
			method: 'post',
			body: JSON.stringify({
				studentId: current_studentId,
				teacherId: current_teacherId,
				day,
				startHour,
				endHour
			}),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}).then((result) => {
			this.setState({ message: ' Your request was send ... please wait for confirmation' });
			setTimeout(() => {
				this.setState({ message: '' });
			}, 4000);
		});
	}

	radioChange(e) {
		let values = e.target.value;
		values = values.split(' ');
		this.setState({
			day: values[0],
			startHour: values[1],
			endHour: values[2]
		});

		// console.log(this.state);
	}
	render() {
		// const schedules = this.props.teacherInfo.schedules;
		var that = this;
		return (
			<div className="Teacherinfo">
				<div className="teacherProfileView row">
					<div className="teacherInfo col-sm-4">
						<legend>Teacher Info</legend>
						<img
							src={this.props.teacherInfo.imgUrl || 'https://via.placeholder.com/100x100'}
							alt="uploaded images"
							height="100"
							width="100"
						/>
						<br />
						<label htmlFor="">Name: </label> {this.props.teacherInfo.userName}
						<br />
						<label htmlFor="">email: </label> {this.props.teacherInfo.email}
						<br />
						<label htmlFor="">Phone: </label> {this.props.teacherInfo.phone}
						<br />
						<label htmlFor="">Location: </label> {this.props.teacherInfo.location}
						<br />
						<legend>Students feedback</legend>
						<div className="ratingScroll">
							{this.props.teacherInfo.ratings.map((rates, index) => {
								return (
									<div key={index}>
										<label htmlFor="">
											<b>Testimonial: </b>
										</label>{' '}
										{rates.text} <br />
										<label htmlFor="">
											<b>Rating level:</b>{' '}
										</label>{' '}
										{rates.rate} <br />
									</div>
								);
							})}
						</div>
					</div>

					<div className="teacherCV col-sm-4">
						<legend>Summary</legend>
						<p>{this.props.teacherInfo.summary}</p>
						<legend>Teacher CV</legend>
						<iframe className="cv" src={this.props.teacherInfo.cvFileUrl}>
							<p>{"javascript:alert('No file exist');"}</p>
						</iframe>
					</div>

					<div className="teacherSchedule col-sm-4">
						<legend>Teacher Schedule</legend>
						<ul>
							<p>Please select your class time:</p>
							{this.props.teacherInfo.schedules.map((time, index) => {
								return (
									<li key={index}>
										{' '}
										<input
											type="radio"
											name="day"
											value={`${time.day} ${time.startHour} ${time.endHour}`}
											onClick={this.radioChange.bind(this)}
											id={`radio${index}`}
										/>{' '}
										{time.day}
										{' start at:'} {time.startHour} {' end at:'} {time.endHour}
									</li>
								);
							})}
						</ul>
						<div>
							<button className="btn btn-primary" onClick={this.pick.bind(this)}>
								Pick
							</button>
							<br />
							<label /> {this.state.message}
						</div>
						<br />
						<br />
						<div>
							<Rating
								current_studentId={this.props.current_studentId}
								current_teacherId={this.props.current_teacherId}
								showTeacherInfo={this.props.showTeacherInfo}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TeacherProfile;
