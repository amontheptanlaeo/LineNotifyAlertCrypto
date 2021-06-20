var lineApi = require("line-api")
const axios = require('axios')

let temp1 = 0 , temp2 = 0

Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

const notify = new lineApi.Notify({

  token: '[LineNotify get key]'
})


async function CryptoReport() {

  try {

    const res = await axios.get('https://api.nomics.com/v1/currencies/ticker?key=[Nomic.com get key]&ids=DOGE,IOST&convert=THB&per-page=100&page=1').then(response => response.data)

    var size = Object.size(res);
    
    if(temp1 === 0) temp1 = parseFloat(res[0].price)
    if(temp2 === 0) temp2 = parseFloat(res[1].price)


        //DOGE
        if ((parseFloat(res[0].price)-temp1) <= -0.05) {
        console.log(temp1)
        temp1 = parseFloat(res[0].price)
        console.log(temp1)
        notify.send({
          message: `หมากำลังตกหนัก !!!!!!!!!! ราคา ${(parseFloat(res[0].price))} บาท`,
          sticker: 'surprise'

        }).then(console.log).catch((e)=>console.log(e))

      } else if ((parseFloat(res[0].price)-temp1) >= 0.05) {
        console.log(temp1)
        temp1 = parseFloat(res[0].price)
        console.log(temp1)
        notify.send({
          message: `หมากำลังบินไปดวงจันทร์ !!!!!!!!!! ราคา ${(parseFloat(res[0].price))} บาท`,
          sticker: 'smile'

        }).then(console.log).catch((e)=>console.log(e))

      }

      //IOST
      if ((parseFloat(res[1].price)-temp2) >= 0.1) {
        console.log(temp2)
        temp2 = parseFloat(res[1].price)
        console.log(temp2)
        notify.send({
          message: `${res[1].name} กำลังขึ้นแรง !!!! ราคา ${(parseFloat(res[1].price))} บาท`,
          sticker: 'smile'

        }).then(console.log).catch((e)=>console.log(e))

      } else if ((parseFloat(res[1].price)-temp2) <= -0.1) {
        console.log(temp2)
        temp2 = parseFloat(res[1].price)
        console.log(temp2)
        notify.send({
          message: `${res[1].name} กำลังตกแรง !!!! ราคา ${(parseFloat(res[1].price))} บาท`,
          sticker: 'surprise'

        }).then(console.log).catch((e)=>console.log(e))

      } else {
        return
      }

  } catch (e) {
    notify.send({
      message: `โปรแกรมมีปัญหาแก้ไขด่วน`,
    }).then(console.log).catch((e)=>console.log(e))
    console.log(e)
  }

}
    
setInterval(CryptoReport,10000)
