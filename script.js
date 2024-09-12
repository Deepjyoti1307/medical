document.addEventListener('DOMContentLoaded', function () {
    // Form validation for adding medications
    const addMedicationForm = document.querySelector('form');

    if (addMedicationForm) {
        addMedicationForm.addEventListener('submit', function (event) {
            const name = document.querySelector('input[name="name"]').value.trim();
            const dosage = document.querySelector('input[name="dosage"]').value.trim();
            const frequency = document.querySelector('input[name="frequency"]').value.trim();
            const startDate = document.querySelector('input[name="start_date"]').value.trim();

            if (!name || !dosage || !frequency || !startDate) {
                event.preventDefault();
                alert('Please fill in all fields before submitting.');
            }
        });
    }

    // Dashboard: Handling medication adherence checks (for example, if you're showing a list of meds and asking if they took it today)
    const adherenceButtons = document.querySelectorAll('.adherence-button');

    adherenceButtons.forEach(button => {
        button.addEventListener('click', function () {
            const medicationId = this.dataset.medicationId;
            const taken = confirm('Mark this dose as taken?');

            if (taken) {
                // Example logic for tracking adherence - in a real app, you'd make an API call here.
                console.log(`Medication ${medicationId} marked as taken.`);
                this.disabled = true;
                this.innerText = "Taken";
            }
        });
    });

    // Example code for setting up a basic client-side reminder (not a real push notification)
    const reminderButtons = document.querySelectorAll('.reminder-button');

    reminderButtons.forEach(button => {
        button.addEventListener('click', function () {
            const medicationName = this.dataset.medicationName;
            const frequency = parseInt(this.dataset.frequency); // Assume frequency is in hours

            if (frequency > 0) {
                alert(`Reminder set for ${medicationName} every ${frequency} hours.`);
                setInterval(() => {
                    alert(`Time to take your medication: ${medicationName}`);
                }, frequency * 3600 * 1000); // Frequency in milliseconds
            } else {
                alert('Invalid frequency. Reminder not set.');
            }
        });
    });

    // Toggle between different sections (e.g., login/register forms)
    const toggleForms = document.querySelectorAll('.toggle-form');

    toggleForms.forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            const targetForm = this.dataset.target;

            document.querySelectorAll('.form-section').forEach(form => {
                form.style.display = 'none';
            });

            document.querySelector(`#${targetForm}`).style.display = 'block';
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Modal functionality
    var modal = document.getElementById("modal");
    var editButtons = document.querySelectorAll(".edit-button");
    var closeButton = document.getElementsByClassName("close")[0];

    editButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            modal.style.display = "block";
        });
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
function loadContent(page) {
    var content = document.getElementById('content');
    var html = '';

    if (page === 'home') {
        html = '<h2>Welcome to the Medication Adherence Tracker</h2><p>Track and manage your medications effectively.</p>';
    } else if (page === 'medications') {
        html = '<h2>Medications</h2><p>Manage your list of medications here.</p>';
    } else if (page === 'reports') {
        html = '<h2>Reports</h2><p>View your medication adherence reports here.</p>';
    } else if (page === 'settings') {
        html = '<h2>Settings</h2><p>Configure application settings here.</p>';
    }

    content.innerHTML = `<div class="centered-content">${html}</div>`;
}
// Function to fetch medications from the backend
async function fetchMedications() {
    const response = await fetch('http://localhost:5000/api/medications', {
        method: 'GET',
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    });
    const medications = await response.json();
    return medications;
}

// Search functionality
document.querySelector('.search-button').addEventListener('click', async function () {
    const searchQuery = document.querySelector('.search-bar').value.toLowerCase();
    const medications = await fetchMedications();

    const filteredMedications = medications.filter(med => med.name.toLowerCase().includes(searchQuery));

    let html = '';
    filteredMedications.forEach(med => {
        html += `<div class="medication-card">
                    <h3>${med.name}</h3>
                    <p>Dosage: ${med.dosage}</p>
                    <p>Frequency: ${med.frequency}</p>
                </div>`;
    });

    document.getElementById('content').innerHTML = html;
});
localStorage.setItem('token', response.token);
headers: { 'x-auth-token'; localStorage.getItem('token') };
document.querySelector('.cta-button').addEventListener('click', function () {
    alert("Learn more about how to track your medication effectively.");
});
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const closeModal = document.getElementsByClassName("close")[0];
    const addMedicationBtn = document.getElementById("add-medication");
    const medicationForm = document.getElementById("medication-form");
    const medicationList = document.getElementById("medication-list");

    addMedicationBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    closeModal.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    medicationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("medication-name").value;
        const dosage = document.getElementById("dosage").value;
        const frequency = document.getElementById("frequency").value;

        const li = document.createElement("li");
        li.innerHTML = `<span>${name} - ${dosage} - ${frequency}</span> <button class="delete-button">Delete</button>`;

        const deleteButton = li.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            li.remove();
        });

        medicationList.appendChild(li);
        modal.style.display = "none";
    });
});
document.getElementById("settings-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const notification = document.getElementById("notification").checked;
    const theme = document.getElementById("theme").value;

    alert(`Settings saved! Notifications: ${notification}, Theme: ${theme}`);
    document.addEventListener("DOMContentLoaded", function () {
        // Get the theme dropdown and notification checkbox elements
        const themeSelect = document.getElementById("theme");
        const notificationCheckbox = document.getElementById("notification");

        // Load saved settings from localStorage
        const savedTheme = localStorage.getItem("theme");
        const savedNotifications = localStorage.getItem("notifications");

        // Apply saved theme on page load
        if (savedTheme) {
            document.body.classList.add(savedTheme);
            themeSelect.value = savedTheme;
        }

        // Apply saved notification settings on page load
        if (savedNotifications !== null) {
            notificationCheckbox.checked = savedNotifications === "true";
        }

        // Change theme when the user selects a new theme
        themeSelect.addEventListener("change", function () {
            document.body.classList.remove("light", "dark");
            document.body.classList.add(themeSelect.value);

            // Save the selected theme to localStorage
            localStorage.setItem("theme", themeSelect.value);
        });

        // Save notification settings when the form is submitted
        document.getElementById("settings-form").addEventListener("submit", function (event) {
            event.preventDefault();

            // Save notification preference
            localStorage.setItem("notifications", notificationCheckbox.checked);

            alert("Settings saved!");
        });
    });

    // Logic to save settings can be added here
});
// Generate the adherence chart using Chart.js
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('adherence-chart').getContext('2d');

    // Sample data for the chart
    const adherenceData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Adherence Rate (%)',
            data: [95, 90, 93, 88],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: true,
        }]
    };

    const config = {
        type: 'line',
        data: adherenceData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    };

    // Create the chart
    new Chart(ctx, config);

    // Download report functionality
    document.getElementById('download-report').addEventListener('click', function () {
        alert('Report downloaded successfully!');
        // Logic to download the report can be implemented here
    });
});
