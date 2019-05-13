import React, { useState } from "react";
import "./App.css";

const ThemeContext = React.createContext({
  theme: "dark",
  toggleTheme: function() {}
});

function ToggleThemeButton(props) {
  const { style, ...rest } = props;

  return (
    <ThemeContext.Consumer>
      {value => {
        const { theme, toggleTheme } = value;

        const backgroundColor = theme === "dark" ? "#eee" : "#111";
        const textColor = theme === "dark" ? "#111" : "#eee";

        return (
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor,
              color: textColor,
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "0.9rem",
              ...style
            }}
            {...rest}
          >
            Toggle theme
          </button>
        );
      }}
    </ThemeContext.Consumer>
  );
}

function Header(props) {
  const { style, ...rest } = props;

  return (
    <ThemeContext.Consumer>
      {value => {
        const { theme } = value;

        const textColor = theme === "dark" ? "#fff" : "#000";

        return (
          <h1
            style={{
              marginTop: 0,
              color: textColor,
              ...style
            }}
            {...rest}
          >
            This is the {theme} theme
          </h1>
        );
      }}
    </ThemeContext.Consumer>
  );
}

function Paragraph(props) {
  const { style, ...rest } = props;

  return (
    <ThemeContext.Consumer>
      {value => {
        const { theme } = value;

        const textColor = theme === "dark" ? "#fff" : "#000";

        return (
          <p
            style={{
              color: textColor,
              ...style
            }}
            {...rest}
          />
        );
      }}
    </ThemeContext.Consumer>
  );
}

function RadioButton(props) {
  const { style, label, ...rest } = props;

  return (
    <ThemeContext.Consumer>
      {value => {
        const { theme } = value;

        const textColor = theme === "dark" ? "#fff" : "#000";

        return (
          <label
            style={{
              color: textColor,
              display: 'flex',
              alignItems: 'center',
              margin: '5px 0',
              position: 'relative',
              ...style
            }}
          >
            <input
              className="radio-input"
              type="radio"
              style={{
                border: 0,
                clip: 'rect(0 0 0 0)',
                height: 1,
                margin: -1,
                overflow: 'hidden',
                padding: 0,
                position: 'absolute',
                width: 1,
              }}
              {...props}
            />
            <div
              className="outer-circle"
              style={{
                width: 24,
                height: 24,
                boxSizing: 'border-box',
                border: `2px solid ${textColor}`,
                borderRadius: '50%',
                margin: 5,
              }}
            />
            <div
              className="inner-circle"
              style={{
                width: 14,
                height: 14,
                backgroundColor: textColor,
                borderRadius: '50%',
                position: 'absolute',
                top: 10,
                left: 10,
              }}
            />
            <span>{label}</span>
          </label>
        );
      }}
    </ThemeContext.Consumer>
  );
}

function MyComponent(props) {
  return (
    <ThemeContext.Consumer>
      {value => (
        <div
          style={{
            backgroundColor: value.theme === "dark" ? "#000" : "#fff",
            minHeight: "100vh",
            padding: "10px"
          }}
        >
          <Header />
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Paragraph>
          <Paragraph>These are some themed radio buttons</Paragraph>
          <RadioButton label="Banana" name="fruit" />
          <RadioButton label="Banana" name="fruit" />
          <RadioButton label="Banana" name="fruit" />
          <RadioButton label="Banana" name="fruit" />
          <ToggleThemeButton />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

function App() {
  const [theme, updateTheme] = useState("light");

  const themeContext = {
    theme,
    toggleTheme: () => updateTheme(theme === "dark" ? "light" : "dark")
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      <MyComponent />
    </ThemeContext.Provider>
  );
}

export default App;
