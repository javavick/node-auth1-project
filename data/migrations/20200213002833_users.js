exports.up = async function(knex) {
  await knex.schema.createTable("users", (tbl) => {
    tbl.increments("id");
    tbl
      .string("username", 128)
      .notNullable()
      .unique();
    tbl.text("password").notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users");
};
