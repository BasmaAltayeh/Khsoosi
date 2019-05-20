import React from "react";
import ReactDOM from "react-dom";
import SignUp from "./components/SignUp.jsx"
import Rating from "./components/Rating.jsx";
import Search from './components/search.jsx';
import ResultSearch from './components/resultSearch.jsx';
import Header from './components/Header.jsx';
import Schedule from "./components/Schedule.jsx";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      cvFile: "",
      img: "",
      summary: "",
      is_teacher: false,
      password: "",
      email: "",
      phone: "",
      location: "",
      teacherProfiles: [],
      current_teacherId: "",
      current_studentId: "",
      ratingText: "",
      rate: "",
      subjectName: "",
      subjectLevel: "",
      day: "",
      startHour: "",
      endHour: ""
    };
  }
  onchangingSignUp(e){
    this.setState({[e.target.name]:e.target.value});
  }
  onSignUp(){
    console.log("signup");
    const { userName, is_teacher, password, email, phone, location } = this.state;
    const body = { userName, is_teacher, password, email, phone, location };
    fetch('/signup', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      return response.json();
    }).then((body) => {
      console.log(body)
      this.setState({ userName:'', is_teacher:'', password:'', email:'', phone:'', location:'' });
    });
  }
  componentDidMount() {}

  searchInfo(e) {
    console.log(this.state[e.target.name])
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }
  
  componentDidMount() { }

  onRatingChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  rating() {
    const body = { ratingText: this.state.ratingText, rate: this.state.rate };
    fetch('/rating', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      return response.json();
    }).then((body) => {
      console.log(body)
      this.setState({ ratingText: '', rate: '' });
    });
  }

  searchTecher(e) {

    e.preventDefault();

    // Default options are marked with *
    return fetch(`/search/?location=${this.state.location}&name=${this.state.subjectName}&level=${this.state.subjectLevel}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        // 'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response = response.json())
      .then(data => { this.setState({ teacherProfiles: data.data }); console.log(this.state.teacherProfiles) });

  }
  componentDidMount() { }

  render() {
    var tech = this.state.teacherProfiles;
    var { ratingText, rate, current_studentId, current_teacherId } = this.state;
    var RatingVariables = { ratingText, rate, current_studentId, current_teacherId };
    var { current_teacherId, day, startHour, endHour } = this.state;
    var ScheduleVariables = { current_teacherId, day, startHour, endHour };
    return (
      <div>
        <Header />
        <img src='https://www.trentu.ca/english/sites/trentu.ca.english/files/styles/header_image/public/header_images/header_creative_writing2.jpg?itok=qqMcjzSZ'/>
        <h1>Test by Cyber-Ninjas</h1>
        <SignUp onchangingSignUp={this.onchangingSignUp.bind(this)} onSignUp={this.onSignUp.bind(this)} is_teacher={this.state.is_teacher}/>
        <Search searchTecher={this.searchTecher.bind(this)} searchInfo={this.searchInfo.bind(this)} />
        <ResultSearch resultOfSer={tech} />
        <Schedule ScheduleVariables={ScheduleVariables}/>
        <Rating RatingVariables={RatingVariables} onChange={event => this.onRatingChange(event)} onClick={event => this.rating(event)} />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
