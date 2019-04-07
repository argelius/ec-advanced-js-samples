import React, { Component } from "react";

import styles from "./App.module.css";

/**
 * https://gist.github.com/gre/1650294
 */
const EASING_FUNCTIONS = {
  // no easing, no acceleration
  linear: function(t) {
    return t;
  },
  // accelerating from zero velocity
  easeInQuad: function(t) {
    return t * t;
  },
  // decelerating to zero velocity
  easeOutQuad: function(t) {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity
  easeInCubic: function(t) {
    return t * t * t;
  },
  // decelerating to zero velocity
  easeOutCubic: function(t) {
    return --t * t * t + 1;
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity
  easeInQuart: function(t) {
    return t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuart: function(t) {
    return 1 - --t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  // accelerating from zero velocity
  easeInQuint: function(t) {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuint: function(t) {
    return 1 + --t * t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  },
  easeOutElastic: function(t) {
    return Math.pow(2,-10*t) * Math.sin((t-0.3/4)*(2*Math.PI)/0.3) + 1;
  },
  /**
   * https://github.com/thednp/kute.js/blob/master/kute.js
   */
  easeOutBounce: function(t) {
    if ( t < ( 1 / 2.75 ) ) { return 7.5625 * t * t; }
    else if ( t < ( 2 / 2.75 ) ) { return 7.5625 * ( t -= ( 1.5 / 2.75 ) ) * t + 0.75; }
    else if ( t < ( 2.5 / 2.75 ) ) { return 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + 0.9375; }
    else {return 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + 0.984375; }
  },
};

function runAnimation(el, easingFunction, duration) {
  let start = null;
  let animationId = null;

  function step(timestamp) {
    if (!start) {
      start = timestamp;
    }

    const progress = timestamp - start;

    const d = Math.min(1, (progress / duration));

    const translation = easingFunction(d) * 170;

    el.style.transform = `translateY(${translation}px)`;

    if (progress < duration) {
      animationId = window.requestAnimationFrame(step);
    }
  }

  animationId = window.requestAnimationFrame(step);

  return () => {
    window.cancelAnimationFrame(animationId);
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 1000,
      easingFunction: Object.keys(EASING_FUNCTIONS)[0]
    };

    this.ballRef = React.createRef();

    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeEasingFunction = this.onChangeEasingFunction.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeDuration(e) {
    this.setState({ duration: parseInt(e.target.value) });
  }

  onChangeEasingFunction(e) {
    this.setState({ easingFunction: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { easingFunction, duration } = this.state;

    if (this.stopAnimation) {
      this.stopAnimation();
    }

    this.stopAnimation = runAnimation(
      this.ballRef.current,
      EASING_FUNCTIONS[easingFunction],
      duration,
    );
  }

  render() {
    const { easingFunction, duration } = this.state;
    const { onChangeEasingFunction, onChangeDuration, onSubmit } = this;

    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.ball} ref={this.ballRef} />
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <label>
            <div>Timing function</div>
            <select value={easingFunction} onChange={onChangeEasingFunction}>
              {Object.keys(EASING_FUNCTIONS).map(easingFunction => (
                <option key={easingFunction} value={easingFunction}>
                  {easingFunction}
                </option>
              ))}
            </select>
          </label>
          <label>
            <div>Duration</div>
            <input type="number" value={duration} onChange={onChangeDuration} />
          </label>
          <div>
            <button type="submit">Run animation!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
