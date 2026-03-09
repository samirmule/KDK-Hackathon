const SHEET_NAME = "Sheet1";

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);

  // REGISTER USER
  if (data.action === "register") {

    const rows = sheet.getDataRange().getValues();

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === data.email) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Email already registered"
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    sheet.appendRow([
      data.name,
      data.email,
      data.password,
      "", "", "", "", "", ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success"
    })).setMimeType(ContentService.MimeType.JSON);
  }


  // LOGIN USER
  if (data.action === "login") {

    const rows = sheet.getDataRange().getValues();

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === data.email && rows[i][2] === data.password) {

        return ContentService.createTextOutput(JSON.stringify({
          status: "success",
          user: {
            name: rows[i][0],
            email: rows[i][1]
          }
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Invalid email or password"
    })).setMimeType(ContentService.MimeType.JSON);
  }


  // SAVE FAQ DATA
  if (data.action === "faq") {

    sheet.appendRow([
      data.businessName,
      data.email,
      "",
      data.type,
      data.services,
      data.location,
      data.hours,
      data.delivery
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success"
    })).setMimeType(ContentService.MimeType.JSON);
  }

}
