# Getting Started with SportSee Projet

## Prerequisites

- [NodeJS (**version 12.18**)](https://nodejs.org/en/)

## Installation

- Clone the front repository with `git clone https://github.com/AwiZy63/FlanquartBastien_Projet12_OCR`

- Clone the back repository with `git clone https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard`

- Goto the React App directory, open new PowerShell in there and type : `npm install`

- Same for the back-end App, goto the back-end directory, open new PowerShell in there and type : `npm install`

## Start projects

- In first time, in your back-end powershell, type : `npm start`
- In the React App Directory, you can type in your powershell : `npm start`

## Render

- If you want to view your React application in web, you can go at `http://localhost:3001` or `http://localhost:3000` (if you haven't start your API)

## Example URI

You can test the website display using the id **12** (http://localhost:3000/12 or http://localhost:3001/12 (if you're using API) )

## Mocked/API usage

You can turn on/off or set auto the API response detection in the /src/services/ApiHandler.service.js.

- You have to change the `this.useMockedApi = /* true / false / 'auto' */;` at line 16.
