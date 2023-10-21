const { connect } = require("mongoose");

// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));

const connectDB = async () => {
  try {
    const db = await connect(process.env.DB_STRING);
    console.log(
      `Database is connected. Name: ${db.connection.name}. Host: ${db.connection.host}. Port: ${db.connection.port}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
  }
};

module.exports = connectDB;
