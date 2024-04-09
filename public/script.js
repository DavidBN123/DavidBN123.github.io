document.addEventListener('DOMContentLoaded', () => {
    // Modal handling
    const modal = document.getElementById('groupCreateModal');
    const btn = document.getElementById('createGroupButton');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Example of simple navigation highlight
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.navbar a').forEach(node => {
                node.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Previous modal and navigation code...

    // Listen for the create group button click
    document.getElementById('createGroupButton').addEventListener('click', openCreateGroupModal);

    // Listen for the confirm create group button click
    document.getElementById('confirmCreateGroup').addEventListener('click', createGroup);
});

function openCreateGroupModal() {
    // Logic to display the modal
    document.getElementById('groupCreateModal').style.display = 'block';
}

function createGroup() {
    // Close the modal
    document.getElementById('groupCreateModal').style.display = 'none';

    // Get the group name from the input
    const groupName = document.getElementById('groupName').value;

    // Reset the input for next use
    document.getElementById('groupName').value = '';

    // Make an API call to create the group
    fetch('/api/groups/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupName: groupName }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Here you could update the UI to reflect the new group
        // For example, display a success message, or add the new group to a list of groups
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors, e.g., by displaying an error message to the user
    });
}


// After the document has been loaded
document.addEventListener('DOMContentLoaded', () => {
    // Previous functionalities...

    // Search functionality
    document.getElementById('groupSearchButton').addEventListener('click', searchGroups);
});

function searchGroups() {
    const searchQuery = document.getElementById('groupSearchInput').value;
    fetch(`/api/groups/search?q=${searchQuery}`)
    .then(response => response.json())
    .then(groups => {
        const resultsContainer = document.getElementById('groupSearchResults');
        resultsContainer.innerHTML = ''; // Clear previous results
        groups.forEach(group => {
            const groupElement = document.createElement('div');
            groupElement.innerHTML = `<h4>${group.name}</h4><p>${group.description}</p><button onclick="viewGroup(${group.id})">View</button>`;
            resultsContainer.appendChild(groupElement);
        });
    })
    .catch(error => console.error('Error:', error));
}

function viewGroup(groupId) {
    fetch(`/api/groups/${groupId}`)
    .then(response => response.json())
    .then(group => {
        // Here, you can populate a modal or a section on the page with group details
        // For this example, we'll just log it to the console
        console.log(group);
        if (isAdmin()) {
            // Show manage/delete option
            console.log('Admin privileges detected.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Simulated admin check (for demo purposes, you would replace this with a real check based on your auth system)
function isAdmin() {
    return true; // Simulate admin; replace with actual check
}
