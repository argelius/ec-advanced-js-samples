import React, { Component, PureComponent } from "react";
import logo from "./logo.svg";
import moment from "moment";
import axios from "axios";
import throttle from 'lodash.throttle';
import "./App.css";

const API_ROOT = "https://api.dryg.net/dagar/v2.1";

function debounce(fn, delay = 100) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  }
}

class DayInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    const { date } = this.props;

    const formattedDate = date.replace(/-/g, "/");

    this.setState({ data: null });

    if (this.source) {
      this.source.cancel();
    }

    this.source = axios.CancelToken.source();

    axios
      .get(`${API_ROOT}/${formattedDate}`, {
        cancelToken: this.source.token
      })
      .then(response => {
        this.setState({ data: response.data });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.fetchData();
    }
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return <p>Fetching data...</p>;
    }

    const dayInfo = data.dagar[0];

    const dateInPast =
      moment(dayInfo.datum).startOf("day") < moment().startOf("day");

    return (
      <>
        <h2 style={{ color: dayInfo["röd dag"] == "Ja" ? "red" : null }}>
          {dayInfo.datum}
        </h2>
        {dayInfo["flaggdag"] ? <p>{dayInfo["flaggdag"]}</p> : null}
        <p>
          Det {dateInPast ? "var" : "kommer att vara"} en {dayInfo.veckodag}
        </p>
        <p>{dayInfo.namnsdag.join(", ")} har namnsdag.</p>
      </>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format("YYYY-MM-DD")
    };

    this.onChangeDate = this.onChangeDate.bind(this);
  }

  onChangeDate(e) {
    this.setState({ date: e.target.value });
  }

  render() {
    const { date } = this.state;

    return (
      <div className="App">
        <input type="date" value={date} onChange={this.onChangeDate} />
        <DayInfo date={date} />
      </div>
    );
  }
}

export default App;
