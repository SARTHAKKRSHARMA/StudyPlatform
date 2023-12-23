const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();     

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes s= require("./routes/Course");
const contactUsRoutes = require("./routes/ContactUs");

const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinaryConnect = require("./config/cloudinary");

// cloudinaryConnect();
const PORT = process.env.PORT || 4000;
dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
	  origin: "https://study-platform-hla7vgoqx-sarthakkrsharmas-projects.vercel.app",
	  credentials: true,
	})
  );
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/contact", contactUsRoutes);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})



























































































 