# LineNotifyAlertCrypto
- Node.js
- Alert Dodge coin when price up/down 0.05 Dodge
- Alert IOSToken when price up/down 0.5 IOST

# Install
- npm install
* Add LineNotify key in index.js
  * ```javascript
    const notify = new lineApi.Notify({
    token: '...' 
    })
    ```
* Add Nomics.com key in index.js
  * ```javascript
    const res = await axios.get('https://api.nomics.com/v1/currencies/ticker?key=<....>&ids=DOGE,IOST&convert=THB&per-page=100&page=1').then(response => response.data)
    ```
- npm start

# Get Key Nomics.com
- https://p.nomics.com/cryptocurrency-bitcoin-api

# Get Key LineNotify
- https://notify-bot.line.me/en/
