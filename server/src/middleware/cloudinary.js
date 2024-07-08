import cloudinary from "cloudinary"

export const cloudinaryConfig = async () => {
    try {
        cloudinary.config({
            cloud_name: "dpabedrqk",
            api_key: "458554938613132",
            api_secret: "a_h5EE0fvgLAPxdL_o6v0IPQT6k"
        });
    } catch (error) {
        console.log(error)
    }
}