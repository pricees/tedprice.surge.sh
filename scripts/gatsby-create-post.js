#!/usr/bin/env node

const fs = require('fs');
const moment = require('moment');
const program = require('commander');
const postsDirName = "content/posts/";

program.parse(process.argv);

if (process.argv.length < 3) {
    console.log('Please enter the title of the article.');
    process.exit(1);
}

fs.exists(postsDirName, (exists) => {
    if (!exists) {
      console.log('Please run the command under the blog root directory');
      process.exit(1);
    }
});

const currentDate = moment().format();
const title = process.argv.slice(2).join(' ');
const dirName = process.argv.slice(2).join("-").toLowerCase();;
const fileName = `${postsDirName}${currentDate.slice(0,10)}---${dirName}`;

fs.writeFileSync(`${fileName}.md`,
    `---\ntitle: "${title}"\ndate: "${currentDate}"\ntemplate: "post"\ndraft: false\nslug: "${dirName}"\ncategory: "CATEGORY"\ntags:\n  - TAG\ndescription: "DESCRIPTION"\n---`, (err) => {
        if (err) throw err;
    })
