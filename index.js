
var express = require('express');
var app = express();
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
  /* mQIc4uoXvv2cpzTzjsjBmORQszPAcWwSYOjfw8OdP8q  Group Crypto*/
  /* 1BjoiZ8HNzPqgsih486zVr8McULIuEB3Vv8kFlfxiXk Personal */
  token: '1BjoiZ8HNzPqgsih486zVr8McULIuEB3Vv8kFlfxiXk'
})


async function CryptoReport() {

  try {



    const res = await axios.get('https://api.nomics.com/v1/currencies/ticker?key=b81824660531d2ac402730ae385a800503042030&ids=DOGE,IOST&convert=THB&per-page=100&page=1').then(response => response.data)

    var size = Object.size(res);

    // console.log(size)
    if(temp1 === 0) temp1 = parseFloat(res[0].price)
    if(temp2 === 0) temp2 = parseFloat(res[1].price)



    for (let i = 0; i < size; i++) {
      if (res[i].name === 'Dogecoin' && (parseFloat(res[i].price)-temp1) <= -0.01) {
        console.log(temp1)
        temp1 = parseFloat(res[i].price)
        console.log(temp1)
        notify.send({
          message: `หมากำลังตกหนัก !!!!!!!!!! ราคา ${(parseFloat(res[i].price))} บาท`,
          sticker: 'surprise'
          // shorthand
          // image: { fullsize: 'http://example.com/1024x1024.jpg', thumbnail: 'http://example.com/240x240.jpg' } // remote url
        }).then(console.log).catch((e)=>console.log(e))

      } else if (res[i].name === 'Dogecoin' && (parseFloat(res[i].price)-temp1) >= 0.01) {
        console.log(temp1)
        temp1 = parseFloat(res[i].price)
        console.log(temp1)
        notify.send({
          message: `หมากำลังบินไปดวงจันทร์ !!!!!!!!!! ราคา ${(parseFloat(res[i].price))} บาท`,
          sticker: 'smile'
          // shorthand
          // image: { fullsize: 'http://example.com/1024x1024.jpg', thumbnail: 'http://example.com/240x240.jpg' } // remote url
        }).then(console.log).catch((e)=>console.log(e))

      } else if (res[i].name === 'IOStoken' && (parseFloat(res[i].price)-temp2) >= 0.1) {
        console.log(temp2)
        temp2 = parseFloat(res[i].price)
        console.log(temp2)
        notify.send({
          message: `${res[i].name} กำลังขึ้นแรง !!!! ราคา ${(parseFloat(res[i].price))} บาท`,
          sticker: 'smile'
          // shorthand
          // image: { fullsize: 'http://example.com/1024x1024.jpg', thumbnail: 'http://example.com/240x240.jpg' } // remote url
        }).then(console.log).catch((e)=>console.log(e))

      } else if (res[i].name === 'IOStoken' && (parseFloat(res[i].price)-temp2) <= -0.1) {
        console.log(temp2)
        temp2 = parseFloat(res[i].price)
        console.log(temp2)
        notify.send({
          message: `${res[i].name} กำลังตกแรง !!!! ราคา ${(parseFloat(res[i].price))} บาท`,
          sticker: 'surprise'
          // shorthand
          // image: { fullsize: 'http://example.com/1024x1024.jpg', thumbnail: 'http://example.com/240x240.jpg' } // remote url
        }).then(console.log).catch((e)=>console.log(e))

      } else {
        return
      }

    }
    console.log(temp1)
    console.log(temp2)

  } catch (e) {
    notify.send({
      message: `โปรแกรมมีปัญหาแก้ไขด่วน`,
      // shorthand
      // image: { fullsize: 'http://example.com/1024x1024.jpg', thumbnail: 'http://example.com/240x240.jpg' } // remote url
    }).then(console.log).catch((e)=>console.log(e))
    console.log(e)
  }

}

/* exports.app = functions.pubsub.schedule("* * * * *").timeZone('Asia/Bangkok').onRun((context) => {

   
    //setInterval(CryptoReport, 5000);
    //setInterval(Status, 6500); //5นาที 300000

}); */

    setInterval(CryptoReport,5500)
    console.log("ทำงานปกติ")
