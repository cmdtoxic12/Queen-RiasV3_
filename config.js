const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxicity",
    ownerNumber: process.env.OWNER_NUMBER || "233535679394",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Ghana",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Accra",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUYzb3EwTHhtSE1kNi8rWExpb0E3ZjdwdGpiKzd3NHU5V3pvUU5HK1dXRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1BpYXRpNkVJWXdsZVA2SWlkZ2lPdkRLWHVOVlVucFVkeThiLzQ1dnIyRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3T0Zia25lTVhlZGhZbXhBb1VDLzJTbmlTK3JjUkN1RTJWOWRaZitmazNZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3aWVsYmxQY253UGVheWJTcEJ0T29ObERYYTJ1YnZVUUwranFETnkwTlVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldIUzM1dHdpY3d4OGh0aW9DQ3hOMmptSEtURW1SMnY4SHRXeDdNQlRYM2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ill0ZUh5MkcxUlBwM1BvLzM3cjBWUC9pTHF5b1U5SytyZ0NhSExHMFFkRFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0trNkx1Q0hzaHY0ZDBsRUN4NEdpVWkza2VFS3YxZmZEK3VwY0FjR0FsST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVm1KR3lmbDI1TW5ucTY2T3Y4S1QzeXduUU1QemRTOUZDOTFmTm9rT1RBaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlI3SDhmNStnWFJXYnNwY0s1djQ4TUNPeFpXTmhjS2Y1ZzlmNXA5NEpoTWZSYUZlaUo5RzZkbExYcGVIcDZvR0l6cVQzU3RUbzVGMEdmOU1KaXZrU2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODcsImFkdlNlY3JldEtleSI6InpGSG9OalVBQzdja0I3QUQ4Rlp3Z1cxMlhvME5RclhyWVJ0UXRSNkc2YUk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkgyTlpWRlFZIiwibWUiOnsiaWQiOiIyMzM1MzU2NzkzOTQ6NTFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMTY1MjI5NjYwNjk0NTg6NTFAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLRHlodlFIRUpMaytMNEdHQk1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5c001YWxhT0VqcW5MQ2MwOUJOTjJZcmdjc3VxTTR3Rmg4alBBRlFZKzNBPSIsImFjY291bnRTaWduYXR1cmUiOiJzMHM3a1lxMlRGMXQyUDZ1cmhzNFIrc2ZzbDZ6bWl5Q29GT0Q5TmswaWJqRi9odXBRbXh5cXJ1TEUvUTY0WHBjNm02WmpRckY0RENYK09LaldaOUxDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNkplRlRyTWw0dTJEYWxpTUpzSU1IWXZka2ZSNnB0ZElyU0hmME5pWkRHMUxkUk9tajhiYkJRSzFqMjZtTFk0MEwrTXNkKzJtckwxTUluSmJLOWdoZ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1MzU2NzkzOTQ6NTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY3JET1dwV2poSTZweXduTlBRVFRkbUs0SExMcWpPTUJZZkl6d0JVR1B0dyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQyNjE1MDcxLCJsYXN0UHJvcEhhc2giOiIyRzRBbXUifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;