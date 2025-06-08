const socket = io();

let currentCharacter = null;
let affectionLevels = {};

// DOM Elements
const characterCards = document.querySelectorAll('.character-card');
const chatContainer = document.getElementById('chatContainer');
const characterSelection = document.querySelector('.character-selection');
const backBtn = document.getElementById('backBtn');
const clearBtn = document.getElementById('clearBtn');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const currentAvatar = document.getElementById('currentAvatar');
const currentName = document.getElementById('currentName');
const currentAffectionFill = document.getElementById('currentAffectionFill');
const currentAffectionText = document.getElementById('currentAffectionText');

// Voice functionality - Removed

// Character selection
characterCards.forEach(card => {
    card.addEventListener('click', () => {
        const characterId = card.dataset.character;
        selectCharacter(characterId);
    });
});

// Back button
backBtn.addEventListener('click', () => {
    showCharacterSelection();
});

// Clear chat button
clearBtn.addEventListener('click', () => {
    clearChat();
});

// Send message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Removed Toggle voice functionality

// Request available voice samples when selecting a character - Removed related logic
function selectCharacter(characterId) {
    currentCharacter = characterId;
    
    // Update UI
    characterCards.forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.character === characterId) {
            card.classList.add('selected');
        }
    });
    
    // Get character info
    const characterCard = document.querySelector(`[data-character="${characterId}"]`);
    const avatar = characterCard.querySelector('.character-avatar').textContent;
    const name = characterCard.querySelector('h3').textContent;
    
    // Update chat header
    currentAvatar.textContent = avatar;
    currentName.textContent = name;
    updateCurrentAffection();
    
    // Show chat interface
    showChatInterface();
    
    // Clear previous messages
    chatMessages.innerHTML = '';
    
    // Request welcome message from server
    setTimeout(() => {
        socket.emit('request-welcome', { characterId });
    }, 500);
}

function getCharacterColor(characterId) {
    const colors = {
        'rick-c137': '#00ff00',
        'rick-prime': '#ff0000',
        'evil-morty': '#ffff00',
        'morty-c137': '#ffa500'
    };
    return colors[characterId] || '#ffffff';
}

function showCharacterSelection() {
    characterSelection.style.display = 'block';
    chatContainer.style.display = 'none';
    currentCharacter = null;
    
    // Clear selection
    characterCards.forEach(card => {
        card.classList.remove('selected');
    });
}

function showChatInterface() {
    characterSelection.style.display = 'none';
    chatContainer.style.display = 'flex';
    messageInput.focus();
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message || !currentCharacter) return;
    
    // Disable send button
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    // Send to server without voice option
    socket.emit('chat-message', {
        message: message,
        characterId: currentCharacter,
    });
    
    // Clear input
    messageInput.value = '';
}

function formatMarkdown(text) {
    // Convert markdown-style formatting to HTML
    return text
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>') // Bold + Italic
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
        .replace(/_(.*?)_/g, '<em>$1</em>') // Italic with underscores
        .replace(/~~(.*?)~~/g, '<del>$1</del>') // Strikethrough
        .replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
        .replace(/\n/g, '<br>'); // Line breaks
}

function addMessage(content, type, characterInfo = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    if (type === 'ai' && characterInfo) {
        const formattedContent = formatMarkdown(content);
        
        // Create affection footer if affection data is available
        let affectionFooter = '';
        if (characterInfo.affection !== undefined && characterInfo.mood && characterInfo.affectionChange !== undefined) {
            const changeText = characterInfo.affectionChange > 0 ? `+${characterInfo.affectionChange}` : characterInfo.affectionChange.toString();
            const changeColor = characterInfo.affectionChange > 0 ? '#4CAF50' : characterInfo.affectionChange < 0 ? '#f44336' : '#9E9E9E';
            
            affectionFooter = `
                <div class="affection-footer">
                    <span class="mood">Mood: ${characterInfo.mood}</span>
                    <span class="affection-change" style="color: ${changeColor}">Affection: ${changeText}</span>
                    <span class="affection-points">Points: ${characterInfo.affection}/100</span>
                </div>
            `;
        }
        
        // Removed Add voice message if available
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <img src="${characterInfo.avatar}" alt="${characterInfo.character}" class="chat-avatar">
                <div class="message-text">
                    <div class="character-name" style="color: ${characterInfo.color}">${characterInfo.character}</div>
                    <div>${formattedContent}</div>
                    ${affectionFooter}
                </div>
            </div>
        `;
    } else if (type === 'system') {
        const formattedContent = formatMarkdown(content);
        messageDiv.innerHTML = `<div style="font-style: italic; opacity: 0.8;">${formattedContent}</div>`;
        messageDiv.className = 'message ai';
    } else {
        messageDiv.innerHTML = formatMarkdown(content);
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateAffectionDisplay() {
    Object.keys(affectionLevels).forEach(characterId => {
        const affectionFill = document.querySelector(`[data-affection="${characterId}"]`);
        const affectionText = document.querySelector(`[data-affection-text="${characterId}"]`);
        
        if (affectionFill && affectionText) {
            const level = affectionLevels[characterId];
            affectionFill.style.width = `${level}%`;
            affectionText.textContent = `${level}%`;
        }
    });
}

function updateCurrentAffection() {
    if (currentCharacter && affectionLevels[currentCharacter] !== undefined) {
        const level = affectionLevels[currentCharacter];
        currentAffectionFill.style.width = `${level}%`;
        currentAffectionText.textContent = `${level}%`;
    }
}

function clearChat() {
    if (confirm('Are you sure you want to clear this chat?')) {
        chatMessages.innerHTML = '';
        
        // Add welcome message again if there's a current character
        if (currentCharacter) {
            const characterCard = document.querySelector(`[data-character="${currentCharacter}"]`);
            const avatar = characterCard.querySelector('.character-avatar').textContent;
            const name = characterCard.querySelector('h3').textContent;
            
            // Request welcome message from server
            setTimeout(() => {
                socket.emit('request-welcome', { characterId: currentCharacter });
            }, 300);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showCharacterSelection();
});

// Handle connection status
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    addMessage('Connection lost. Trying to reconnect...', 'system');
});

socket.on('reconnect', () => {
    console.log('Reconnected to server');
    addMessage('Reconnected successfully!', 'system');
});

socket.on('ai-response', (data) => {
    removeTypingIndicator();
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send';
    addMessage(data.message, 'ai', {
        character: data.character,
        avatar: data.avatar,
        color: getCharacterColor(data.characterId),
        affection: data.affection,
        affectionChange: data.affectionChange,
        mood: data.mood,
        // Removed voiceData property
    });
    updateCurrentAffection();
});

// Removed socket.on('voice-samples-list')