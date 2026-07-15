Nothing yet.

The structure meant to be for personal use only.
You receive the message anonymously and can reply while bot is still running ...

## The structure I want to follow

```text
MyBot/
│
├── src/
│   │
│   ├── bot/
│   │   ├── index.js             
│   │   ├── commands.js          
│   │   ├── messages.js          
│   │   └── handlers.js           
│   │
│   ├── database/
│   │   ├── index.js              
│   │   ├── users.js              
│   │   └── messages.js           
│   │
│   ├── services/
│   │   ├── ai.js                
│   │   └── telegram.js          
│   │
│   ├── server/
│   │   └── webhook.js            # Webhook endpoint (serverless mode)
│   │
│   ├── config/
│   │   └── env.js               
│   │
│   └── app.js                    
│
├── database/
│   └── bot.db                    
│
├── .env                          
├── .env.example                 
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── LICENSE
```

## HOW SERVERLES?
READ HERE: [Telegram Bot Serverless Architecture](https://core.telegram.org/bots/serverless)
