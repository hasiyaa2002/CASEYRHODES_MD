const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUFKRXB5ZVhvU3pZMEVWYzhTTzFBL25Ycy83cnQ0NVA3SytnZnZxQzQzYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFR2WWpIYis3N0loQmRDUGpCQ2taTWJ6VmlJcjFLQmdaYlJ1RmpEdGxWaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSTVDUHM5U2xyS21XSnc1ZnlqRXd2dTBQY1Y2R3NVVVpLZzF3VWtuNkc4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWMzArOVg1bUtmcEdET0J1LzlMRXFLNTNaV256eU9ubVN3MjYxRFBKS3dJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVNWTJ5MjFEaWZ2eGNMNW1nWGJsZk5zOEhBOU1BNUphUEtJSzZaQ2trSEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9xZTUrQlBGcnI5NnJCREEwYlI0aGI5TnBpeUlTMU1McmJUTHFneHc3Q289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNElXdUJ0VmJ5N21FSnZNWDVJa2VEa3NqSTBJS1lrTkwvSmsrSXdvYWMyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQzNMQkhxdFNMSmxkdXFxMWNEcTE2TmZaUDJsWmRIUEptWmxNK0xycEJSST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFGVnppRlh1ZDh1MUw0R1ZTTVJrc3lqd294VnBxbkF4QVNlWTNNUytBZi9qOUFnYmpSTEEwazl3NHN6VHhPanJHUnlwTnRTWlpKSHg5d09GalAwSWhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY0LCJhZHZTZWNyZXRLZXkiOiJWT0ZBR1VWOWllRHNhMHo4SHNMNE80STlPVlg5YjF1V3pRWG9rSjZKOXBJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0Nzg4NDQ4MDA3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijk3QjE1RDg3RjczM0YxOThGRDgyQkRCRTAxMjM3OEZCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjk1MDUwODZ9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0Nzg4NDQ4MDA3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjFDQTkyMjcyNDRBQ0FGODFEODU3Q0JEODZFQjQzMzg1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjk1MDUwODZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlkxaDJKakljUXZDc0tYdFdXQl9fUUEiLCJwaG9uZUlkIjoiMDRjNGNmZmQtMWZmNi00ZDA3LTliMzMtZmVlY2UxOGFlMTZiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtURkMyT2JQSzdFcFBJcmNHa0owS29yVlpTcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGTU1XUlVKR0w5OEc3eGRSeDV0RnJTcDY1NHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUTU0N1gzMTYiLCJtZSI6eyJpZCI6Ijk0Nzg4NDQ4MDA3OjRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8JOEgsqZyp/htIDhtIThtIsg4bSAyp/qnLDhtIAg4bSP6pyw6pywyarhtITJquG0gMqfIOG0oeG0gCDKmeG0j+G0m+C/kCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTEM0OWRNREVLN08yTGdHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVERoZ1NBSFVxWHUvYTZCTU52VEFEWUZGS3VjSWZNaE9jUUJrMmpPQThWWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTFViU2lBNEZoSjRXVS9kMWNsK1VTRzEvc1V4VmJkbDJXTjMybXBvM2ZMekNOZVpKbkFQNER4cVE4WXZ1dnV1MXNBTHR3T2F2ZTVCWGx5NjIvbHB6QlE9PSIsImRldmljZVNpZ25hdHVyZSI6IkEySExST1N4Z1NRajdqcVg1TERkQ2NuajhHOEtrR0ZydDlqZXlRaSsvZGNTWGphMGprNWtGWWNKNWxiY3JCVE5lVHIwTUF3bzU3cGIxVFdXNm0xVmpnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3ODg0NDgwMDc6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVdzRZRWdCMUtsN3YydWdURGIwd0EyQlJTcm5DSHpJVG5FQVpOb3pnUEZXIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5NTA1MDgyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURTTSJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE || "."
    NOM_OWNER: process.env.NOM_OWNER || "HASA",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "94754625969"             
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'alfa md',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
