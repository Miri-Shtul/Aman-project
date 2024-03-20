# COVID-Tracking System

## Overview
The COVID-Tracking System is a FullStack application designed to manage and track COVID-19 data within a health fund.
It provides comprehensive management of member records, vaccination details, and COVID-19 case information.
The system is built with a focus on reliability, user-friendliness, and data accuracy,
serving as a crucial tool for health fund administrators to monitor and manage the pandemic's impact on their members.

## Screen shots
- View Members list : ![Alt text](https://github.com/Miri-Shtul/Aman-project/blob/main/MemberEdit.png)

- Vieww/Edit member details : ![Alt text](https://github.com/Miri-Shtul/Aman-project/blob/main/MemberEdit.png)

- Add new member : ![Alt text](https://github.com/Miri-Shtul/Aman-project/blob/main/AddNewMember.png)

- Statistics :![Alt text](https://github.com/Miri-Shtul/Aman-project/blob/main/Statistics.png)

## Features
* Member Management: Add, update, and delete member information, including personal details and contact information.
* Vaccination Tracking: Record and update vaccination details for each member, including dates and vaccine types.
* COVID-19 Case Tracking: Log and monitor COVID-19 cases, including positive test dates and recovery dates.
* Statistical Analysis: View real-time statistics on active COVID-19 cases, vaccination rates, and more.
* Search and Filter: Efficiently search and filter through members, vaccination records, and COVID-19 cases to quickly find necessary information.

## Technologies Used
- Backend: ASP.NET Core, Entity Framework Core
- Frontend: React, Chart.js, Bootstrap
- Database: SQL Server
- API Documentation: Swagger/OpenAPI

## Getting Started
* Prerequisites
* .NET 5.0 or later
* Node.js 12.0 or later
* A compatible SQL database

## Installation
Clone the repository : git clone https://github.com/Miri-Shtul/Aman-project.git

After cloning, navigate to the project directory:cd Aman-project

### Setting Up the Backend
Open the backend project (WebApi directory ) in Visual Studio or your preferred IDE.

Ensure the database connection string in appsettings.json is correctly set up for your environment.

If using Entity Framework, update the database to the latest migration by executing:dotnet ef database update

Run the backend server by starting the project in Visual Studio or using the dotnet run command from the terminal within the project directory.

### Setting Up the Frontend
Navigate to the ClientApp directory (or where your React app is located) from the terminal.
Install the necessary npm packages: npm install
Start the frontend application: npm start

### Usage
Access the application through a web browser at http://localhost:3000 for the frontend and http://localhost:7022 for the backend API.

## Documentation
The API is fully documented with Swagger and can be accessed at https://localhost:7022/swagger/index.html.

Detailed API documentation and usage instructions are provided within the Swagger UI.

You can see the full endpoint documentation here https://github.com/Miri-Shtul/Aman-project/blob/main/%231/Covid%20Tracking.pdf

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests with your enhancements.

For major changes, please open an issue first to discuss what you would like to change.

## License
MIT

## Contact
For support or further information, please contact [@Miri-Shtul](https://github.com/Miri-Shtul)

  
