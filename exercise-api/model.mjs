// Imports
import mongoose from "mongoose";
import 'dotenv/config';
import sanitize from 'mongo-sanitize';


// Connect to database based on the .env file
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    {useNewUrlParser: true}
);
const database = mongoose.connection;

// Confirm database connection with console message
database.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.'});
    } else {
        console.log('Successfully connected to MongoDB exercises collection');
    }
})


// SCHEMA: Define exercise collection schema
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true, min: 0},
    weight: {type: Number, required: true, min: 0},
    unit: {type: String, required: true, default: 'lbs'},
    date: {type: Date, required: true, min: '2021-11-21', default: new Date()}
});

// Compile model from schema
const Exercise = mongoose.model("Exercise", exerciseSchema);


// CREATE model //////////////////////////////////////////////////////
const createExercise = async (name, reps, weight, unit, date) => {
    const cleanName = sanitize(name);
    const cleanReps = sanitize(reps);
    const cleanWeight = sanitize(weight);
    const cleanUnit = sanitize(unit);
    const cleanDate = sanitize(date);
    const exercise = new Exercise({
        name: cleanName,
        reps: cleanReps,
        weight: cleanWeight,
        unit: cleanUnit,
        date: cleanDate
    });
    return exercise.save();
}


// RETRIEVE models //////////////////////////////////////////////////////
// Retrieve an array of all exercises and return a promise
const findExercises = async () => {
    const exercises = Exercise.find();
    return exercises.exec();
}

//Retrieve an exercise based on ID and return a promise
const findExerciseById = async (_id) => {
    const clean_id = sanitize(_id)
    const query = Exercise.findById(clean_id);
    return query.exec();
}


// UPDATE model //////////////////////////////////////////////////////
const updateExerciseById = async (_id, update) => {
    const clean_id = sanitize(_id)
    const cleanUpdate = sanitize(update)
    const result = await Exercise.updateOne(clean_id, cleanUpdate);
    return result.modifiedCount;
}


// DELETE model //////////////////////////////////////////////////////
const deleteExerciseById = async (_id) => {
    const clean_id = sanitize(_id)
    const result = await Exercise.deleteOne(clean_id);
    return result.deletedCount;
}


// Export variables fro use in controller
export {createExercise, findExerciseById, findExercises, updateExerciseById, deleteExerciseById}