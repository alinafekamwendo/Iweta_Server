const express = require("express");
const KholaReportController = express.Router();
const nodeCron=require('node-cron');
const cattleVaccines=require("../../models/CattleVaccines.json");
const pigsVaccines=require("../../models/PigsVaccines.json");
const feeding=require("../../models/FeedingRequirementsData.json");

const { Khola: Kholas,CattleVaccinationData,PigsVaccinationData,FeedingData } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");

//sms
KholaReportController.get('/sms',(req,res,next)=>{

// const credentials = {
//     apiKey: 'ec38a853dda95e8ee89bf5fe4cfc511af2d404a054c2e0ed8f0a4c88755773f0',         // use your sandbox app API key for development in the test environment
//     username: 'iweta',      // use 'sandbox' for development in the test environment
// };
// const Africastalking = require('africastalking')(credentials);

// try {
//     const sms = Africastalking.SMS
// // Use the service
// const options = {
//     to: ['+265993925060'],
//     message: "hello v"
// }

// // Send message and capture the response or error
// sms.send(options)
//     .then( response => {
//         console.log(response);
//         res.status(200).json(response);
//     })
//     .catch( error => {
//         console.log(error);
//     });
    
// } catch (error) {
//     next(error);
// }
// Initialize a service e.g. SMS

});
//generating report
KholaReportController.get("/khola/report/vaccination/:id",async (req, res,next) => {

   
    const kholaId=req.params.id;

    //derived variables
    const khola=await Kholas.findOne({where:{id:kholaId}});
    const beefVaccines=await CattleVaccinationData.findAll(
        {where:{
            Breed:"Beef"
        }}
    );
    const dairyVaccines=await CattleVaccinationData.findAll(
        {where:{
            Breed:"Dairy"
        }}
    );
    const pigVaccines=await PigsVaccinationData.findAll();
    //variables
    const numberOfAnimals=khola.Number;
    const kholaName=khola.KholaName;
    const type=khola.AnimalType;
    const typeOfAnimal=type.toLowerCase();
    const anaimalBreed=khola.Breed;
    const breed=anaimalBreed.toLowerCase();
    const location=khola.Location;
    const created=khola.createdAt;
    const updated=khola.updatedAt;
    //testing
    console.log("khola created on :",created);
    console.log("khola name :",kholaName);
    console.log("khola for :",typeOfAnimal);
    console.log("Located at:",location);


  
    //three months later
    var threeMonthsLater = new Date(created);
            threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    //six months later
    var sixMonthsLater = new Date(created);
            sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    //formatting
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }


       //function to return number of months collapsed
 function getNumberOfMonths(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const monthDiff = endDate.getMonth() - startDate.getMonth() +
    (12 * (endDate.getFullYear() - startDate.getFullYear()));

    return monthDiff;
}


function getNumberOfDays(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const dayDiff = endDate.getDay() - startDate.getDay() +
    (12 * (endDate.getFullYear() - startDate.getFullYear()));

    return dayDiff;
}
 // 👇️  (mm/dd/yyyy)
 const sixthMoth=formatDate(sixMonthsLater);
 const thirdMoth=formatDate(threeMonthsLater);
let finalReport=[];
try{
   
    //number of months
     const numberOfmonths=getNumberOfMonths(created, new Date());
     const numberOfDays=getNumberOfDays(new Date("October 14,2021"), new Date());

     console.log(`number of months is ${numberOfmonths}`);
     switch (typeOfAnimal) {
        case "cattle":{
            if(breed==="beef"){
                    try {
                        beefVaccines.forEach(element => {
                            if(numberOfmonths<3){
                                const totalDosage=element.Dosage*numberOfAnimals;
                                if(element.AgeOfVaccination==="3"){
                                    finalReport.push({
                                        "Type":element.TypeOfVaccine,
                                        "Breed":element.Breed,
                                        "Ageofvaccine":element.AgeOfVaccination,
                                        "Dosage":element.Dosage,
                                        "Total_Dosage":totalDosage,
                                        "EffectiveAfter":element.EffectiveAfter,
                                        "Duration":element.Duration,
                                        "Revaccination":element.Revaccination,
                                        "Next_Vaccination_Day":thirdMoth,
                                        "status":"pending"
                            
                                    });
                                }else if(element.AgeOfVaccination==="6"){
                                    finalReport.push({
                                        "Type":element.TypeOfVaccine,
                                        "Breed":element.Breed,
                                        "Ageofvaccine":element.AgeOfVaccination,
                                        "Dosage":element.Dosage,
                                        "Total_Dosage":totalDosage,
                                        "EffectiveAfter":element.EffectiveAfter,
                                        "Duration":element.Duration,
                                        "Revaccination":element.Revaccination,
                                        "Next_Vaccination_Day":sixthMoth,
                                        "status":"pending"
                            
                                    });
                                }
                             }else if(numberOfmonths>3 && numberOfmonths<6){
                                 if(element.AgeOfVaccination==="3"){
                                     const totalDosage=element.Dosage*numberOfAnimals;
                                    finalReport.push({
                                        "Type":element.TypeOfVaccine,
                                        "Breed":element.Breed,
                                        "Ageofvaccine":element.AgeOfVaccination,
                                        "Dosage":element.Dosage,
                                        "Total_Dosage":totalDosage,
                                        "EffectiveAfter":element.EffectiveAfter,
                                        "Duration":element.Duration,
                                        "Revaccination":element.Revaccination,
                                        "Next_Vaccination_Day":thirdMoth,
                                        "status":"Missing vaccination"
                                    });
                                 }
                                 if(element.AgeOfVaccination==="6"){
                                    const totalDosage=element.Dosage*numberOfAnimals;
                                    finalReport.push({
                                        "Type":element.TypeOfVaccine,
                                        "Breed":element.Breed,
                                        "Ageofvaccine":element.AgeOfVaccination,
                                        "Dosage":element.Dosage,
                                        "Total_Dosage":totalDosage,
                                        "EffectiveAfter":element.EffectiveAfter,
                                        "Duration":element.Duration,
                                        "Revaccination":element.Revaccination,
                                        "Next_Vaccination_Day":sixthMoth,
                                        "status":"pending"
                                    });
                                 }
                    
                             }else{
                                const totalDosage=element.Dosage*numberOfAnimals;
                                finalReport.push({
                                    "Type":element.TypeOfVaccine,
                                    "Breed":element.Breed,
                                    "Ageofvaccine":element.AgeOfVaccination,
                                    "Dosage":element.Dosage,
                                    "Total_Dosage":totalDosage,
                                    "EffectiveAfter":element.EffectiveAfter,
                                    "Duration":element.Duration,
                                    "Revaccination":element.Revaccination,
                                    "Next_Vaccination_Day":sixthMoth,
                                    "status":"Missing"
                                });
                            }
                        });
        
                    } catch (error) {
                        
                    }
                }else if(breed==="dairy"){
                          try {
                        dairyVaccines.forEach(element => {
                            if(numberOfmonths<3){
                                const totalDosage=element.Dosage*numberOfAnimals;
                                if(element.AgeOfVaccination==="3"){
                                    finalReport.push({
                                        "Type":element.TypeOfVaccine,
                                        "Breed":element.Breed,
                                        "Ageofvaccine":element.AgeOfVaccination,
                                        "Dosage":element.Dosage,
                                        "Total_Dosage":totalDosage,
                                        "EffectiveAfter":element.EffectiveAfter,
                                        "Duration":element.Duration,
                                        "Revaccination":element.Revaccination,
                                        "Next_Vaccination_Day":thirdMoth,
                                        "status":"pending"
                            
                                    });
                                }else if(element.AgeOfVaccination==="6"){
                                    finalReport.push({
                                        "Type":element.TypeOfVaccine,
                                        "Breed":element.Breed,
                                        "Ageofvaccine":element.AgeOfVaccination,
                                        "Dosage":element.Dosage,
                                        "Total_Dosage":totalDosage,
                                        "EffectiveAfter":element.EffectiveAfter,
                                        "Duration":element.Duration,
                                        "Revaccination":element.Revaccination,
                                        "Next_Vaccination_Day":sixthMoth,
                                        "status":"pending"
                            
                                    });
                                }
                             }else if(numberOfmonths>3 && numberOfmonths<6){
                                 if(element.AgeOfVaccination==="3"){
                                     const totalDosage=element.Dosage*numberOfAnimals;
                                    finalReport.push({
                                        "Type":element.TypeOfVaccine,
                                        "Breed":element.Breed,
                                        "Ageofvaccine":element.AgeOfVaccination,
                                        "Dosage":element.Dosage,
                                        "Total_Dosage":totalDosage,
                                        "EffectiveAfter":element.EffectiveAfter,
                                        "Duration":element.Duration,
                                        "Revaccination":element.Revaccination,
                                        "Next_Vaccination_Day":thirdMoth,
                                        "status":"Missing vaccination"
                                    });
                                 }
                                 if(element.AgeOfVaccination==="6"){
                                    const totalDosage=element.Dosage*numberOfAnimals;
                                    finalReport.push({
                                        "Type":element.TypeOfVaccine,
                                        "Breed":element.Breed,
                                        "Ageofvaccine":element.AgeOfVaccination,
                                        "Dosage":element.Dosage,
                                        "Total_Dosage":totalDosage,
                                        "EffectiveAfter":element.EffectiveAfter,
                                        "Duration":element.Duration,
                                        "Revaccination":element.Revaccination,
                                        "Next_Vaccination_Day":sixthMoth,
                                        "status":"pending"
                                    });
                                 }
                    
                             }else{
                                const totalDosage=element.Dosage*numberOfAnimals;
                                finalReport.push({
                                    "Type":element.TypeOfVaccine,
                                    "Breed":element.Breed,
                                    "Ageofvaccine":element.AgeOfVaccination,
                                    "Dosage":element.Dosage,
                                    "Total_Dosage":totalDosage,
                                    "EffectiveAfter":element.EffectiveAfter,
                                    "Duration":element.Duration,
                                    "Revaccination":element.Revaccination,
                                    "Next_Vaccination_Day":sixthMoth,
                                    "status":"Missing"
                                });
                            }
                        });
        
                    } catch (error) {
                        
                    }
                }
                else{
                    finalReport.push({
                        "Type":"",
                        "Breed":"",
                        "Ageofvaccine":"invalid",
                        "Dosage":"invalid",
                        "Total_Dosage":"invalid",
                        "EffectiveAfter":"invalid",
                        "Duration":"invalid",
                        "Revaccination":"invalid",
                        "Next_Vaccination_Day":"invalid",
                        "status":"invalid"
                    });
                }
        }
        break;
        case "pig":{
            try {
             pigVaccines.forEach(element => {
             const totalDosage=element.Dosage*numberOfAnimals;
             if(numberOfDays<element.FirstDose){

             
            finalReport.push({
                "Type":element.Vaccine,
                "Breed":"Pigs",
                "Ageofvaccine":element.FirstDose,
                "Dosage":element.Dosage,
                "Total_Dosage":totalDosage,
                "EffectiveAfter":"",
                "Duration":element.Booster,
                "Revaccination":element.Subsequent,
                "Next_Vaccination_Day":sixthMoth,
                "status":"pending"
            });
        }else if(numberOfDays>element.FirstDose){
               
            finalReport.push({
                "Type":element.Vaccine,
                "Breed":"Pigs",
                "Ageofvaccine":element.FirstDose,
                "Dosage":element.Dosage,
                "Total_Dosage":totalDosage,
                "EffectiveAfter":"",
                "Duration":element.Booster,
                "Revaccination":element.Subsequent,
                "Next_Vaccination_Day":sixthMoth,
                "status":"missing"
            });
        }
        });
            } catch (error) {
                
            }
          
        }
        break;
         
        default:{
            finalReport.push({
                "Type":"",
                "Breed":"",
                "Ageofvaccine":"",
                "Dosage":"",
                "Total_Dosage":"",
                "EffectiveAfter":"",
                "Duration":"",
                "Revaccination":"",
                "Next_Vaccination_Day":"",
                "status":"invalid"
            });
        }
    
      };
     
     res.status(200).json(finalReport);
     //whatsapp

          
    } catch (error) {
        next(error);
    }
  });


  KholaReportController.get("/khola/report/feeding/:id",async (req,res,next)=>{
try {
    const kholaId=req.params.id;

    //derived variables
    const khola=await Kholas.findOne({where:{id:kholaId}});
    const feedingData=await FeedingData.findAll();
    //variables
    const numberOfAnimals=khola.Number;
    const kholaName=khola.KholaName;
    const type=khola.AnimalType;
    const typeOfAnimal=type.toLowerCase();
    const anaimalBreed=khola.Breed;
    const breed=anaimalBreed.toLowerCase();
    const location=khola.Location;
    const created=khola.createdAt;
    //testing
    console.log("khola created on :",created);
    console.log("khola name :",kholaName);
    console.log("khola for :",typeOfAnimal);
    console.log("Located at:",location);
    res.status(200).json(feedingData);
} catch (error) {
    next(error);
}

  });

//   nodeCron.schedule('* * * * *', function() {
//     var c = new TMClient('username', 'C7XDKZOQZo6HvhJwtUw0MBcslfqwtp4');
//     c.Messages.send({text: 'test message', phones:'9990001'}, function(err, res){
//         console.log('Messages.send()', err, res);
//     });
//     console.log('running a task every SECOND');
//   });
  
module.exports = KholaReportController;