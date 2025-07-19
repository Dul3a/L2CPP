# L2C++ </>
![image alt](https://github.com/Dul3a/L2CPP/blob/bb896305e83a3a7b4cef6871a20a12d7af095ddf/Images%20%26%20Videos/L2C%2B%2B%20LOGO%20500x500.png)

L2C++ is a minimalist and efficient learning platform designed to help beginners understand and practice C++ programming.

Key Features:
- 🧠 Learn-by-doing approach: Encourages hands-on coding to strengthen understanding.

- 💻 Interactive editor: Write, run, and test C++ code directly in the browser.

- 📘 Structured lessons: Introduces fundamental concepts progressively.

- ⚡ Fast and lightweight: No signup or installation required — start learning immediately.

- 🤖 AI chatbot assistant – Ask programming questions or get live help with debugging, syntax, and concepts.

# How to run the website

If you want you can access the website online right now at https://l2cpp.vercel.app/

If you want to access the platform locally, you'll need to:
- Clone the repository: 
```bash
git clone https://github.com/Dul3a/L2CPP.git
```
- Move to the created directory:
```bash
cd L2CPP
```
- If you want to dive directly into action, you can access the `index.html` file, but the Summarizer and Chatbot won't work. For that,
you'll need to create an `.env` file and write the following inside the file:
```bash
OPENAI_API_KEY=YOUR_API_KEY
PORT=3000
```
- Now you need to install the required dependencies. You'll need to have `Node.js` installed on your PC to use the following commands.
You can check if you have it already installed opening the terminal and writing these commands:
```batch
nove -v
npm -v
```
- If you don't have Node.js installed, download the installer from the official Node.js website (nodejs.org) and follow the on-screen instructions
- After you are done with installing Node.js, open the terminal and write:
```bash
npm install express
```
- You'll also need dotenv for the .env:
```bash
npm install dotenv
```
- Now you can start the server :
```bash
node server.js
```
- Now you can access "http://localhost:3000" and you are good to go!

⚠️Attention! The API key from OPENAI is not free to use, if you want you can search for a free AI API key on the internet, but for a better experience I suggest you use the online version of the website instead of running it locally: https://l2cpp.vercel.app/

You can still run it locally without a problem, but the Summarizer and Chatbot won't work properly without an activated API key.
