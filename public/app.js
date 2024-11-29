const socket = io(); //connecting io in frontend

// Getting user's name 
const username = prompt("Enter your name:");

const user_name=document.getElementById('user_name');
user_name.innerText+=(" " +username);

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages");

// Send message when button is clicked
sendBtn.addEventListener('click', () => {
  sendMessage();
});

// Send message when Enter key is pressed
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

//function for sending message
function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    // Emit the message with the sender's name
    socket.emit('chatMessage', { user: username, text: message });
    messageInput.value = ''; // Clear the input field
  }
}

// Listen for incoming messages
socket.on('chatMessage', (data) => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
  messagesContainer.appendChild(messageElement);

  // Scroll to the bottom of the message container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

//Functionallity to add
//1. store the chat in a DB 
//2. again showing those message when user enters


