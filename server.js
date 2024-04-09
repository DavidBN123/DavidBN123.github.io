const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from 'public' directory
app.use(express.static('public'));

// Basic RESTful endpoints


// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory store for groups
let groups = [
    { id: 1, name: "Game Devs", description: "Group for game development enthusiasts." },
    { id: 2, name: "Web Wizards", description: "Group for web development discussions." }
];

// Simulated admin check
const isAdmin = (req) => req.headers['x-admin'] === 'true';

// Endpoint to search for groups by name
app.get('/api/groups/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const filteredGroups = groups.filter(group => group.name.toLowerCase().includes(query));
    res.json(filteredGroups);
});

app.post('/api/groups/create', (req, res) => {
    // Example of creating a group, normally you would save this to a database
    const { groupName } = req.body;
    // Pretend we're creating a group and returning an ID
    res.json({ success: true, message: "Group created", groupId: Math.floor(Math.random() * 10000) });
});

// Endpoint to get group details by ID
app.get('/api/groups/:id', (req, res) => {
    const groupId = parseInt(req.params.id, 10);
    const group = groups.find(group => group.id === groupId);
    if (!group) {
        return res.status(404).json({ message: "Group not found" });
    }
    res.json(group);
});

// Endpoint to manage group (example: delete a group)
app.delete('/api/groups/:id', (req, res) => {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    const groupId = parseInt(req.params.id, 10);
    const groupIndex = groups.findIndex(group => group.id === groupId);
    if (groupIndex === -1) {
        return res.status(404).json({ message: "Group not found" });
    }
    groups = groups.filter(group => group.id !== groupId);
    res.json({ message: "Group deleted successfully" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
