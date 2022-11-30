//Import dependencies
import React, { useState } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


//Import style, navigation
import './App.css';
import Navigation from './components/Navigation';

// // Import Pages
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreatePage';
import EditExercisePage from './pages/EditPage';

// Function that renders content in routes using State
function App() {

  const [exercise, setExercise] = useState();

  return (
    <>
    <Router>
      <header>
        <h1>Athletica </h1>
        <p>Fitness for All</p>
      </header>

      <Navigation />
      
      <main>
        <Route path="/" exact>
          <HomePage setExercise={setExercise}/>
        </Route>

        <Route path="/create-exercises">
          <CreateExercisePage />
        </Route>

        <Route path="/edit-exercises">
          <EditExercisePage exercise={exercise}/>
        </Route>
      </main>

      <footer>
        <p>&copy; 2022 James Balden</p>
      </footer>
    </Router>
    </>
  );
}

export default App;
