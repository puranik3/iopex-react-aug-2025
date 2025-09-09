## React (with TypeScript) Training
- React Training for iOpex (Online)
- Aug 11 - Sep 12 2025 (20 days, 2:00 - 5:00 PM)

## Exercises
- Workshops App Lab guide
    - __Aug 26__: Step 17: Creating and using a pagination component, communication from child to parent using a callback prop (function passed as a prop)

## Case study - Meetings App

### Project Progress Tracker
Please update this when you start and complete any task - https://docs.google.com/spreadsheets/d/1P9aS7mEUdq48UeLl6IGFR9VurIUXa7F5Rgfv6PN88Bk/edit?usp=sharing

### Understanding the API
Download the Postman collection on https://meetingsapp-isfg.onrender.com/ and import it in Postman app.  Use the API documentation to understand the API, and try to use the API.
1. First register yourself using the registration API.
```
POST https://meetingsapp-isfg.onrender.com/api/auth/register
```
Send the user details as raw JSON data in the following format (__Body__ -> __raw__ -> __json__)
```json
{
    "name": "Jonathan Doherthy",
    "email": "jonathan.doherthy@example.com",
    "password": "Password123#"
}
```
2. Then login to get an API token
```
POST https://meetingsapp-isfg.onrender.com/api/auth/login
```
Send the user details as raw JSON data in the following format
```json
{
    "email": "jonathan.doherthy@example.com",
    "password": "Password123#"
}
```
- Note down the __token__ that you get in the response. You need to add this in the __Authorization__ header in future requests.
3. To view the registered users in the application
```
GET https://meetingsapp-isfg.onrender.com/api/users
```
Make sure to add the __Authorization__ header (__Headers__ tab) with your token. For example,
```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InB1cmFuaWsyQGV4YW1wbGUuY29tIiwidXNlcklkIjoiNjhiYmQwMTNlMDhhZGMwMDYyOTAzNDU5IiwiaWF0IjoxNzU3MTM4OTc3LCJleHAiOjE3NTcyMjUzNzd9.eO2eqcZJ94QiUaUWvXMEXu4vk6_-1ZG_iSwE0WCGUw4
```
4. Now try creating a meeting
```
POST https://meetingsapp-isfg.onrender.com/api/meetings
```
Send the user details as raw JSON data in the following format
```json
{
    "name": "Google marketing campaign",
    "description": "Increasing brand awareness and spreading information about new products",
    "date": "2025-09-30",
    "startTime": {
        "hours": 9,
        "minutes": 0
    },
    "endTime": {
        "hours": 10,
        "minutes": 30
    },
    "attendees": [
        "dhoni@example.com",
        "kohli@example.com",
        "amitabh@example.com"
    ]
}
```
Make sure to add the __Authorization__ header (__Headers__ tab) with your token. For example,
```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InB1cmFuaWsyQGV4YW1wbGUuY29tIiwidXNlcklkIjoiNjhiYmQwMTNlMDhhZGMwMDYyOTAzNDU5IiwiaWF0IjoxNzU3MTM4OTc3LCJleHAiOjE3NTcyMjUzNzd9.eO2eqcZJ94QiUaUWvXMEXu4vk6_-1ZG_iSwE0WCGUw4
```
5. View your meetings for a day (__calendar__) - make sure to give a date where you have meetings scheduled.
```
POST https://meetingsapp-isfg.onrender.com/api/calendar?date=2025-09-30
```
- Do add the token in the __Authorization__ header
6. Go ahead and explore the rest of the APIs. You will need to understand what request type, request body and query string parameters to send (if any).
