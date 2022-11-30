// Imports
import 'dotenv/config';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import * as exercises from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// Validation function used in updating exercises.
function validateExercise(req) {
    let errors = {};
    if (req.body.name === undefined) {
        errors.name = 'invalid name'
    }
    if (req.body.reps === undefined || req.body.reps <= 0) {
        errors.reps = 'invalid reps, must be a number higher than 0'
    }
    if (req.body.weight === undefined || req.body.weight <= 0) {
        errors.weight = 'invalid weight, must be a number higher than 0'
    }
    if (req.body.unit === undefined) {
        errors.unit = 'invalid unit type'
    }
    if (req.body.date === undefined) {
        errors.date = 'invalid date'
    }
    return errors 
}

// CREATE controller /////////////////////////////////////////////////////////
app.post ('/exercises', expressAsyncHandler(async (req,res) => {
    try {
        const exercise = await exercises.createExercise(
            req.body.name,
            req.body.reps,
            req.body.weight,
            req.body.unit,
            req.body.date
        );
        res.status(201).json(exercise);
    } catch (error) {
        // console.error(error);
        res.status(400).json({Error: 'Invalid request'});
    }
    

}));


// RETRIEVE controllers ///////////////////////////////////////////////////////
// GET exercises
app.get ('/exercises', expressAsyncHandler(async (req, res) => {
    const outcome = await exercises.findExercises();
    res.send(outcome);
}));

// GET exercises by ID
app.get ('/exercises/:_id', expressAsyncHandler(async (req,res) => {
    try {
        const exerciseId = req.params._id;
        const outcome = await exercises.findExerciseById(exerciseId);
        // ternary operator for evaluating response to send based on existence of exercise ID
        outcome !== null ? res.status(200).json(outcome) : res.status(404).json({Error: 'Not Found'});
    } catch (error) {
        // console.error(error);
        res.send({Error: error});
    }
}));


// UPDATE controller //////////////////////////////////////////////////////////
app.put('/exercises/:_id', expressAsyncHandler(async (req, res) => {
    try {
        // Validate the submitted update to check it is in the correct format if not return the errors.
        const errors = validateExercise(req)
        if (JSON.stringify(errors) !== '{}') {
            res.status(400).json({errors});
        }
        const update = req.body;
        // Call updateExercise in model to update the database
        const updateCount = await exercises.updateExerciseById({_id: req.params._id}, update)
        // If the document was updated return a JSON object with the properties of the updated document. Include ID
        if (updateCount === 1) {
            res.json({
                _id: req.params._id,
                name: req.body.name,
                reps: req.body.reps,
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date
            });
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({Error: "Document Failed to update"});
    }

}));


// DELETE controller /////////////////////////////////////////////////////////
app.delete('/exercises/:_id', expressAsyncHandler(async (req, res) => {
    try {
        const deleteCount = await exercises.deleteExerciseById({_id: req.params._id});
        deleteCount === 1 ? res.status(204).send() : res.status(404).json({Error: 'Not Found'});
    } catch (error) {
        res.status(400).json({Error: error});
    }
    
}));

// App is listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
