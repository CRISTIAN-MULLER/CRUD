const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MOGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`connection`);
  } catch (err) {}
};
