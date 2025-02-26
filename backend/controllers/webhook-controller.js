import User from "../models/user-model.js";
import { Webhook } from "svix";


export const clerkWebHook = async (req, res) => {
    
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        console.error("Webhook secret is missing!"); // Log the error for debugging
        return res.status(500).json({ message: "Webhook secret is missing!" }); // Return 500 for missing secret
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
        console.log("Webhook verified successfully:", evt.type); // Log successful verification and event type
    } catch (err) {
        console.error("Webhook verification failed:", err); // Log the verification error with details
        return res.status(400).json({ message: "Webhook verification failed" }); // Return 400 for verification failure
    }
console.log(evt.data)
    if (evt.type === "user.created") {
        try {
            const newUser = new User({
                clerkUserId: evt.data.id,
                username: evt.data.username || evt.data.email_addresses[0].email_address,
                email: evt.data.email_addresses[0].email_address,
                img: evt.data.profile_img_url,
            });

            const savedUser = await newUser.save();
            console.log("New user saved:", savedUser); // Log the saved user data
        } catch (error) {
            console.error("Error saving user:", error); // Log any errors during user saving
            return res.status(500).json({ message: "Error saving user" }); // Return 500 for database errors
        }
    } else {
        console.log("Unhandled event type:", evt.type); // Log unhandled event types
    }

    return res.status(200).json({ message: "Webhook received" });
};

