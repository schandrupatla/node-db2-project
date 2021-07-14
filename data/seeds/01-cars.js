// STRETCH
exports.seed = function (knex) {
    // Deletes ALL existing entries and resets the primary keys
    return knex('cars').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('cars').insert([
          // DO NOT ADD ids
          { vin: '5Y2SR67099Z454909', make: 'Tesla', model: 'x', mileage:300, title:'clean',transmission:'automatic'},
          { vin: '1GCHK29U74E217455', make: 'BMW', model: 'x5', mileage:200, title:'salvage',transmission:'manual'},
          { vin: '1G8ZH5280VZ294948', make: 'Honda', model: 'civic', mileage:400, title:'clean'},
          { vin: '2G1WC581869321030', make: 'Toyota', model: 'corolla', mileage:300}
        ]);
      });
  };
