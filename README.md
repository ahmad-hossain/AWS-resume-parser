# AWS Resume Parser

A PDF Resume Parser and Search System meant to simulate what a recruiter would use to search for candidates

This project is a fork of [github.com/ahmad-hossain/resume-parser](https://github.com/ahmad-hossain/resume-parser) that uses AWS services to host the app and parse & store data rather than using an Express.js backend.

## Gif Walkthrough
<img src="https://github.com/ahmad-hossain/AWS-resume-parser/blob/main/walkthrough.gif" width=800><br>

## Description

This is a full-stack project that parses Resume PDF files and displays a dashboard allowing a user to search for keywords. Doing so will populate a list of all candidates whos Resume contained the keyword.

* Natural Language Processing to find the resume owner's name
* Regex is used to determine the resume owner's email and phone

The following AWS Services are used in this project:
* **Amplify**: Used to host the React app
* **S3**: Stores the resume pdf files
* **DynamoDB**: Stores metadata about each resume, including the users name, phone, email, and the name of the respective resume file in S3
* **Lambda**: Used to handle the upload-resume & search-resumes events
* **API Gateway**: Exposes the upload & search lambdas as a RESTful API to frontend clients

## What I Learned
* I gained hands-on experience with AWS Amplify, S3, DynamoDB, Lambda, and API Gateway as this was my 1st time using these services.
* I used Bootstrap for the first time. I have used Material-UI before, so this was a bit similar. I wanted to try out something new, so I went with Bootstrap.
* I found a very interesting [npm package](https://www.npmjs.com/package/compromise) for Natural Text Processing, which I used to find out what the resume owner's name is. This library has a very extensive and interesting API, so I may end up using it in the future as well.

## Getting Started

### Installing

1. Run `npm install` from the root of the project to install all dependencies

### Executing program

* Start the front-end by running `npm start` from the root directory of the project

## User Guide

1. Upload your PDF resume by clicking the **Browse** button, then selecting your resume.
2. Click the **Upload** button to upload your resume to the backend.
3. Search for any keywords in the input-field, then click **Search**. Any uploaded resumes that had the keyword will show up in the list, displaying the owner's **name**, **email**, **phone number**, and a link to **Download the Resume**
