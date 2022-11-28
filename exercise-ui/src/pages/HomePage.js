// Imports
import React from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExercise }) {

    const history = useHistory();

    const [exercises, setExercises] = useState([]);

    // RETRIEVE the list of exercises
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }


    // UPDATE a exercise
    const onEditExercise = async exercise => {
        setExercise(exercise);
        history.push('/edit-exercises');
    }


    // DELETE a exercise
    const onDeleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with id: ${_id}, status code: ${response.status}`);
        }
    }


    // LOAD the exercises
    useEffect(() => {
        loadExercises();
    }, []);

    // DISPLAY the exercises
    return (
        <>
        <article>
            <h2>List of exercises</h2>
            <p>paragraph</p>
            <ExerciseTable
                exercises={exercises}
                onEdit={onEditExercise}
                onDelete={onDeleteExercise}
                />            
        </article>
        </>
    );
}

// function HomePage() {
//     return (
//         <>
//         <article>
//             <h2>List of Exercises</h2>
//             <p>This is a test</p>
//         </article>
//         </>
//     );
// }

    

export default HomePage;