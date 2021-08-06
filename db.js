const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/acme_people_places_things_db');
const { STRING } = Sequelize.DataTypes;

const People = db.define('people', {
    name: STRING
});

const Places = db.define('places', {
    name: STRING
});

const Things = db.define('things', {
    name: STRING
});

const Souvenir = db.define('souvenir', {

})

Souvenir.belongsTo(People);
Souvenir.belongsTo(Places);
Souvenir.belongsTo(Things);


const data = {
    people: ['moe', 'larry', 'lucy', 'ethyl'],
    places: ['paris', 'nyc', 'chicago', 'london'],
    things: ['foo', 'bar', 'bazz', 'quq']
  };
  

const syncAndSeed = async () => {
    await db.sync( {force: true} );
    const [moe, larry, lucy, ethyl] = await Promise.all(data.people.map(person => People.create({ name: person })));
    const [paris, nyc, chicago, london] = await Promise.all(data.places.map(place => Places.create({ name: place })));
    const [foo, bar, bazz, quq] = await Promise.all(data.things.map(thing => Things.create({ name: thing })));
    await Souvenir.create({personId: moe.id, placeId: paris.id, thingId: bazz.id});

};

module.exports = {
    syncAndSeed,
    People,
    Places,
    Things,
    Souvenir
}