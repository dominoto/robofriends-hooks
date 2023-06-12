import React, { useState, useEffect } from "react"; // import hooks
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";

// use react-error-boundary instead of custom ErrorBoundary.js class component
function ErrorFallback({ error }) {
  return (
    <div>
      <h1>Oooops. That's not good.</h1>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export default function App() {
  // useState instead of this.state
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState("");

  // useEffect instead of componentDidMount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users))
      .catch((error) => console.error(error));
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  // no render() method so directly return
  return !robots.length ? (
    <h1>Loading...</h1>
  ) : (
    <div className="tc">
      <h1 className="f2">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}
