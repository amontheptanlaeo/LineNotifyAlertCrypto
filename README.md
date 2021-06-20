# LineNotifyAlertCrypto
- Node.js
- Alert Dodge coin when price up/down 0.05 Dodge
- Alert IOSToken when price up/down 0.5 IOST

# Install
- npm install
* Add LineNotify key in index.js : Line 17
  * ```javascript
    const notify = new lineApi.Notify({
    token: '...' 
    })
    ```
* Add Nomics.com key in index.js : Line 25
  * ```javascript
    const res = await axios.get('https://api.nomics.com/v1/currencies/ticker?key=<....>
    ```
- npm start

# Get Key Nomics.com
- https://p.nomics.com/cryptocurrency-bitcoin-api

# Get Key LineNotify
- https://notify-bot.line.me/en/
