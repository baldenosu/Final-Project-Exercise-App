// Imports
import mongoose from "mongoose";
import 'dotenv/config';


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
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: Date, required: true, min: '011-21-2021', default: new Date()}
});

// Compile model from schema
const Exercise = mongoose.model("Exercise", exerciseSchema);


// CREATE model //////////////////////////////////////////////////////
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
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
    const query = Exercise.findById(_id);
    return query.exec();
}


// UPDATE model //////////////////////////////////////////////////////
const updateExerciseById = async (_id, update) => {
    const result = await Exercise.updateOne(_id, update);
    return result.modifiedCount;
}


// DELETE model //////////////////////////////////////////////////////
const deleteExerciseById = async (_id) => {
    const result = await Exercise.deleteOne(_id);
    return result.deletedCount;
}


// Export variables fro use in controller
export {createExercise, findExerciseById, findExercises, updateExerciseById, deleteExerciseById}