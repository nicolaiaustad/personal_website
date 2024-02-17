

// // Initial call to start the effect
// document.addEventListener('DOMContentLoaded', updateText);


const titles = ['a Nanotechnologist', 'an Entrepreneur', 'a Public Speaker', 'a Developer'];
let currentTitleIndex = 0;
let isDeleting = false;
let text = '';
let textIndex = 0;

function updateText() {
    const dynamicPart = document.getElementById('dynamicPart');
    const currentTitle = titles[currentTitleIndex];
    
    const cursor = document.querySelector('.cursor');

    // Update the text based on the current phase (typing or deleting)
    if (isDeleting) {
        // Remove one character at a time
        text = currentTitle.substring(0, text.length - 1);
    } else {
        // Add one character at a time
        text = currentTitle.substring(0, text.length + 1);
    }

    dynamicPart.innerHTML = text + (text.length === currentTitle.length ? '<span class="dynamicDot">.</span>' : ''); // Only update text part
    // Ensure cursor is always shown right after dynamicPart without adding it again
    if (cursor) dynamicPart.appendChild(cursor);

    // Set the text, wrapping the dot in a span for special styling if we're at the end of the title
    // dynamicPart.innerHTML = text + (text.length === currentTitle.length ? '<span class="dynamicDot">.</span>' : '') + '<span class="cursor">|</span>';
    
    
    let typingSpeed = 40; // Typing speed in milliseconds
    if (!isDeleting && text === currentTitle) {
        // Pause briefly at the end of typing before starting deletion
        setTimeout(() => {
            isDeleting = true;
            updateText();
        }, 2000); // Adjust pause at the end of typing as needed
        return;
    } else if (isDeleting && text === '') {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        // Short pause after deleting before typing the next title
        setTimeout(updateText, 250); // Adjust pause after deletion as needed
        return;
    }

    // Continue the typing or deleting process
    setTimeout(updateText, typingSpeed);
}






document.addEventListener('DOMContentLoaded', () => {
    // Start the typing effect
    updateText();

    // Scroll to About section on click
    document.getElementById('ball1').addEventListener('click', () => {
        document.querySelector('.about-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Scroll to CV section on click
    document.getElementById('ball5').addEventListener('click', () => {
        document.querySelector('.cv-highlights-section').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('ball2').addEventListener('click', () => {
        window.open('https://www.linkedin.com/in/nicaus/', '_blank');
    });

    document.getElementById('ball3').addEventListener('click', () => {
        window.open('https://github.com/nicolaiaustad', '_blank');
    });

    document.getElementById('ball4').addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('ball4').addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
    
});



document.addEventListener('DOMContentLoaded', () => {
    const aboutLink = document.querySelector('a[href="#about"]');
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default anchor behavior
        const aboutSection = document.getElementById('about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });

    
});



document.addEventListener('DOMContentLoaded', () => {
    const aboutLink = document.querySelector('a[href="#contact"]');
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default anchor behavior
        const aboutSection = document.getElementById('contact');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });

    
});



document.addEventListener('DOMContentLoaded', () => {
    const aboutLink = document.querySelector('a[href="http://www.nicolaiaustad.com"]');
    aboutLink.addEventListener('click', (e) => {
        
    });

    
});











  // script.js

// document.getElementById('inputForm').addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const userInput = document.getElementById('userInput').value;
    
//     try {
//       const response = await fetch('/process-input', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userInput }),
        
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const data = await response.json();
//       document.getElementById('response').textContent = data.response;
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   });






//   document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('inputForm');
//     if (form) {
//         form.addEventListener('submit', async function(e) {
//             console.log("LOG!")
//             e.preventDefault();
//             const userInput = document.getElementById('userInput').value;
    
//             try {
//             const response = await fetch('http://localhost:5504/process-input', {
//                 method: 'POST',
//                 headers: {
//                 'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ userInput }),
                
//             });
        
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
        
//             const data = await response.json();
//             // document.getElementById('response').textContent = data.response;
//             document.getElementById('gptOutput_id').textContent = data.response;
//             } catch (error) {
//             console.error('Error:', error);
//             }})
//         }

//     });


function typeResponse(responseText, targetElementId, typingSpeed) {
    const targetElement = document.getElementById(targetElementId);
    let i = 0;
    function typeChar() {
        if (i < responseText.length) {
            targetElement.value += responseText.charAt(i);
            i++;
            setTimeout(typeChar, typingSpeed);
        }
    }
    typeChar(); 
}



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inputForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
        console.log("LOG!")

            e.preventDefault();
            const userInput = document.getElementById('userInput').value;
    
            try {
                const response = await fetch('http://localhost:5505/process-input', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userInput }),
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                document.getElementById('gptOutput_id').value = '';
                typeResponse(data.response, 'gptOutput_id', 50);
                outputForm.style.display = 'flex';
                // document.getElementById('gptOutput_id').value = data.response; 
                
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // // Optional: Add an event listener for the 'Submit Response' button if you need to handle the submission of the ChatGPT response separately
    document.getElementById('outputForm').addEventListener('submit', async function(e) {

        e.preventDefault();
        const message = document.getElementById('gptOutput_id').value;
    
        try {
            const response = await fetch('http://localhost:5505/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({gptOutput_id :message }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Assuming gptOutput_id is an input or textarea, you can set its value to "Message sent"
            document.getElementById('gptOutput_id').value = "Appreciate it, have a productive day!";
            document.getElementById('submitResponse').style.display = 'none';

        } catch (error) {
            console.error('Error:', error);
        }


    });

});

