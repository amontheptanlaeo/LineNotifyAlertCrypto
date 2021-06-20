var lineApi = require("line-api")
const axios = require('axios')

let temp1 = 0 , temp2 = 0

const LineKey = '...'
const NomicKey = '...'

Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

const notify = new lineApi.Notify({

  token: LineKey
})


async function CryptoReport() {

  try {

    const res = await axios.get('https://api.nomics.com/v1/currencies/ticker?key='+NomicKey+'&ids=DOGE&convert=USD&per-page=100&page=1').then(response => response.data)

    var size = Object.size(res);
    
    if(temp1 === 0) temp1 = parseFloat(res[0].price)
    if(temp2 === 0) temp2 = parseFloat(res[1].price)


        //DOGE
        if ((parseFloat(res[0].price)-temp1) <= -0.05) {
        console.log(temp1)
        temp1 = parseFloat(res[0].price)
        console.log(temp1)
        notify.send({
          message: `${res[0].name} Down!!!!!!!!!! price ${(parseFloat(res[0].price))} $`,
          sticker: 'surprise'

        }).then(console.log).catch((e)=>console.log(e))

      } else if ((parseFloat(res[0].price)-temp1) >= 0.05) {
        console.log(temp1)
        temp1 = parseFloat(res[0].price)
        console.log(temp1)
        notify.send({
          message: `${res[0].name} Boost!!!!!!!!!! price ${(parseFloat(res[0].price))} $`,
          sticker: 'smile'

        }).then(console.log).catch((e)=>console.log(e))

      } else {
        return
      }

  } catch (e) {
    notify.send({
      message: `Something wrong`,
    }).then(console.log).catch((e)=>console.log(e))
    console.log(e)
  }

}
    
setInterval(CryptoReport,10000)
