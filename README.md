# Resume Parser

A PDF Resume Parser and Search System meant to simulate what a recruiter would use to search for candidates

## Description

This is a full-stack project that parses Resume PDF files and displays a dashboard allowing a user to search for keywords. Doing so will populate a list of all candidates whos Resume contained the keyword.

* Natural Language Processing to find the resume owner's name
* Regex is used to determine the resume owner's email and phone

## What I Learned
* I used Bootstrap for the first time. I have used Material-UI before, so this was a bit similar. I wanted to try out something new, so I went with Bootstrap.
* I found a very interesting [npm package](https://www.npmjs.com/package/compromise) for Natural Text Processing, which I used to find out what the resume owner's name is. This library has a very extensive and interesting API, so I may end up using it in the future as well.

## Getting Started

### Installing

1. Run `npm install` from the root of the project to install all dependencies
2. Run the same command while in the **backend** directory

### Executing program

* Start the front-end by running `npm start` from the root directory of the project
* Start the backend by entering the **backend** directory and running `node index.js`

## User Guide

1. Upload your PDF resume by clicking the **Browse** button, then selecting your resume.
2. Click the **Upload** button to upload your resume to the backend.
3. Search for any keywords in the input-field, then click **Search**. Any uploaded resumes that had the keyword will show up in the list, displaying the owner's **name**, **email**, **phone number**, and a link to **Download the Resume**,# aws-resume-parser
