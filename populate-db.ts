

import 'core-js/es6/reflect';
import 'core-js/es7/reflect';



import {database, initializeApp} from "firebase";
import {firebaseConfig} from "./src/environments/firebase.config";
import {dbData} from "./db-data";


console.log("WARNING VERY IMPORTANT - PLEASE READ THIS\n\n\n");
console.log('WARNING Please set your own firebase config on src/environmnents/firebase.config.ts');
console.log('Otherwise you will get permissions errors, because the populate-db script is trying to write to my database instead of yours. ');
console.log('Any issues please contact me, Thanks, Vasco\n\n\n');



initializeApp(firebaseConfig);


const scheduleRef = database().ref('schedule');
const recepthumsRef = database().ref('receptums');



dbData.schedule.forEach((scheduleItem: any) => {

  console.log('adding scheduleItem', scheduleItem.id);

  const scheduleItemRef = scheduleRef.push({
    id: scheduleItem.id,
    name: scheduleItem.name,
    fullName: scheduleItem.fullName,
    day: scheduleItem.day,
    receptums: scheduleItem.receptums
  });

  let receptumsKeysPerSchedule = [];

  scheduleItem.receptums.forEach((receptum: any) => {

    console.log('adding receptum ', receptum.name);

    receptumsKeysPerSchedule.push(recepthumsRef.child('0UgaOLjMCyPn7SIlR2iknY5ufKY2').push({
      name: receptum.name,
      dose: receptum.dose,
      quantity: receptum.quantity,
      scheduleItemId: scheduleItemRef.key
    }).key);

  });


  const association = database().ref('receptumsPerSchedule');

  const receptumsPerSchedule = association.child('0UgaOLjMCyPn7SIlR2iknY5ufKY2').child(scheduleItemRef.key);

  receptumsKeysPerSchedule.forEach(receptumKey => {
    console.log('adding receptum to scheduleItem ');

    const receptumScheduleAssociation = receptumsPerSchedule.child(receptumKey);

    receptumScheduleAssociation.set(true);
  });


});
