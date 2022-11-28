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
            <form onSubmit={(e) => {e.preventDefault();}}>
                <fieldset>
                    <legend>Add your exercise</legend>
                    <label for="name">Exercise Name</label>
                    <input
                        type="text" required
                        placeholder='Name of Exercise'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id="name" />

                    <label for="reps">Amount of Reps</label>
                    <input
                        type="text" required
                        placeholder='0'
                        value={reps}
                        onChange={e => setReps(e.target.value)}
                        id="reps" />

                    <label for="weight">Weight</label>
                    <input
                        type="text" required
                        placeholder='0'
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        id="weight" />

                    <label for="unit">Weight Unit</label>
                    <input
                        type="text" required
                        placeholder='Weight Unit Measurement'
                        value={unit}
                        onChange={e => setUnit(e.target.value)}
                        id="unit" />

                    <label for="date">Date</label>
                    <input
                        type="date" required
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        id="date" />

                    <label for="submit">
                        <button
                            type="submit"
                            onClick={createExercise}
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