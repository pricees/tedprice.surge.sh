#!/usr/bin/env node

const fs = require('fs');
const moment = require('moment');
const program = require('commander');
const postsDirName = "content/posts/";

program
    .parse(process.argv);

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

const dirName = process.argv[2];
const currentDate = moment().format();
const fileName = `${postsDirName}${currentDate.slice(0,10)}---${dirName}`;
const title = dirName.split('-');

fs.writeFileSync(`${fileName}.md`,
    `---\ntitle: "${title.join(' ')}"\ndate: "${currentDate}"\ntemplate: "post"\ndraft: false\nslug: "${dirName.toLowerCase()}"\ncategory: "CATEGORY"\ntags:\n  - TAG\ndescription: "DESCRIPTION"\n---`, (err) => {
        if (err) throw err;
    })
