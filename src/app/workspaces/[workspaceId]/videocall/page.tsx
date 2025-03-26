// import React, { useEffect, useState } from "react";
// import fs from "fs";
// import path from "path";
// import { authenticate } from "@google-cloud/local-auth";
// import { SpacesServiceClient } from "@google-apps/meet";
// import { auth } from "google-auth-library";

// // Define Scopes and File Paths
// const SCOPES = ["https://www.googleapis.com/auth/meetings.space.created"];
// const TOKEN_PATH = path.join(process.cwd(), "token.json");
// const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

// const VCPage: React.FC = () => {
//   const [loading, setLoading] = useState<boolean>(true); // State for loading
//   const [meetingURL, setMeetingURL] = useState<string | null>(null); // State for meeting URL
//   const [error, setError] = useState<string | null>(null); // State for error

//   // Load Saved Credentials
//   const loadSavedCredentialsIfExist = async (): Promise<any | null> => {
//     try {
//       const content = await fs.promises.readFile(TOKEN_PATH, "utf-8");
//       const credentials = JSON.parse(content);
//       return auth.fromJSON(credentials);
//     } catch (err) {
//       console.error("Error loading saved credentials:", err);
//       return null;
//     }
//   };

//   // Save New Credentials
//   const saveCredentials = async (client: any): Promise<void> => {
//     const content = await fs.promises.readFile(CREDENTIALS_PATH, "utf-8");
//     const keys = JSON.parse(content);
//     const key = keys.installed || keys.web;
//     const payload = JSON.stringify({
//       type: "authorized_user",
//       client_id: key.client_id,
//       client_secret: key.client_secret,
//       refresh_token: client.credentials.refresh_token,
//     });
//     await fs.promises.writeFile(TOKEN_PATH, payload);
//   };

//   // Authorize Function
//   const authorize = async (): Promise<any> => {
//     let client = await loadSavedCredentialsIfExist();
//     if (client) return client;

//     client = await authenticate({
//       scopes: SCOPES,
//       keyfilePath: CREDENTIALS_PATH,
//     });

//     if (client.credentials) {
//       await saveCredentials(client);
//     }
//     return client;
//   };

//   // Create Meeting Space
//   const createSpace = async (authClient: any): Promise<void> => {
//     try {
//       const meetClient = new SpacesServiceClient({ authClient });
//       const request = {}; // Customize request object if needed
//       const response = await meetClient.createSpace(request);
//       console.log("Meet URL:", response[0].meetingUri);
      
//       setMeetingURL(response[0].meetingUri); // Update meeting URL state
//     } catch (err) {
//       console.error("Error creating meeting space:", err);
//       setError("Failed to create meeting space.");
//     }
//   };

//   // Initialize on Component Mount
//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         const client = await authorize();
//         await createSpace(client);
//       } catch (err) {
//         console.error("Error initializing VCPage:", err);
//         setError("Authorization failed.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     initialize();
//   }, []);

//   // Render UI
//   return (
//     <div className="vc-page">
//       <h1>Virtual Meeting</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {meetingURL ? (
//         <p>
//           Your meeting is ready!{" "}
//           <a href={meetingURL} target="_blank" rel="noopener noreferrer">
//             Join Now
//           </a>
//         </p>
//       ) : (
//         !loading && <p>Failed to create a meeting. Try again later.</p>
//       )}
//     </div>
//   );
// };

// export default VCPage;
import React from 'react';


// https://7700585dca04aff5d1ed.vercel.app/

const Page: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-12 bg-gray-100 text-center flex items-center justify-center shadow-md">
        <h1 className="text-lg font-semibold">Video Calling</h1>
      </header>
      <iframe
        src="https://7700585dca04aff5d1ed.vercel.app/"
        className="flex-grow w-full border-none"
        title="Video Calling"
      />
    </div>
  );
};

export default Page;
