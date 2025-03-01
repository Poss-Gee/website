// Select DOM elements
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle the menu icon and navbar on click
menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-x'); // Toggle the 'fa-x' class for the menu icon
    navbar.classList.toggle('active'); // Toggle the 'active' class for the navbar
};

// Select all sections and navigation links
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Handle scrolling events
window.onscroll = () => {
    let top = window.scrollY; // Get the current scroll position

    // Highlight the appropriate navigation link based on the current section
    sections.forEach(section => {
        let offset = section.offsetTop - 150; // Offset for better activation timing
        let height = section.offsetHeight;   // Section height
        let id = section.getAttribute('id'); // Section ID

        if (top >= offset && top < offset + height) {
            // Remove 'active' class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add 'active' class to the current link
            let activeLink = document.querySelector('header nav a[href*="' + id + '"]');
            if (activeLink) activeLink.classList.add('active');
        }
    });

    // Toggle the sticky header class based on scroll position
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Ensure the navbar closes when scrolling
    menuIcon.classList.remove('fa-x');
    navbar.classList.remove('active');
};

// Typing animation effect for the home section
const typingText = document.querySelector('.typing-text');
const phrases = ["Frontend Developer!", "Web Designer!", "Graphics Designer!", "Digital Marketer!"];
let currentPhraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function typeEffect() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    // If in deleting state, remove a character, otherwise add a character
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100; // Faster when deleting
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200; // Normal typing speed
    }
    
    // Logic to switch between typing and deleting states
    if (!isDeleting && charIndex === currentPhrase.length) {
        // If we've finished typing the current phrase
        isDeleting = true;
        typingDelay = 2000; // Pause at the end of typing
    } else if (isDeleting && charIndex === 0) {
        // If we've finished deleting the current phrase
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Move to next phrase
        typingDelay = 1000; // Pause before starting to type next phrase
    }
    
    setTimeout(typeEffect, typingDelay);
}

// Initialize ScrollReveal
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

// Configure animations for different elements
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portifolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Portfolio filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portifolio-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Show/hide portfolio items based on filter
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 300);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form validation
const contactForm = document.querySelector('.contact form');
const nameInput = document.querySelector('input[placeholder="Full Name"]');
const emailInput = document.querySelector('input[placeholder="Email Address"]');
const messageInput = document.querySelector('textarea');

contactForm.addEventListener('submit', (e) => {
    let valid = true;
    
    // Simple validation
    if (nameInput.value.trim() === '') {
        highlightField(nameInput);
        valid = false;
    }
    
    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        highlightField(emailInput);
        valid = false;
    }
    
    if (messageInput.value.trim() === '') {
        highlightField(messageInput);
        valid = false;
    }
    
    if (!valid) {
        e.preventDefault();
        alert('Please fill all required fields correctly');
    }
});

function highlightField(field) {
    field.style.boxShadow = '0 0 1rem #ff3333';
    setTimeout(() => {
        field.style.boxShadow = '';
    }, 3000);
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Chatbot functionality
function createChatbot() {
    // Create the chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'chatbot-container';
    
    // Create chatbot toggle button
    const chatbotToggle = document.createElement('div');
    chatbotToggle.className = 'chatbot-toggle';
    chatbotToggle.innerHTML = '<i class="fa-solid fa-comment"></i>';
    
    // Create chatbot interface
    const chatbotInterface = document.createElement('div');
    chatbotInterface.className = 'chatbot-interface';
    chatbotInterface.innerHTML = `
        <div class="chatbot-header">
            <h4>Possi Gee Assistant</h4>
            <button class="chatbot-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="chatbot-messages">
            <div class="message bot">
                Hello! 👋 I'm Possi's assistant. How can I help you today?
            </div>
        </div>
        <div class="chatbot-input">
            <input type="text" placeholder="Type your question here...">
            <button><i class="fa-solid fa-paper-plane"></i></button>
        </div>
    `;
    
    // Append elements to container
    chatbotContainer.appendChild(chatbotToggle);
    chatbotContainer.appendChild(chatbotInterface);
    document.body.appendChild(chatbotContainer);
    
    // Add event listeners
    chatbotToggle.addEventListener('click', () => {
        chatbotInterface.classList.toggle('active');
    });
    
    const closeButton = chatbotInterface.querySelector('.chatbot-close');
    closeButton.addEventListener('click', () => {
        chatbotInterface.classList.remove('active');
    });
    
    const inputField = chatbotInterface.querySelector('input');
    const sendButton = chatbotInterface.querySelector('button');
    const messagesContainer = chatbotInterface.querySelector('.chatbot-messages');
    
    const sendMessage = () => {
        const userMessage = inputField.value.trim();
        if (!userMessage) return;
        
        // Add user message to chat
        messagesContainer.innerHTML += `
            <div class="message user">
                ${userMessage}
            </div>
        `;
        
        // Clear input field
        inputField.value = '';
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Get bot response after a short delay
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            messagesContainer.innerHTML += `
                <div class="message bot">
                    ${botResponse}
                </div>
            `;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 800);
    };
    
    sendButton.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add the CSS for the chatbot
    const chatbotStyle = document.createElement('style');
    chatbotStyle.textContent = `
        .chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            font-family: 'Poppins', sans-serif;
        }
        
        .chatbot-toggle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: var(--main-color, #0ef);
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        
        .chatbot-toggle:hover {
            transform: scale(1.05);
        }
        
        .chatbot-interface {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 450px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: all 0.3s ease;
            opacity: 0;
            pointer-events: none;
            transform: translateY(20px) scale(0.9);
        }
        
        .chatbot-interface.active {
            opacity: 1;
            pointer-events: all;
            transform: translateY(0) scale(1);
        }
        
        .chatbot-header {
            padding: 15px;
            background-color: var(--main-color, #0ef);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chatbot-header h4 {
            margin: 0;
            font-size: 18px;
        }
        
        .chatbot-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
        }
        
        .chatbot-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background-color: #f8f9fa;
        }
        
        .message {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.4;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        
        .message.bot {
            background-color: white;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
            color: #333;
        }
        
        .message.user {
            background-color: var(--main-color, #0ef);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 5px;
        }
        
        .chatbot-link {
            color: var(--main-color, #0ef);
            text-decoration: none;
            font-weight: 600;
        }
        
        .chatbot-link:hover {
            text-decoration: underline;
        }
        
        .chatbot-input {
            display: flex;
            padding: 10px;
            border-top: 1px solid #eee;
            background-color: white;
        }
        
        .chatbot-input input {
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 20px;
            font-size: 14px;
            outline: none;
        }
        
        .chatbot-input input:focus {
            border-color: var(--main-color, #0ef);
            box-shadow: 0 0 0 2px rgba(0, 238, 255, 0.2);
        }
        
        .chatbot-input button {
            background-color: var(--main-color, #0ef);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-left: 10px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .chatbot-input button:hover {
            transform: scale(1.05);
            background-color: var(--main-color-dark, #0cd);
        }
    `;
    document.head.appendChild(chatbotStyle);
}

// Chatbot responses with improved conversational abilities
function getBotResponse(message) {
    // Convert message to lowercase for easier matching
    const lowerMsg = message.toLowerCase();
    
    // Greetings
    if (lowerMsg.match(/^(hi|hello|hey|greetings|howdy)/)) {
        return `Hello there! 👋 How can I help you today? Feel free to ask me about Possi Gee's services, portfolio, or how to get in touch.`;
    }
    
    // How are you doing variations
    else if (lowerMsg.includes('how are you') || lowerMsg.match(/how('s| is) it going/) || 
            lowerMsg.includes('how you doing') || lowerMsg.includes('how do you do')) {
        return `I'm doing great, thanks for asking! 😊 I'm here and ready to assist you with any questions about Possi Gee's work and services. How can I help you today?`;
    }
    
    // Tell me about you variations
    else if (lowerMsg.includes('tell me about you') || lowerMsg.includes('who are you') || 
            lowerMsg.includes('what are you') || lowerMsg.match(/your (purpose|function|role)/)) {
        return `I'm Possi Gee's virtual assistant! I'm here to help answer questions about Possi's services, portfolio, and how to get in touch. While I'm not a human, I'm designed to provide helpful information about Possi Gee's work as a web developer, graphic designer, and digital marketer.`;
    }
    
    // What can you do variations
    else if (lowerMsg.match(/what (can|do) you do/) || lowerMsg.includes('your capabilities') || 
            lowerMsg.includes('how can you help') || lowerMsg.includes('what are you capable of')) {
        return `I can help you with:<br><br>
                - Information about Possi Gee's services<br>
                - Details about portfolio projects<br>
                - Contact information<br>
                - Social media links<br>
                - Answering questions about Possi's background and skills<br><br>
                Just ask away, and I'll do my best to assist you!`;
    }
    
    // Check for social media related queries
    else if (lowerMsg.includes('social') || lowerMsg.includes('facebook') || lowerMsg.includes('instagram') || 
            lowerMsg.includes('twitter') || lowerMsg.includes('whatsapp')) {
        return `You can connect with Possi Gee on:<br><br>
                - <a href="#" class="chatbot-link">Facebook</a><br>
                - <a href="#" class="chatbot-link">Instagram</a><br>
                - <a href="#" class="chatbot-link">Twitter</a><br>
                - <a href="#" class="chatbot-link">WhatsApp</a><br><br>
                Just click on the links above or check the social media icons in the home section.`;
    }
    
    // Services related queries
    else if (lowerMsg.includes('service') || lowerMsg.includes('offer') || lowerMsg.includes('do you provide') ||
            lowerMsg.includes('what do you do')) {
        return `Possi Gee offers the following services:<br><br>
                - Web Development (responsive websites, SPAs, etc.)<br>
                - Graphic Design (logos, marketing materials, etc.)<br>
                - Digital Marketing (social media, SEO, etc.)<br><br>
                For more details, check out the Services section.`;
    }
    
    // Portfolio related queries
    else if (lowerMsg.includes('portfolio') || lowerMsg.includes('project') || lowerMsg.includes('work') ||
            lowerMsg.includes('past work') || lowerMsg.includes('example')) {
        return `Possi Gee has worked on various projects including:<br><br>
                - E-commerce Websites<br>
                - Restaurant Websites<br>
                - Brand Identity Designs<br>
                - Social Media Campaigns<br>
                - Portfolio Websites<br>
                - Poster Designs<br><br>
                You can see all of these in the Portfolio section.`;
    }
    
    // Contact related queries
    else if (lowerMsg.includes('contact') || lowerMsg.includes('reach') || lowerMsg.includes('hire') || 
            lowerMsg.includes('email') || lowerMsg.includes('phone') || lowerMsg.includes('get in touch')) {
        return `You can contact Possi Gee through:<br><br>
                - The contact form in the Contact section<br>
                - Social media platforms<br><br>
                Just scroll down to the Contact section to get in touch!`;
    }
    
    // About Possi Gee
    else if (lowerMsg.includes('about') || (lowerMsg.includes('who') && lowerMsg.includes('possi')) || 
            lowerMsg.includes('background') || lowerMsg.includes('experience') || lowerMsg.includes('skills') ||
            lowerMsg.includes('tell me about possi')) {
        return `Possi Gee (Michael Ofori) is a skilled professional with expertise in:<br><br>
                - HTML (90%)<br>
                - CSS (85%)<br>
                - JavaScript (70%)<br>
                - Graphic Design (80%)<br><br>
                Learn more in the About section!`;
    }
    
    // Location or where are you questions
    else if (lowerMsg.includes('where are you') || lowerMsg.includes('location') || 
            lowerMsg.includes('where is') || lowerMsg.includes('based in') || lowerMsg.includes('where do you work')) {
        return `Possi Gee works remotely and can collaborate with clients worldwide. However, for specific location details, please reach out through the contact form in the Contact section.`;
    }
    
    // Pricing related questions
    else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('charge') || 
            lowerMsg.includes('fee') || lowerMsg.includes('how much') || lowerMsg.includes('rates')) {
        return `Pricing depends on the specific requirements of your project. For a customized quote, please reach out through the contact form with details about your project, and Possi Gee will get back to you promptly with pricing information.`;
    }
    
    // Thank you responses
    else if (lowerMsg.includes('thank') || lowerMsg.includes('thanks') || lowerMsg.includes('appreciate') || 
            lowerMsg.includes('helpful') || lowerMsg.includes('gratitude')) {
        return `You're welcome! 😊 If you have any other questions, feel free to ask. I'm here to help!`;
    }
    
    // Goodbye responses
    else if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye') || lowerMsg.includes('see you') || 
            lowerMsg.includes('talk to you later') || lowerMsg.includes('farewell')) {
        return `Goodbye! Thanks for chatting. Feel free to come back if you have more questions about Possi Gee's services. Have a great day! 👋`;
    }
    
    // Default response
    else {
        return `I'm not sure I understand your question. You can ask me about:<br><br>
                - Possi Gee's services<br>
                - Portfolio and projects<br>
                - Contact information<br>
                - Social media links<br>
                - Background and skills<br><br>
                Or just ask "What can you do?" to learn more about how I can help.`;
    }
}

// Start typing animation and create chatbot when the page loads
window.addEventListener('load', () => {
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }
    
    // Create and initialize the chatbot
    createChatbot();
});