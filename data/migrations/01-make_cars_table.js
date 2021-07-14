exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema
  .createTable("cars", table=>{
    table.increments("id")
    table.string("vin", 128)
      .unique()
      .notNullable()
    table.string("make", 128)
      .notNullable()
    table.string("model", 128)
      .notNullable()
    table.integer("mileage")
      .notNullable()
    table.string("title", 128)
      .nullable()
    table.string("transmission", 128)
      .nullable()
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists("cars")
};
