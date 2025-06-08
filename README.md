# 🛸 Rick & Morty Chat Portal

A simple, lightweight web application where users can chat with AI-powered Rick and Morty characters. Features an affection system that tracks your relationship with each character!

## 🌟 Features

- **4 Unique Characters**: Rick C-137, Rick Prime, Evil Morty, and Morty C-137
- **AI-Powered Conversations**: Uses Chute.ai for unlimited, free AI responses (API key included)
- **Affection System**: Build relationships with characters through your interactions
- **Real-time Chat**: Socket.io powered instant messaging
- **Responsive Design**: Works great on desktop and mobile
- **Lightweight**: Optimized for deployment on Render and other platforms

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- A Chutes.ai API key (provided by administrator)

### Local Development

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - The `.env` file contains the Chutes.ai API key
   - Get your API key from [https://chutes.ai/](https://chutes.ai/)
   - This is provided by the administrator - users don't need their own accounts

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - Select a character and start chatting!

## 🌐 Deploy to Render

This app is optimized for Render's free tier:

1. **Push to GitHub:**
   - Create a new GitHub repository
   - Push this code to your repository

2. **Deploy on Render:**
   - Go to [render.com](https://render.com) and sign up
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Use these settings:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Node Version**: 18 (or latest)

3. **Set Environment Variables:**
   - In Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add: `CHUTE_AI_API_KEY` with the provided API key value (contact admin for the key)

4. **Deploy:**
   - Click "Deploy" and wait for deployment to complete
   - Your app will be live at your Render URL!

## 🎮 How to Use

1. **Choose a Character**: Click on any character card to start chatting
2. **Chat Away**: Type messages and watch the AI respond in character
3. **Build Affection**: 
   - Be polite (use "please", "thank you") to increase affection
   - Avoid negative words to prevent affection loss
   - Longer, thoughtful messages show engagement
4. **Switch Characters**: Use the back button to chat with different characters

## 🧪 Characters

- **Rick C-137** 🧪: The genius scientist - cynical, sarcastic, brilliant
- **Rick Prime** ⚡: The most dangerous Rick - cold, calculating, ruthless  
- **Evil Morty** 👁️: The smartest Morty - manipulative, intelligent, menacing
- **Morty C-137** 😰: The anxious grandson - nervous, kind-hearted, overwhelmed

## 🔧 Technical Details

### Stack
- **Backend**: Node.js, Express, Socket.io
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **AI**: Chute.ai API (free tier)
- **Real-time**: WebSocket connections

### File Structure
```
testbots/
├── public/
│   ├── index.html      # Main HTML file
│   ├── style.css       # Styling
│   └── script.js       # Client-side JavaScript
├── server.js           # Express server & Socket.io
├── package.json        # Dependencies
├── .env.example        # Environment template
└── README.md          # This file
```

### API Usage
- Uses Chute.ai's GPT-3.5-turbo model
- Each character has a unique personality prompt
- Affection levels influence AI responses
- Rate limiting handled by Chute.ai

## 🎨 Customization

### Adding New Characters
1. Add character config in `server.js` characters object
2. Add character card in `index.html`
3. Update welcome messages in `script.js`

### Modifying Affection System
- Edit `updateAffection()` function in `server.js`
- Adjust affection change values based on message content
- Modify affection display in CSS

### Styling Changes
- All styles in `public/style.css`
- Uses CSS Grid and Flexbox for responsive design
- Rick & Morty themed color scheme

## 🐛 Troubleshooting

**Chat not working?**
- Check your Chute.ai API key is correct
- Verify internet connection
- Check browser console for errors

**Deployment issues?**
- Ensure all environment variables are set
- Check Render build logs
- Verify Node.js version compatibility

**Affection not updating?**
- Refresh the page
- Check Socket.io connection status
- Verify server logs

## 📝 License

MIT License - feel free to modify and use for your own projects!

## 🤝 Contributing

Feel free to submit issues and pull requests. This is a simple project perfect for beginners!

---

*Wubba lubba dub dub!* 🛸