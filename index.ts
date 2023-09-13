import chalk from "chalk";
import inquirer from "inquirer"
let apiLink = " https://v6.exchangerate-api.com/v6/c32116c992b57ed071056041/latest/PKR"

let FetchData =  async(data:any)=>{
  let FetchData = await fetch(data);
  let res = await FetchData.json()
  return res.  conversion_rates;
}
let data = await FetchData(apiLink);
let cuntries = Object.keys(data);
let firstCountry = await inquirer.prompt({
  type:"list",
  name:"country",
  message:"Converting From",
  choices:cuntries,
});
let userMoney = await inquirer.prompt({
   type:"number",
   name:"money",
  message:`please Enter your Amount in ${chalk.greenBright.bold(firstCountry.country)}`
});
let secondCountry = await inquirer.prompt({
  type:"list",
  name:"country",
  message:"Converting to ",
  choices:cuntries,
});

let cnv = `https://v6.exchangerate-api.com/v6/c32116c992b57ed071056041/pair/${firstCountry.country}/${secondCountry.country}`
let cnvData =  async(data:any)=>{
  let cnvData = await fetch(data);
  let res = await cnvData.json()
  return res.conversion_rate;
}
let cnvRate = await cnvData(cnv);
 let convertedRate = userMoney.money * cnvRate;
 console.log(`Your ${chalk.redBright.bold(firstCountry.country)} ${chalk.redBright.bold(userMoney.money)} in ${chalk.redBright.bold(secondCountry.country)} is ${chalk.redBright.bold(convertedRate)}`);
