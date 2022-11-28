import React from 'react';
import Exercise from './Exercise';

function ExerciseTable({ exercises, onEdit, onDelete }) {
    return (
        <>
        <table>
            <caption> Add and Edit Exercises</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => 
                    <Exercise
                        exercise={exercise}
                        key={i}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />)}
            </tbody>
        </table>
        </>
    );
}

export default ExerciseTable;