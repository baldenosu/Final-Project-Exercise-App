import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const EditPage = ({ exercise }) => {

    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit , setUnit] = useState(exercise.unit); 
    const [date, setDate] = useState(exercise.date.toLocaleString("en-US").slice(0,10));

    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited exercise!");
        } else {
            const error = await response.json();
            alert(`Failed to update exercise. Status code: ${response.status} ${JSON.stringify(error)}`);
        }
        history.push('/');
    }

    return (
        <>
        <article>
            <h2>Edit an exercise entry</h2>
            <form onSubmit={(e) => {e.preventDefault();}}>
                <fieldset>
                    <legend>Which exercise do you want to update</legend>
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
                            onClick={editExercise}
                            id="submit"
                        >Update</button>
                    </label>
                </fieldset>
            </form>
        </article>
        </>
    );
}

export default EditPage;

