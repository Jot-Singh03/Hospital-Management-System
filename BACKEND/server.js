import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_k:process.env.CLOUDINARY_API_SECRET,
  api_s:process.env.CLOUDINARY_API_KEY
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
