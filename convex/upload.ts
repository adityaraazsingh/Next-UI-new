// import { mutation } from "./_generated/server";

// export const generateUploadUrl = mutation(async (ctx) =>{
//     return await ctx.storage.generateUploadUrl();  
// });

import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {try {
    const uploadUrl = await ctx.storage.generateUploadUrl();
     console.log("Upload.ts URL:", uploadUrl); // url is being generated
    return uploadUrl;
  } catch (error) {
    console.error("Error Generating Upload URL:", error);
    throw new Error("Failed to generate upload URL.");
  }

  },
});