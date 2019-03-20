import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";
import { token$, updateToken } from "./auth";
import "./App.css";

const API_ROOT = "http://ec2-13-53-46-89.eu-north-1.compute.amazonaws.com:3000";

const Home = () => (
  <>
    <h1>Home</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </>
);

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: token$.value,
      profile: null,
      finished: false
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.subscription = token$.subscribe((token) => {
      this.setState({ token });
    });

    this.source = axios.CancelToken.source();

    axios
      .get(`${API_ROOT}/me`, {
        cancelToken: this.source.token,
        headers: {
          Authorization: `bearer ${token$.value}`
        }
      })
      .then(response => {
        this.setState({ profile: response.data.profile });
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          return;
        }

        /**
         * Probably token expired.
         */
        updateToken(null);
      });
  }

  componentWillUnmount() {
    this.source.cancel();
    this.subscription.unsubscribe();
  }

  onChangeName(e) {
    const profile = { ...this.state.profile };
    profile.name = e.target.value;
    this.setState({ profile });
  }

  onChangeAge(e) {
    const profile = { ...this.state.profile };
    profile.age = parseInt(e.target.value) || 0;
    this.setState({ profile });
  }

  onSubmit(e) {
    e.preventDefault();

    const { profile, token } = this.state;

    this.source = axios.CancelToken.source();

    axios
      .put(`${API_ROOT}/me`, profile, {
        cancelToken: this.source.token,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.setState({ finished: true });
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          return;
        }

        /**
         * Probably token expired.
         */
        updateToken(null);
      });
  }

  render() {
    const { token, profile, finished } = this.state;

    if (finished) {
      return <Redirect to="/profile" />;
    }

    if (!token) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <h1>Edit profile</h1>
        {profile ? (
          <form onSubmit={this.onSubmit}>
            <label>
              <div>Email</div>
              <input type="email" value={profile.email} disabled />
            </label>
            <label>
              <div>Name</div>
              <input
                type="text"
                value={profile.name}
                onChange={this.onChangeName}
                maxLength={40}
              />
            </label>
            <label>
              <div>Age</div>
              <input
                type="number"
                min={0}
                max={1000}
                required
                value={profile.age}
                onChange={this.onChangeAge}
              />
            </label>
            <button type="submit">Save</button>
          </form>
        ) : (
          <p>Loading profile...</p>
        )}
      </>
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: token$.value,
      profile: null
    };
  }

  componentDidMount() {
    this.subscription = token$.subscribe((token) => {
      this.setState({ token });
    });

    this.source = axios.CancelToken.source();

    axios
      .get(`${API_ROOT}/me`, {
        cancelToken: this.source.token,
        headers: {
          Authorization: `bearer ${token$.value}`
        }
      })
      .then(response => {
        this.setState({ profile: response.data.profile });
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          return;
        }

        /**
         * Probably token expired.
         */
        updateToken(null);
      });
  }

  componentWillUnmount() {
    this.source.cancel();
    this.subscription.unsubscribe();
  }

  render() {
    const { token, profile } = this.state;

    if (!token) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <h1>Profile</h1>
        {profile ? (
          <>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Age:</strong> {profile.age}
            </p>

            <Link to="/edit">Edit profile</Link>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMessage: null,
      finished: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  componentWillUnmount() {
    if (this.source) {
      this.source.cancel();
    }
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    this.source = axios.CancelToken.source();

    axios
      .post(
        `${API_ROOT}/auth`,
        {
          email,
          password
        },
        {
          cancelToken: this.source.token
        }
      )
      .then(response => {
        const token = response.data.token;
        updateToken(token);
        this.setState({ finished: true });
      })
      .catch(error => {
        console.log(error);
        if (!axios.isCancel(error)) {
          this.setState({ errorMessage: "Something went wrong!" });
        }
      });
  }

  render() {
    const { email, password, errorMessage, finished } = this.state;

    if (finished) {
      return <Redirect to="/profile" />;
    }

    return (
      <form onSubmit={this.onSubmit}>
        <label>
          <div>Email</div>
          <input
            type="email"
            required
            value={email}
            onChange={this.onChangeEmail}
          />
        </label>
        <label>
          <div>Password</div>
          <input
            type="password"
            required
            value={password}
            onChange={this.onChangePassword}
          />
        </label>
        {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null
    };

    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    this.subscription = token$.subscribe((token) => {
      this.setState({ token });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  logOut() {
    updateToken(null);
  }

  render() {
    return (
      <Router>
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {this.state.token ? (
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              ) : null}
              <li>
                <Link to="/login">Sign in</Link>
              </li>
            </ul>
          </nav>

          {this.state.token ? (
            <button onClick={this.logOut}>Sign out</button>
          ) : null}

          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/edit" component={Edit} />
        </>
      </Router>
    );
  }
}

export default App;
