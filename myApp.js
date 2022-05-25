require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(console.log('Database is Connected...'))
  .catch(err => {
    console.log('DB connection failed!!! ' + err); 
    process.exit();
  });


const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number},
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const person = new Person({name:"kosiso", age: 25, favoriteFoods: ["rice", "beans", "noodles"]})
  person.save((err, data) => {
    err ? done(err) : done(null, data)
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) =>  {
    err ? done(err) : done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    err ? done(err) : done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) =>{
    err ? done(err) : done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    err ? done(err) : done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, personFound) => {
    err ? done(err) : personFound.favoriteFoods.push(foodToAdd);
    personFound.save((err, data) => {
    err ? done(err) : done(null, data)
  })});
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const { age } = Person;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    err ? done(err) : done(null, data)
  });
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id:personId}, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name: nameToRemove}, (err, data) => {
    return err ? done(err) : done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const query = {favoriteFoods: foodToSearch}
  Person.find(query).sort({name: 'asc'}).limit(2).select('-age').exec((err, data) => {
    err ? done(err) : done(null, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
