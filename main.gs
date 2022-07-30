function sendMail() {
  const userName = 'UserName';  // github UserName
  const url = `https://api.github.com/users/${userName}/repos?sort=pushed`;

  try {
    const res = UrlFetchApp.fetch(url).getContentText();
    Logger.log(res);

    const jsonData = JSON.parse(res);  // convert res to JSON
    const uploadDay = new Date(jsonData[0].pushed_at).getDay(); // Last upload day
    const today = new Date().getDay(); // today

    if(uploadDay !== today){
      Logger.log("No upload today");

      const recipient = 'exsample.com';  // recpient mailAdress
      const subject = 'Github更新の件について';      //　subject
      const body = `${userName}様\n`
        + '\n本日のGithub更新がされていません\n';      // main message
      const options = {noReply: true};             // not response option

      GmailApp.sendEmail(recipient, subject, body, options); // sendMail
    }else{
      Logger.log("OK");
    }
  } catch(e) {
    // Error Message
    Logger.log('Error:')
    Logger.log(e)
  }
}
