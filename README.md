# Agile Star Squad Clinic

## Table of Contents

1. [ Motivation. ](#motivation)
2. [ Build Status. ](#build-status)
3. [ Code Style. ](#code-style)
4. [ Technologies Used. ](#technology)
5. [ Features. ](#features)
6. [ API Refrences. ](#api-ref)
7. [ Tests. ](#tests)
8. [ Usage. ](#usage)
9. [ Contribution. ](#contribution)
10. [ Contributors. ](#collabs)
11. [ Credits. ](#credits)
12. [ Licenses. ](#licenses)

<a name="motivation"></a>

## Motivation

The Clinic Website is a comprehensive web application designed for healthcare providers and patients. This website provides a user-friendly interface for users to explore, book appointments, view available services, and access detailed information about healthcare professionals and facilities. Whether you're a patient seeking medical assistance or a healthcare provider looking to streamline your services, this website is your ultimate platform for efficient healthcare management and access.

<a name="build-status"></a>

## Build Status

1. Family discounts is not yet incorporated.
2. Doctor wallet
3. Doctor can not view details of requested appointments
4. Doctor can not reschedule or cancel appointments

<a name="code-style"></a>

## Code Style

- The project is divided into 2 main folders the backend and the frontend.
  1. Backend
    - The backend is divided into models, controllers, routes, utils & middleware.
  2. Frontend
    - The frontend is divided into src & public.
    - The src is divided into assets, admin, checkout, doctor, login, package, patient, prescriptions, requests, shared, temp & user-store
  3. Each of the leaf folders mentioned above contains the main files of the project.

<a name="screenshots"></a>

## Technologies Used

- **React**: This project uses React, a JavaScript library for building user interfaces. React's component-based architecture makes it easy to create complex UIs from small, reusable pieces of code. It also provides a virtual DOM to optimize rendering and improve app performance.

- **Node.js and Express**: The backend of this project is built with Node.js, a JavaScript runtime that allows for server-side scripting. Express, a web application framework for Node.js, is used to build the web server and handle HTTP requests.

- **MongoDB and Mongoose**: MongoDB, a NoSQL database, is used to store data in a flexible, JSON-like format. Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It provides a straightforward, schema-based solution to model application data.

- **JWT for Authentication**: JSON Web Tokens (JWT) are used for securely transmitting information between parties as a JSON object. In this project, JWT is used for handling user authentication and protecting routes.

- **Bootstrap and CSS**: Bootstrap, a popular CSS framework, is used for designing responsive and mobile-first web pages. Custom CSS is also used for additional styling and layout design.

- **Material-UI (MUI)**: This project uses Material-UI, a popular React UI framework that implements Google's Material Design. It provides a set of pre-built React components that follow the best practices of user interface design. With MUI, you can build robust, consistent, and beautiful user interfaces with less effort.

- **Video SDK**: This was used to facilitate video appointments between doctors and patients. It provided the necessary tools to establish a secure and reliable video connection, ensuring a smooth and efficient consultation process.

<a name="features"></a>

## Features

### 1. Patient Management:
- Register new patients with personal, contact, and medical details.
- Update patient information as needed.
- View a list of all registered patients.

### 2. Appointment Scheduling:
- Patients can book appointments with available doctors.
- View and manage upcoming and past appointments.
- Doctors can view their appointment schedule.

### 3. Doctor Directory:
- View a list of all available doctors.
- Access detailed profiles of doctors, including their specialization, experience, and available slots.

### 4. Medical Records:
- Access and manage patient medical records.
- Add new entries to a patient's medical history.

### 5. User Authentication:
- Secure login system for patients and doctors.
- Role-based access control to protect sensitive information.

<a name="code-examples"></a>


## API Refrences

### Admin Routes

- **GET /api/admin**: Get a list of all admins.

- **POST /api/admin**: Create a new admin. The request body should include the necessary admin details.

- **GET /api/admin/requests**: View all admin requests.

- **POST /api/admin/requests**: Accept an admin request. The request body should include the necessary request details.

- **PUT /api/admin/requests**: Reject an admin request. The request body should include the necessary request details.

- **PATCH /api/admin/requests**: Also used to reject an admin request. The request body should include the necessary request details.

- **GET /api/admin/:id**: Get details of a specific admin by ID.

- **DELETE /api/admin/:id**: Delete a specific admin by ID.

### Auth Routes

- **GET /api/auth/resetPassword**: Get an OTP for password reset.

- **GET /api/auth/resetPassword/:email**: Get a user by email for password reset.

- **POST /api/auth/resetPassword/:email**: Request a password reset. The request body should include the necessary user details.

- **PATCH /api/auth/resetPassword/:id**: Update the password for a user. The request body should include the new password.

- **GET /api/auth/:username/:password**: Log in a user. Replace `:username` and `:password` with the user's username and password.

- **GET /api/auth/logout**: Log out the current user.

- **GET /api/auth/me**: Get the currently logged in user.

### Doctor Routes

- **GET /api/doctor/chats/:id/:chatId**: Add a chat for a doctor.

- **GET /api/doctor/appointments**: Get all appointments for a doctor.

- **POST /api/doctor/appointments**: Create a new appointment for a doctor.

- **GET /api/doctor/**: Get all doctors.

- **POST /api/doctor/**: Sign up a new doctor.

- **GET /api/doctor/:doctorId/setAsMember**: Set a doctor as a member.

- **GET /api/doctor/:doctorId/patients**: Get all patients for a doctor.

- **POST /api/doctor/:doctorId/patients**: Add a patient for a doctor.

- **GET /api/doctor/:id/patient**: Get a specific patient for a doctor.

- **POST /api/doctor/:doctorId/timeSlots**: Set time slots for a doctor.

- **GET /api/doctor/:doctorId/upComingAppointments**: Get upcoming appointments for a doctor.

- **DELETE /api/doctor/:doctorId/notifications/:notificationId**: Delete a specific notification for a doctor.

- **GET /api/doctor/:doctorId/notifications**: Get all notifications for a doctor.

- **GET /api/doctor/:id**: Get a specific doctor.

- **PATCH /api/doctor/:id**: Update a specific doctor.

- **DELETE /api/doctor/:id**: Delete a specific doctor.

- **GET /api/doctor/healthRecord/:patientId**: Get the health record of a specific patient for a doctor.

- **PATCH /api/doctor/healthRecord/:patientId**: Add a health record for a specific patient for a doctor.

- **POST /api/doctor/:doctorId/wallet**: Update the wallet for a doctor.

### Meeting Routes

- **POST /api/meeting**: Add a new meeting. The request body should include the necessary meeting details.

- **GET /api/meeting**: Get the meeting details.

- **DELETE /api/meeting**: Delete the meeting.

- **PATCH /api/meeting**: Update the meeting details. The request body should include the updated meeting details.

### Package Routes

- **GET /api/package**: Get all packages. This route requires patient authentication.

- **POST /api/package**: Add a new package. This route requires admin authentication. The request body should include the necessary package details.

- **GET /api/package/:id**: Get a specific package.

- **PATCH /api/package/:id**: Edit a specific package. This route requires admin authentication. The request body should include the updated package details.

- **DELETE /api/package/:id**: Delete a specific package. This route requires admin authentication.

### Patient Routes

- **GET /api/patient/appointments**: Get all appointments.

- **POST /api/patient/appointments**: Create a new appointment. This route requires patient authentication.

- **DELETE /api/patient/appointments/:id**: Delete a specific appointment.

- **PATCH /api/patient/appointments/:id**: Update a specific appointment.

- **GET /api/patient/:patientId/familyMembers**: Get all family members of a patient. This route requires patient authentication.

- **POST /api/patient/:patientId/familyMembers**: Add a family member for a patient. This route requires patient authentication.

- **DELETE /api/patient/:patientId/familyMembers/:id**: Remove a specific family member of a patient. This route requires patient authentication.

- **GET /api/patient**: Get all patients.

- **POST /api/patient**: Sign up a new patient.

- **POST /api/patient/:patientId/package**: Subscribe a patient to a package.

- **PATCH /api/patient/:patientId/package**: Unsubscribe a patient from a package.

- **GET /api/patient/:id**: Get a specific patient.

- **PATCH /api/patient/:id**: Add a health record for a patient. This route requires admin authentication.

- **DELETE /api/patient/:id**: Remove a specific patient. This route requires admin authentication.

- **POST /api/patient/:id/kimoSubscribe**: Subscribe a patient to Kimo.

- **GET /api/patient/getByNationalId/:nationalId**: Get a patient by their national ID. This route requires patient authentication.

- **PATCH /api/patient/:id/setHealthRecords**: Remove a health record of a patient.

- **GET /api/patient/:patientId/prescriptions**: Get all prescriptions of a patient. This route requires patient authentication.

- **GET /api/patient/prescriptions/:username**: Get all prescriptions of a patient by their username. This route requires patient authentication.

- **GET /api/patient/:patientId/appointments**: Get all appointments of a patient.

- **POST /api/patient/:patientId/appointments**: Schedule a follow-up for a patient.

- **GET /api/patient/:patientId/upcomingAppointments**: Get all upcoming appointments of a patient.

- **DELETE /api/patient/:patientId/notifications/:notificationId**: Delete a specific notification of a patient. This route requires patient authentication.

- **GET /api/patient/:patientId/notifications**: Get all notifications of a patient. This route requires patient authentication.

- **POST /api/patient/:patientId/wallet**: Update the wallet of a patient.

- **GET /api/patient/:patientId/chats**: Get all chat IDs of a patient. This route requires patient authentication.

- **GET /api/patient/:doctorId/doctorUpcomingAppointments**: Get all upcoming appointments of a doctor. This route requires patient authentication.

- **POST /api/patient/:patientId/cards**: Add a card for a patient.

- **DELETE /api/patient/:patientId/cards/:cardNumber**: Delete a specific card of a patient.

### Payment Routes

- **POST /api/payment/create-checkout-session**: Create a new checkout session. The request body should include the necessary payment details.

### Prescription Routes

- **GET /api/prescription**: Get all prescriptions.

- **POST /api/prescription**: Create a new prescription. This route requires doctor authentication.

- **POST /api/prescription/list**: Get prescriptions by their IDs. The request body should include the necessary IDs.

- **PATCH /api/prescription/:id**: Edit a specific prescription.



<a name="tests"></a>

## Tests

To test the API locally, you can use a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/). The API runs on `http://localhost:3000` by default.

Here are some examples of how to test the different endpoints:

**Postman**

- Get all patients
```
GET: http://localhost:3000/patients 
```
- Signup as a patient
```
POST: http://localhost:3000/patients
```
- Add health record to patient
```
PATCH: http://localhost:3000/endpoint/:id
```
- Delete patient
```
DELETE: http://localhost:3000/endpoint/:id
```

  **curl**
- Get all patients
```bash
curl http://localhost:3000/patients
```
- Signup as a patient
```bash
curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' http://
localhost:3000/patients
```
- Add health record to patient
```bash
curl -X PATCH -H "Content-Type: application/json" -d '{"key":"value"}' http://localhost:3000/patients/:id
```
- Delete patient
```bash
curl -X DELETE http://localhost:3000/patients/:id
```


<a name="usage"></a>

## How to Use the Website

1. **Home Page**: When you first visit the website, you'll land on the home page. Here, you can learn more about the clinic and the services it offers.

<img src="https://i.ibb.co/yqTTVrS/patient-Home-Page.png" alt="patient-Home-Page" border="0">

2. **Registration**: If you're a new user, navigate to the "Register" page to create an account. You'll need to provide some basic information like your name, email address, and password.

<img src="https://i.ibb.co/4J1Sc50/regPage.png" alt="regPage" border="0">

- Patient Registration

<img src="https://i.ibb.co/Xjj9q47/patient-Reg.png" alt="patient-Reg" border="0">

- Doctor Registration Request

<img src="https://i.ibb.co/S69NqqM/doctor-Reg.png" alt="doctor-Reg" border="0">

3. **Login**: If you already have an account, click on the "Login" button on the top right of the page. Enter your email address and password to log in.

<img src="https://i.ibb.co/4RpDJr0/login.png" alt="login" border="0">

4. **Booking Appointments**: Once logged in, you can book an appointment by navigating to the "Book Appointment" page. Select a doctor, choose a date and time, and click "Book Appointment".

<img src="https://i.ibb.co/N66bT1Q/bookApp.png" alt="bookApp" border="0">

5. **Viewing Appointments**: To view your upcoming appointments, go to the "My Appointments" page. Here, you can also cancel appointments if necessary.

<img src="https://i.ibb.co/HYgsKM5/apps.png" alt="apps" border="0">

6. **Doctor Directory**: To view a list of all available doctors, navigate to the "Doctors" page. You can view detailed profiles of each doctor, including their specialization, experience, and available slots.

<img src="https://i.ibb.co/nQG8M7y/doctors.png" alt="doctors" border="0">

7. **Medical Records**: If you're a patient, you can view your medical records by going to the "My Medical Records" page. Here, you can also add new entries to your medical history.

<img src="https://i.ibb.co/f12M5Fr/medical-Records.png" alt="medical-Records" border="0">

8. **Video Call**: After booking an appointment, you can have a video call with the doctor. This feature is available on the "Patient Home" page. Make sure you have a stable internet connection for the best experience.

<img src="https://i.ibb.co/qsTVs8P/meeting.png" alt="meeting" border="0">

9. **Chat**: Once you have started an appointment, you can chat with the doctor through the "Chat" feature available on the "My Appointments" page.

<img src="https://i.ibb.co/WyVsVDY/chat.png" alt="chat" border="0">

Remember to log out when you're done using the website to ensure your account remains secure.


<a name="contribution"></a>

## Contribution and Installation Guidelines

If you're a developer interested in contributing to the project, you can install it locally and make contributions by following these steps:

1. Fork the repository.
2. Clone your forked repository to your local machine.
3. Open two terminals.
4. In the first terminal, navigate to the backend directory of the project by running `cd backend`. This is where the backend code resides.
5. Run `npm install` to install the necessary backend dependencies.
6. Run `npm start` to start the backend server.
7. In the second terminal, navigate to the frontend directory of the project by running `cd frontend`. This is where the frontend code resides.
8. Run `npm install` to install the necessary frontend dependencies.
9. Run `npm start` to start the frontend development server.
10. Create a new branch for your changes.
11. Make your changes in your branch.
12. Submit a pull request with a detailed description of your changes.

We welcome contributions from the community. Please ensure that your pull request provides a detailed description of the changes you propose.

<a name="collabs"></a>

## Contributors 

<div style="display: flex;">

  <a href="https://github.com/youssef-mostafa25" style="margin-right: 20px;">
    <img src="https://github.com/youssef-mostafa25.png" width="100" height="100" alt="Youssef Hossam" style="border-radius: 50%;">
  </a>
  
  <a href="https://github.com/shampooeyes" style="margin-right: 20px;">
  <img src="https://avatars.githubusercontent.com/u/73359211?s=400&u=ed28dd86a82ce49bc138e8a1d24ffa3bf609646d&v=4" width="100" height="100" alt="Kareem El Kadery" style="border-radius: 50%;"/>

  <a href="https://github.com/Habibaelkabbany" style="margin-right: 20px;">
  <img src="https://github.com/Habibaelkabbany.png" width="100" height="100" alt="Habiba El Kabbany" style="border-radius: 50%;">
  </a>
  

<a href="https://github.com/Assem-Mohamed" style="margin-right: 20px;">
  <img src="https://github.com/Assem-Mohamed.png" width="100" height="100" alt="Assem Mohamed" style="border-radius: 50%;">
  </a >
  
  <a href="https://github.com/mariiamemad" style="margin-right: 20px;">
  <img src="https://github.com/mariiamemad.png" width="100" height="100" alt="Mariam Emad" style="border-radius: 50%;">
  </a >
</div>

<div style="display: flex;">

  <a href="https://github.com/Lasheen2001" style="margin-right: 20px;">
  <img src="https://github.com/Lasheen2001.png" width="100" height="100" alt="Ahmed Lasheen" style="border-radius: 50%;">
  </a >

  <a href="https://github.com/BigMizo" style="margin-right: 20px;">
  <img src="https://github.com/BigMizo.png" width="100" height="100" alt="Ahmed Lasheen" style="border-radius: 50%;">
  </a >
      
  <a href="https://github.com/mariaamashraaf" style="margin-right: 20px;">
  <img src="https://github.com/mariaamashraaf.png" width="100" height="100" alt="Ahmed Lasheen" style="border-radius: 50%;">
  </a >

  <a href="https://github.com/Ahmedmedhat220" style="margin-right: 20px;">
  <img src="https://github.com/Ahmedmedhat220.png" width="100" height="100" alt="Ahmed Lasheen" style="border-radius: 50%;">
  </a >

  <a href="https://github.com/AhmedMosad0" style="margin-right: 20px;">
  <img src="https://github.com/AhmedMosad0.png" width="100" height="100" alt="Ahmed Lasheen" style="border-radius: 50%;">
  </a >

</div>


<a name="credits"></a>

## Credits

This project was made possible with help from the following resources:

- [Code Ninja YouTube Channel](https://www.youtube.com/channel/UCStj-ORBZ7TGK1FwtGAUgbQ)
- [StackOverflow](https://stackoverflow.com/)
- [GitHub Copilot](https://copilot.github.com/)
- [ChatGPT](https://www.openai.com/chatgpt/)

<a name="licenses"></a>

## Licenses

[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
