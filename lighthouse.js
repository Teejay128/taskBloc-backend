const { lighthouse } = require("@lighthouse-web3/sdk");

const text = "Sometimes, I Wish I Was A Cloud, Just Floating Along";
const apiKey = "5f3e9ab6.674f475e26164340afe410f4d7dd3585";
const name = "shikamaru";

const response = await lighthouse.uploadText(text, apiKey, name);

console.log(response);
// // Sample response
// {
//   data: {
//     Name: 'shikamaru',
//     Hash: 'QmY77L7JzF8E7Rio4XboEpXL2kTZnW2oBFdzm6c53g5ay8',
//     Size: '91'
//   }
// }
