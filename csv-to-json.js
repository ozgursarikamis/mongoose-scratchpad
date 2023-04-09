const csvFilePath = './AllCompanyNames.csv';

require('csvtojson').csv().fromFile(csvFilePath).then((jsonObj => {
  let wholeList = jsonObj.map((company) => {
    const companyIncorporationDate = company.IncorporationDate.split('/');
    const parsedDate = new Date(
      companyIncorporationDate[2],
      companyIncorporationDate[1] - 1,
      companyIncorporationDate[0]
    );
    return {
      Name: company.CompanyName.trim() ?? null,
      IncorporationDate: new Date(parsedDate.toISOString()) ?? null,
      SIC: Number(company.SIC) ? +company.SIC : null
    };
  });

  const fs = require('fs');

  fs.writeFile('AllCompanyNames.json', JSON.stringify(wholeList), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('File written successfully\n');
    }
  });
}));