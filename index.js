const terminalBody = document.getElementById("terminalBody");
const getToKnowMeBtn = document.getElementById("getToKnowMeBtn");

const terminalSteps = [
  { type: "command", text: "who am i" },
  { type: "output", text: ">>> Loading player profile..." },
  { type: "output", text: ">>> Name: Sleiman El Hajj" },
  {
    type: "output",
    text: ">>> Class: Fourth year Computer Engineering Student",
  },
  { type: "output", text: ">>> Location: Lebanese American University" },
  { type: "output", text: ">>> Specialization: Full Stack Development" },
  { type: "output", text: ">>> Upcoming AI enthusiast" },
  { type: "command", text: "What is my mission" },
  {
    type: "output",
    text: ">>> Mission: Creating efficient, scalable solutions using modern technologies.",
  },
  {
    type: "output",
    text: ">>> Continously learning through research and development",
  },
  { type: "command", text: "brief summary of my experience" },
  { type: "output", text: ">>> Experience log:" },
  { type: "output", text: "- Currently a part time full stack developer" },
  { type: "output", text: "- Freelance backend development" },
  { type: "output", text: "- Building robust systems with Node.js & Express" },
  {
    type: "output",
    text: "- Creating dynamic web applications with React.js and Angular",
  },
];
function showInitialPrompt() {
  terminalBody.innerHTML = `
    <div id="terminalLines"></div>
    <div class="terminal-line" id="terminalPrompt">
      <span class="prompt">C:\\SLEIMAN&gt;</span>
      <span class="typed-command"></span>
      <span class="terminal-cursor"></span>
    </div>
  `;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeCommand(command) {
  const typedCommand = document.querySelector(".typed-command");
  typedCommand.innerHTML = "";
  for (let i = 0; i < command.length; i++) {
    typedCommand.innerHTML += command[i];
    await sleep(30);
  }
}

async function playTerminal() {
  getToKnowMeBtn.disabled = true;
  const linesDiv = document.getElementById("terminalLines");
  let stepIndex = 0;

  // Helper to show/hide the prompt at the bottom
  function showPrompt(show = true) {
    const promptDiv = document.getElementById("terminalPrompt");
    if (promptDiv) promptDiv.style.display = show ? "block" : "none";
  }

  // Start with prompt visible
  showPrompt(true);

  while (stepIndex < terminalSteps.length) {
    const step = terminalSteps[stepIndex];

    if (step.type === "command") {
      // Show prompt and type command at the prompt
      showPrompt(true);
      document.querySelector(".typed-command").innerHTML = "";
      await typeCommand(step.text);
      await sleep(300);

      // Move the finished command line to terminalLines
      const promptDiv = document.getElementById("terminalPrompt");
      const newLine = document.createElement("div");
      newLine.className = "terminal-line";
      newLine.innerHTML = `<span class="prompt">C:\\SLEIMAN&gt;</span> <span class="command">${step.text}</span>`;
      linesDiv.appendChild(newLine);

      // Reset the prompt for next output/command
      promptDiv.querySelector(".typed-command").innerHTML = "";
      terminalBody.scrollTop = terminalBody.scrollHeight;

      // Hide prompt for output phase
      showPrompt(false);
    } else {
      // Output appears as a new line above the prompt (prompt hidden)
      // Hide the prompt cursor
      showPrompt(false);

      // Create output line with cursor
      const outputLine = document.createElement("div");
      outputLine.className = "bio-line";
      linesDiv.appendChild(outputLine);

      for (let i = 0; i < step.text.length; i++) {
        // Always keep the cursor at the end while typing
        outputLine.innerHTML =
          step.text.slice(0, i + 1) + '<span class="terminal-cursor"></span>';
        await sleep(15);
      }
      // Remove cursor after output is done typing
      outputLine.innerHTML = step.text;
      await sleep(300);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    stepIndex++;
  }

  // After all steps, show prompt again
  showPrompt(true);
  getToKnowMeBtn.disabled = false;
}

// Play the terminal animation without removing the prompt

// Show prompt on load
showInitialPrompt();

// Prevent default for anchor tags with href="#"
document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (e) => e.preventDefault());
});

// --- USER INPUT HANDLING FOR TERMINAL ---

let userInput = "";

function focusTerminal() {
  // Focus the window so keydown works even after clicking elsewhere
  window.focus();
}

function updatePromptInput() {
  const typedCommand = document.querySelector(".typed-command");
  if (typedCommand) typedCommand.textContent = userInput;
}

document.addEventListener("keydown", function (e) {
  const promptDiv = document.getElementById("terminalPrompt");
  if (!promptDiv || promptDiv.style.display === "none") return;

  // Ignore if modifier keys are pressed
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  if (e.key === "Backspace") {
    userInput = userInput.slice(0, -1);
    updatePromptInput();
    e.preventDefault();
  } else if (e.key === "Enter") {
    processUserCommand(userInput);
    userInput = "";
    updatePromptInput();
    e.preventDefault();
  } else if (e.key.length === 1) {
    userInput += e.key;
    updatePromptInput();
    e.preventDefault();
  }
});

function processUserCommand(command) {
  const linesDiv = document.getElementById("terminalLines");
  // Add the user's command to the terminal
  const newLine = document.createElement("div");
  newLine.className = "terminal-line";
  newLine.innerHTML = `<span class="prompt">C:\\SLEIMAN&gt;</span> <span class="command">${command}</span>`;
  linesDiv.appendChild(newLine);

  // If command is 'cls', clear the terminal
  if (command.trim().toLowerCase() === "cls") {
    linesDiv.innerHTML = "";
  }

  // Always scroll to bottom
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// When the page loads or after animation, reset user input and focus
function resetPromptInput() {
  userInput = "";
  updatePromptInput();
  focusTerminal();
}

// After your playTerminal function, add this:
getToKnowMeBtn.addEventListener("click", () => {
  playTerminal().then(resetPromptInput);
});

// Also call resetPromptInput on load
resetPromptInput();




// --- PROJECT LEVEL SELECT ---
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active from all
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    // Hide all cards
    document.querySelectorAll('.project-card').forEach(card => card.style.display = 'none');
    // Show selected level
    const level = this.getAttribute('data-level');
    const card = document.querySelector(`.project-card[data-level="${level}"]`);
    if (card) card.style.display = '';
  });
});
// Set Level 1 as default
document.querySelector('.level-btn[data-level="1"]').classList.add('active');