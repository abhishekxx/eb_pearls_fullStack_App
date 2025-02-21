// Hero Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(20px)';
    });
    
    // Add active class to current slide with a small delay
    setTimeout(() => {
        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        slides[index].style.transform = 'translateY(0)';
    }, 50);

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto advance slides
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

// Task Manager Functionality
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    const checkbox = document.createElement('div');
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('checked');
    });

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-task';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(text);
    taskItem.appendChild(deleteBtn);
    
    taskList.appendChild(taskItem);
    taskInput.value = '';
}

// Add task on Enter key press
document.getElementById('taskInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Contact Form Handling
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Clear form
    form.reset();
    alert('Message sent successfully!');
}

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