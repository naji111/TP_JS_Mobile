// --- Q4: Set Up Express ---

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON in request bodies
app.use(express.json());

// Array to store our items (in-memory database)
let items = [];

// --- Q5: Create a POST Endpoint ---

// This endpoint allows adding new items
app.post('/items', (req, res) => {
    // Create a new item object with an auto-incremented ID
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    // Add the new item to our array
    items.push(newItem);
    // Respond with the created item and a 201 (Created) status
    res.status(201).json(newItem);
});

// --- Q6: Create a GET Endpoint ---

// This endpoint retrieves all items
app.get('/items', (req, res) => {
    // Simply return the entire items array
    res.json(items);
});

// --- Q7: Create a GET Endpoint by ID ---

// This endpoint retrieves a specific item by its ID
app.get('/items/:id', (req, res) => {
    // Parse the ID from the URL parameter
    const id = parseInt(req.params.id);
    // Find the item in our array
    const item = items.find(item => item.id === id);
    if (item) {
        // If found, return the item
        res.json(item);
    } else {
        // If not found, return a 404 error
        res.status(404).json({ message: "Item not found" });
    }
});

// --- Q8: Create a PUT Endpoint ---

// This endpoint updates an existing item
app.put('/items/:id', (req, res) => {
    // Parse the ID from the URL parameter
    const id = parseInt(req.params.id);
    // Find the index of the item in our array
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        // If found, update the item by merging existing data with new data
        const updatedItem = { ...items[itemIndex], ...req.body };
        items[itemIndex] = updatedItem;
        // Return the updated item
        res.json(updatedItem);
    } else {
        // If not found, return a 404 error
        res.status(404).json({ message: "Item not found" });
    }
});

// --- Q9: Create a DELETE Endpoint ---

// This endpoint deletes an item
app.delete('/items/:id', (req, res) => {
    // Parse the ID from the URL parameter
    const id = parseInt(req.params.id);
    // Find the index of the item in our array
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        // If found, remove the item from the array
        items.splice(itemIndex, 1);
        // Return a 204 (No Content) status to indicate successful deletion
        res.status(204).send();
    } else {
        // If not found, return a 404 error
        res.status(404).json({ message: "Item not found" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});