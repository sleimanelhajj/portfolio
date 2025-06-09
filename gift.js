// Gift page functionality
class BirthdayGift {
    constructor() {
        this.targetDate = new Date('2025-07-22T00:00:00');
        this.countdownInterval = null;
        this.storyTexts = [
            "It all started on July 22nd...",
            "A special soul entered this world ✨",
            "And the rest, as they say...",
            "Is beautiful history!",
            "I wrote you this poem..."
        ];
        this.subtexts = [
            "The day that changed everything",
            "Bringing joy, laughter, and endless memories", 
            "Filled with love and adventures",
            "Happy Birthday! 🎉",
            "From my heart to yours 💝"
        ];
        this.poem = [
            "On this special day so bright,",
            "When stars first learned to shine their light,",
            "A precious soul came to this earth,",
            "Bringing wonder, joy, and mirth.",
            "",
            "Through the seasons, through the years,",
            "You've been sunshine through my tears,",
            "A friend so true, a heart so kind,",
            "The rarest treasure one could find.",
            "",
            "So here's to you on your special day,",
            "May happiness come in every way,",
            "Another year of dreams come true,",
            "The world is brighter because of you."
        ];
        this.currentStoryIndex = 0;
        
        this.init();
    }

    init() {
        this.createParticles();
        this.startCountdown();
        
        // Check if it's July 22nd
        const today = new Date();
        if (true) { // July is month 6 (0-indexed)
            setTimeout(() => this.startFlashbackSequence(), 3000);
        }
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    startCountdown() {
        const countdownDisplay = document.getElementById('countdownDisplay');
        
        this.countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = this.targetDate.getTime() - now;
            
            if (distance < 0) {
                // If the date has passed, set it to next year
                this.targetDate.setFullYear(this.targetDate.getFullYear() + 1);
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            
            // Check if it's July 22nd
            const today = new Date();
            if (today.getMonth() === 6 && today.getDate() === 22) {
                setTimeout(() => this.startFlashbackSequence(), 2000);
                clearInterval(this.countdownInterval);
            }
        }, 1000);
    }

    startFlashbackSequence() {
        const countdownSection = document.getElementById('countdownSection');
        const storySection = document.getElementById('storySection');
        
        // Hide countdown
        countdownSection.classList.add('hidden');
        
        // Show story section
        setTimeout(() => {
            storySection.classList.add('visible');
            this.showFlashback();
        }, 1000);
    }

    showFlashback() {
        console.log('Starting flashback sequence');
        const storyTextElement = document.getElementById('storyText');
        const storySubtextElement = document.getElementById('storySubtext');
        
        // Clear and prepare for flashback
        storyTextElement.textContent = '';
        storySubtextElement.textContent = '';
        storySubtextElement.style.opacity = '0';
        
        // Style for flashback
        storyTextElement.style.fontSize = '4rem';
        storyTextElement.style.fontWeight = 'bold';
        storyTextElement.style.textAlign = 'center';
        storyTextElement.style.color = '#ffd700';
        storyTextElement.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
        storyTextElement.style.fontFamily = 'monospace';
        
        let currentYear = 2025;
        const targetYear = 2003;
        
        const flashbackInterval = setInterval(() => {
            // Add visual effects
            storyTextElement.style.transform = `scale(${1 + Math.random() * 0.1})`;
            storyTextElement.style.filter = `hue-rotate(${Math.random() * 60}deg)`;
            
            storyTextElement.textContent = `July 22, ${currentYear}`;
            
            currentYear--;
            
            if (currentYear < targetYear) {
                clearInterval(flashbackInterval);
                
                // Final flash effect
                storyTextElement.style.transform = 'scale(1.2)';
                storyTextElement.style.filter = 'brightness(2)';
                storyTextElement.textContent = `July 22, 2003`;
                
                setTimeout(() => {
                    // Reset styles and start story
                    storyTextElement.style.transform = 'scale(1)';
                    storyTextElement.style.filter = 'none';
                    storyTextElement.style.fontSize = '2.5rem';
                    storyTextElement.style.fontWeight = 'normal';
                    storyTextElement.style.color = '#fff';
                    storyTextElement.style.textShadow = 'none';
                    storyTextElement.style.fontFamily = 'Inter, sans-serif';
                    
                    // Fade out the year and start story
                    setTimeout(() => {
                        this.typeStoryText();
                    }, 1000);
                }, 1000);
            }
        }, 80); // Fast countdown - adjust speed here (lower = faster)
    }

    typeStoryText() {
        console.log('Current story index:', this.currentStoryIndex); // Debug log
        
        if (this.currentStoryIndex >= this.storyTexts.length) {
            this.showFinalMessage();
            return;
        }

        // Check if we're at the poem section
        if (this.currentStoryIndex === 4) {
            console.log('Starting poem section'); // Debug log
            this.showPoemSection();
            return;
        }

        const storyTextElement = document.getElementById('storyText');
        const storySubtextElement = document.getElementById('storySubtext');
        const text = this.storyTexts[this.currentStoryIndex];
        const subtext = this.subtexts[this.currentStoryIndex];
        
        // Clear previous text and reset styles
        storyTextElement.textContent = '';
        storySubtextElement.textContent = '';
        storySubtextElement.style.opacity = '0';
        storySubtextElement.style.animation = '';
        storyTextElement.classList.add('typing');
        
        // Type main text
        this.typeText(storyTextElement, text, () => {
            storyTextElement.classList.remove('typing');
            
            // Show subtext after a short delay
            setTimeout(() => {
                storySubtextElement.textContent = subtext;
                storySubtextElement.style.animation = 'fadeInUp 1s ease forwards';
                
                // Move to next text after longer delay to let people read
                setTimeout(() => {
                    this.currentStoryIndex++;
                    this.typeStoryText();
                }, 4000);
            }, 1500);
        });
    }

    showPoemSection() {
        console.log('In showPoemSection'); // Debug log
        const storyTextElement = document.getElementById('storyText');
        const storySubtextElement = document.getElementById('storySubtext');
        
        // Clear and prepare for poem
        storyTextElement.textContent = '';
        storySubtextElement.textContent = '';
        storySubtextElement.style.opacity = '0';
        storySubtextElement.style.animation = '';
        
        // Reset any previous styles
        storyTextElement.style.fontSize = '2.5rem';
        storyTextElement.style.fontStyle = 'normal';
        storyTextElement.style.textAlign = 'center';
        storyTextElement.style.lineHeight = '1.4';
        storyTextElement.style.maxWidth = 'none';
        storyTextElement.style.margin = '0';
        
        storyTextElement.classList.add('typing');
        
        // Type poem introduction
        this.typeText(storyTextElement, this.storyTexts[4], () => {
            storyTextElement.classList.remove('typing');
            
            // Show poem subtitle
            setTimeout(() => {
                storySubtextElement.textContent = this.subtexts[4];
                storySubtextElement.style.animation = 'fadeInUp 1s ease forwards';
                
                // Start typing poem after delay
                setTimeout(() => {
                    console.log('Starting to type poem lines'); // Debug log
                    this.typePoemLines();
                }, 3000);
            }, 1500);
        });
    }

    typePoemLines() {
        console.log('In typePoemLines'); // Debug log
        const storyTextElement = document.getElementById('storyText');
        const storySubtextElement = document.getElementById('storySubtext');
        
        // Clear previous content and prepare for poem
        storyTextElement.innerHTML = '';
        storySubtextElement.textContent = '';
        storySubtextElement.style.opacity = '0';
        
        // IMPORTANT: Reset all styles to ensure visibility
        storyTextElement.style.fontSize = '1.8rem';
        storyTextElement.style.lineHeight = '1.8';
        storyTextElement.style.textAlign = 'center';
        storyTextElement.style.fontStyle = 'italic';
        storyTextElement.style.maxWidth = '600px';
        storyTextElement.style.margin = '0 auto';
        storyTextElement.style.whiteSpace = 'pre-line';
        storyTextElement.style.color = '#fff'; // Ensure text is white
        storyTextElement.style.opacity = '1'; // Ensure it's visible
        storyTextElement.style.display = 'block'; // Ensure it's displayed
        storyTextElement.style.visibility = 'visible'; // Ensure visibility
        storyTextElement.style.zIndex = '10'; // Ensure it's on top
        
        // Remove any animations that might hide the text
        storyTextElement.style.animation = '';
        storyTextElement.classList.remove('typing');
        
        // Simple approach: show the whole poem at once
        let poemText = this.poem.join('\n');
        
        console.log('About to type poem:', poemText); // Debug log
        
        // Type the entire poem
        this.typeText(storyTextElement, poemText, () => {
            console.log('Poem typing finished'); // Debug log
            // After poem is done, wait and then move to final message
            setTimeout(() => {
                this.currentStoryIndex++;
                this.typeStoryText();
            }, 4000);
        }, 60);
    }
    
    typeText(element, text, callback, speed = 80) {
        console.log('Starting to type:', text.substring(0, 50) + '...'); // Debug log
        console.log('Element styles:', {
            color: element.style.color,
            opacity: element.style.opacity,
            fontSize: element.style.fontSize,
            display: element.style.display
        });
        
        let i = 0;
        const timer = setInterval(() => {
            if (element.tagName === 'DIV') {
                element.textContent += text.charAt(i);
            } else {
                element.innerHTML += text.charAt(i);
            }
            
            // Debug log every 10 characters
            if (i % 10 === 0) {
                console.log('Typed so far:', element.textContent.length, 'characters');
            }
            
            i++;
            if (i > text.length - 1) {
                clearInterval(timer);
                console.log('Finished typing, final content:', element.textContent);
                if (callback) callback();
            }
        }, speed);
    }

    showFinalMessage() {
        console.log('In showFinalMessage'); // Debug log
        const storyTextElement = document.getElementById('storyText');
        const storySubtextElement = document.getElementById('storySubtext');
        
        // Clear and prepare for final message
        storyTextElement.textContent = '';
        storySubtextElement.textContent = '';
        storySubtextElement.style.opacity = '0';
        storySubtextElement.style.animation = '';
        
        // Reset styles for final message
        storyTextElement.style.fontSize = '2.5rem';
        storyTextElement.style.fontStyle = 'normal';
        storyTextElement.style.textAlign = 'center';
        storyTextElement.style.lineHeight = '1.4';
        storyTextElement.style.whiteSpace = 'normal';
        
        // Type the final celebration message
        this.typeText(storyTextElement, '🎉 Happy Birthday! 🎉', () => {
            storyTextElement.style.fontSize = '3rem';
            storyTextElement.style.animation = 'glow 1s ease-in-out infinite alternate';
            
            // Show final subtext
            setTimeout(() => {
                storySubtextElement.textContent = 'Wishing you all the happiness in the world! 💕';
                storySubtextElement.style.animation = 'fadeInUp 1s ease forwards';
                
                // Show the cake after a delay
                setTimeout(() => {
                    this.createBirthdayCake();
                    // Start celebration effects after cake appears
                    setTimeout(() => this.createCelebrationEffects(), 2000);
                }, 1500);
            }, 1000);
        }, 120);
    }

    createBirthdayCake() {
        // Create cake container
        const cakeContainer = document.createElement('div');
        cakeContainer.id = 'birthdayCake';
        cakeContainer.style.cssText = `
            position: fixed;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            opacity: 0;
            animation: cakeRise 2s ease-out forwards;
        `;
        
        // Create the cake
        cakeContainer.innerHTML = `
            <div class="cake">
                <div class="candles">
                    <div class="candle"><div class="flame"></div></div>
                    <div class="candle"><div class="flame"></div></div>
                    <div class="candle"><div class="flame"></div></div>
                </div>
                <div class="cake-top"></div>
                <div class="cake-middle"></div>
                <div class="cake-bottom"></div>
            </div>
        `;
        
        document.body.appendChild(cakeContainer);
        
        // Add click event to blow out candles
        cakeContainer.addEventListener('click', () => this.blowOutCandles());
    }

    blowOutCandles() {
        const flames = document.querySelectorAll('.flame');
        const cakeContainer = document.getElementById('birthdayCake');
        
        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.style.animation = 'blowOut 0.5s ease-out forwards';
            }, index * 200);
        });
        
        // Add special message after blowing candles
        setTimeout(() => {
            const wishMessage = document.createElement('div');
            wishMessage.style.cssText = `
                position: fixed;
                top: 40%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #ffd700;
                font-size: 2rem;
                text-align: center;
                z-index: 1001;
                opacity: 0;
                animation: fadeInUp 1s ease forwards;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
            `;
            wishMessage.textContent = '✨ Make a wish! ✨';
            document.body.appendChild(wishMessage);
            
            // Remove after 3 seconds
            setTimeout(() => {
                if (wishMessage.parentNode) {
                    wishMessage.parentNode.removeChild(wishMessage);
                }
            }, 3000);
        }, 1000);
    }

    createCelebrationEffects() {
        // Create floating hearts and stars
        const celebrationElements = ['💖', '⭐', '🎈', '🎊', '✨', '🌟'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const element = document.createElement('div');
                element.textContent = celebrationElements[Math.floor(Math.random() * celebrationElements.length)];
                element.style.position = 'fixed';
                element.style.left = Math.random() * 100 + '%';
                element.style.top = '100%';
                element.style.fontSize = '2rem';
                element.style.pointerEvents = 'none';
                element.style.zIndex = '1000';
                element.style.animation = `floatUp ${3 + Math.random() * 2}s ease-out forwards`;
                
                document.body.appendChild(element);
                
                // Remove element after animation
                setTimeout(() => {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                }, 5000);
            }, i * 200);
        }
    }
}

// Initialize the birthday gift when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayGift();
});

// Add some extra CSS animations via JavaScript
const additionalStyles = `
    @keyframes floatUp {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes cakeRise {
        0% {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
        100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes flameFlicker {
        0%, 100% {
            transform: rotate(-2deg) scale(1);
            box-shadow: 0 0 10px #ff6b35, 0 0 20px #ff6b35, 0 0 30px #ff6b35;
        }
        50% {
            transform: rotate(2deg) scale(1.1);
            box-shadow: 0 0 15px #ff6b35, 0 0 25px #ff6b35, 0 0 35px #ff6b35;
        }
    }
    
    @keyframes blowOut {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            transform: scale(0.8) rotate(10deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(45deg);
        }
    }
    
    .cake {
        position: relative;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .cake:hover {
        transform: scale(1.05);
    }
    
    .candles {
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 15px;
        z-index: 2;
    }
    
    .candle {
        width: 8px;
        height: 30px;
        background: linear-gradient(to bottom, #ff69b4, #ff1493);
        border-radius: 4px;
        position: relative;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .flame {
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 12px;
        height: 15px;
        background: radial-gradient(circle, #ffff00 20%, #ff6b35 70%);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        animation: flameFlicker 1s ease-in-out infinite alternate;
    }
    
    .cake-top {
        width: 120px;
        height: 40px;
        background: linear-gradient(to bottom, #fff, #f0f0f0);
        border-radius: 60px 60px 0 0;
        position: relative;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        border: 3px solid #ff69b4;
    }
    
    .cake-top::before {
        content: '';
        position: absolute;
        top: 15px;
        left: 10px;
        right: 10px;
        height: 8px;
        background: repeating-linear-gradient(
            45deg,
            #ff69b4,
            #ff69b4 5px,
            #fff 5px,
            #fff 10px
        );
        border-radius: 4px;
    }
    
    .cake-middle {
        width: 140px;
        height: 50px;
        background: linear-gradient(to bottom, #8B4513, #654321);
        margin: -2px auto 0;
        position: relative;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }
    
    .cake-middle::before {
        content: '';
        position: absolute;
        top: 20px;
        left: 15px;
        right: 15px;
        height: 10px;
        background: #32CD32;
        border-radius: 5px;
    }
    
    .cake-bottom {
        width: 160px;
        height: 30px;
        background: linear-gradient(to bottom, #4169E1, #191970);
        margin: -2px auto 0;
        border-radius: 0 0 15px 15px;
        box-shadow: 0 6px 12px rgba(0,0,0,0.4);
        position: relative;
    }
    
    .cake-bottom::before {
        content: '🎂';
        position: absolute;
        font-size: 1.5rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    
    /* Responsive cake */
    @media (max-width: 768px) {
        .cake-top { width: 100px; height: 35px; }
        .cake-middle { width: 120px; height: 40px; }
        .cake-bottom { width: 140px; height: 25px; }
        .candle { width: 6px; height: 25px; }
        .flame { width: 10px; height: 12px; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);