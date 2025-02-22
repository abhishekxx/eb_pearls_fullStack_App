// Hero Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        slides[index].style.transform = 'translateY(0)';
    }, 50);

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

let slideInterval = setInterval(nextSlide, 5000);

// Click handlers for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        
        // Reset interval
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });
});


const BASE_URL = 'http://localhost/eb-pearls-test-server';

async function fetchFeatures() {
    try {
        const response = await fetch(`${BASE_URL}/get-feature.php`);
        const features = await response.json();
        
        if (features.error) {
            console.error('Error fetching features:', features.error);
            return;
        }

        const featuresGrid = document.querySelector('.features-grid');
        featuresGrid.innerHTML = ''; 

        features.forEach(feature => {
            const featureCard = document.createElement('div');
            featureCard.className = 'feature-card';
            featureCard.innerHTML = `
                <div class="icon">${feature.icon}</div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            `;
            featuresGrid.appendChild(featureCard);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}



// Task Manager Functionality

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


// Fetch tasks from the server

async function fetchTasks() {
    try {
        const response = await fetch(`${BASE_URL}/get-task.php`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });        
        const tasks = await response.json();

        taskList.innerHTML = ''; 
        tasks.forEach(task => {
            renderTask(task);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function renderTask(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.dataset.id = task.id;

    const checkbox = document.createElement('div');
    checkbox.className = 'task-checkbox';
    
    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.task;

    if (task.completed == 1) {
        checkbox.classList.add('checked');
        text.classList.add('completed');
        text.textContent = `${task.task} (Completed)`;
    } else {
        text.textContent = task.task;
    }

    checkbox.addEventListener('click', async () => {
        await toggleTask(task.id, checkbox, task.task);
        text.classList.toggle('completed');
        text.textContent = text.classList.contains('completed') 
            ? `${task.task} (Completed)` 
            : task.task;
    });


    const deleteBtn = document.createElement('button');
    const icon = document.createElement('i');
    icon.className = 'fas fa-times';
    deleteBtn.appendChild(icon);
    deleteBtn.className = 'delete-task';
    deleteBtn.appendChild(document.createTextNode(' Delete'));
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    taskItem.appendChild(checkbox);
    taskItem.appendChild(text);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
}


// Add a new task
async function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    try {
        const response = await fetch(`${BASE_URL}/task.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: taskText })
        });

        const newTask = await response.json();
        renderTask(newTask);
        taskInput.value = '';
    } catch (error) {
        console.error('Error adding task:', error);
    }
    
}

// Toggle task completion
async function toggleTask(id, checkbox, taskText) {
    const completed = checkbox.classList.contains('checked') ? 0 : 1;
    try {
        const response = await fetch(`${BASE_URL}/put-task.php`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            referrerPolicy: 'no-referrer-when-downgrade',
            body: JSON.stringify({
                id, 
                task: taskText, 
                completed, 
            })
        });

        const result = await response.json();
        if (result.message === 'Task updated successfully') {
            checkbox.classList.toggle('checked'); 
        } else {
            console.error(result.error || 'Error toggling task');
        }
    } catch (error) {
        console.error('Error toggling task:', error);
    }
}

// Delete a task
async function deleteTask(id) {
    try {
        await fetch(`${BASE_URL}/task.php`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        document.querySelector(`[data-id="${id}"]`).remove();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Add task on Enter key press
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load tasks on page load
fetchTasks();
// Load features when the page loads
document.addEventListener('DOMContentLoaded', fetchFeatures, fetchTasks);

// Contact Form Handling

async function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert("All fields are required!");
        return;
    }

    const formData = { name, email, message };

    try {
        const response = await fetch(`${BASE_URL}/post-contact-message.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log('Server Response:', result); 

        if (result.success) {
            alert(result.success);
            document.getElementById("contactForm").reset();
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert("An error occurred while sending the message.");
    }
}

// Attach event listener after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contactForm').addEventListener('submit', handleSubmit);
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});