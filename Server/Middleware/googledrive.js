const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// Load client secrets from a local file.
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json"); // Download this file from Google Cloud Console
const TOKEN_PATH = path.join(__dirname, "token.json"); // Generate this token as per the Google Drive API quickstart guide

const authorize = () => {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.installed; // Ensure using correct key
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
  oAuth2Client.setCredentials(token);

  return oAuth2Client;
};

const uploadFile1 = async (filePath, fileName, folderId) => {
  const auth = authorize();
  const drive = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };
  const media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id",
  });

  return `https://drive.google.com/thumbnail?id=${response.data.id}`;
};

const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your cloud name, API key, and API secret
cloudinary.config({
  cloud_name: "daejlpl9t", // replace with your Cloudinary cloud name
  api_key: "121546826454442", // replace with your Cloudinary API key
  api_secret: "9eoUAcT3wrxuez9TjQsfPklZjmA", // replace with your Cloudinary API secret
});

const uploadFile = async (filePath, fileName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: fileName, // Optional: specify a public ID for the file
      resource_type: "image",
      folder: "Online_Voting_Assets", // Optional: specify a folder in Cloudinary
    });

    // Return the public URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Upload failed");
  }
};


const getGoogleDriveFileId = (link) => {
  const match = link.match(/id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const deleteFile = async (link) => {
  const auth = authorize();
  const drive = google.drive({ version: "v3", auth });
  const fileId = getGoogleDriveFileId(link);
  if (!fileId) {
    return "Invalid File ID";
  }

  // Delete the photo from Google Drive
  await drive.files.delete({ fileId });
  return;
};
module.exports = { uploadFile, deleteFile };
