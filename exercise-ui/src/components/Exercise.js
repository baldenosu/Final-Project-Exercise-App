import React from 'react';
import { TbTrashX, TbEdit } from 'react-icons/tb';
import { IconContext } from 'react-icons';


function Exercise({ exercise, onEdit, onDelete }) {

    // Set up the passed in date string for formatting
    const date = new Date(exercise.date);

    return (
        <>
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{date.toLocaleDateString("en-US").slice(0,10)}</td>
            <IconContext.Provider value={{ className: 'react-icons', size: '1.75em', title: 'Edit Button'}}>
            <td><TbEdit onClick={() => onEdit(exercise)} /></td>
            </IconContext.Provider>
            <IconContext.Provider value={{ className: 'react-icons', size: '1.75em', title: 'Delete Button'}}>
            <td><TbTrashX onClick={() => onDelete(exercise._id)} /></td> 
            </IconContext.Provider>           
        </tr>
        </>
    );
}

export default Exercise;