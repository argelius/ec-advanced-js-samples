import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://www.boredapi.com/api/activity";

function App() {
  const [activity, updateActivity] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then(response => {
      updateActivity(response.data.activity);
    });
  }, []);

  if (!activity) {
    return <p>Loading activity...</p>;
  }

  return <p>{activity}</p>;
}

export default App;
