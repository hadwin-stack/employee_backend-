// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname + '/dist/Frontend'))); 

// Task2: create mongoDB connection 
// MONGODB ATLAS URI STRING:
const MONGO_URI = "mongodb+srv://hadwinsenthil_db_user:CcevZW3bCedFZeyF@cluster0.5qvkpfx.mongodb.net/";

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas successfully.'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define Employee Schema and Model matching the requested body format
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true }
});

const Employee = mongoose.model('EmployeeList', employeeSchema);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee list", error: error.message });
    }
});

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee record not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee details", error: error.message });
    }
});

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async (req, res) => {
    try {
        const newEmployee = new Employee({
            name: req.body.name,
            location: req.body.location,
            position: req.body.position,
            salary: req.body.salary
        });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(400).json({ message: "Error adding new employee", error: error.message });
    }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee record not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully", deletedEmployee });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee", error: error.message });
    }
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', async (req, res) => {
    try {
        const { _id, name, location, position, salary } = req.body;
        
        const updatedEmployee = await Employee.findByIdAndUpdate(
            _id,
            { name, location, position, salary },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee record not found to update" });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: "Error updating employee details", error: error.message });
    }
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

// Start the server on port 3000
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});
