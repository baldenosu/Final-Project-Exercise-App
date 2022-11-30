import React from 'react';
import Exercise from './Exercise';

function ExerciseTable({ exercises, onEdit, onDelete }) {
    return (
        <>
        <table>
            <caption> List of Exercises</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th className='icon-columns'>Edit</th>
                    <th className='icon-columns'>Delete</th>
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