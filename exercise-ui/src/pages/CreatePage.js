import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit , setUnit] = useState('lbs'); 
    const [date, setDate] = useState('');

    const history = useHistory();

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully created new exercise!");
        } else {
            alert(`Failed to add new exercise, statuse code: ${response.status}`);
        }
        history.push('/');
    };

    return (
        <>
        <article>
            <h2>Create a new exercise entry</h2>
            <form onSubmit={(e) => {
                createExercise();
                e.preventDefault();
                }}>
                <fieldset>
                    <legend>Add your exercise data</legend>
                    <label for="name">Exercise</label>
                    <input
                        type="text" required
                        pattern="[A-Za-z]+"
                        title="Exercise name no special characters"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id="name" />

                    <label for="reps">Number of Reps</label>
                    <input
                        type="text" required
                        pattern="[-+]?[0-9]*[.,]?[0-9]+"
                        title="Number of repetitions"
                        value={reps}
                        onChange={e => setReps(e.target.value)}
                        id="reps" />

                    <label for="weight">Weight</label>
                    <input
                        type="text" required
                        pattern="[-+]?[0-9]*[.,]?[0-9]+"
                        title="Weight can use decimals"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        id="weight" />

                    <label for="unit">Units</label>
                    <select
                        type="text" required
                        value={unit}
                        onChange={e => setUnit(e.target.value)}
                        id="unit">
                            <option>lbs</option>
                            <option>kgs</option>
                            <option>miles</option>
                            <option>laps</option>
                    </select>

                    <label for="date">Date</label>
                    <input
                        type="date" required
                        min="2021-11-21"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        id="date" />

                    <label for="submit">
                        <button
                            type="submit"
                            id="submit"
                        >Create</button>
                    </label>
                </fieldset>
            </form>
        </article>
        </>
    );
}

export default CreatePage;