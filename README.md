# Expresso
Very simple note express app. Some admin functionalities addedd for extra spicyness. 
## Running
Have a docker installed and run build script. The application will be available on the port *8000*

If you are not comfortable using docker you could do it manually. You need sqlite3 and npm installed.

```bash
cd expresso
sqlite3 expresso.db < sql_commands.txt
echo "TOKEN_SECRET=`tr -dc 'A-F0-9' < /dev/urandom | dd bs=1 count=128 2>/dev/null`" > .env
npm install
npm start
```
## Access
The administrator account has the most unbreakable password ever... you cannot guess it in a milion years haha. Change it afterwards
