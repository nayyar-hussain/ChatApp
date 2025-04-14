

import { Inngest } from "inngest";
import { ConnectToDatabase } from "./Database";
import User from "../model/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "chatapp" });

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
   
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const userData = {
        _id: id,  // Clerk ID ko alag field mein store karo
        name: `${first_name} ${last_name}`,
        email: email_addresses[0].email_address,
        ImageUrl: image_url,
        bio : ''
      };

      

      await ConnectToDatabase()

      await User.create(userData);
   
  }
);
// for inngest update

export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,  // Clerk ID ko alag field mein store karo
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      ImageUrl: image_url,
      bio : ''
    };

    await ConnectToDatabase();
    await User.findOneAndUpdate(
      { _id: id },  
      userData,
      { new: true }
    );  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await ConnectToDatabase();
    await User.findByIdAndDelete(id);
  }
);