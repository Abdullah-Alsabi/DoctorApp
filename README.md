[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)
![Misk Logo](https://i.ibb.co/KmXhJbm/Webp-net-resizeimage-1.png)


# Create a Doctor App 

## Exercise

We'll build this back-end app in a group.

### Step 1 (Spring Boot)

Today, you'll just set up your app using https://start.spring.io/, as we did in the lesson earlier. Give it a name that suggests it's a Doctor app.

- Create a REST controller.
- Create a `/home` endpoint that returns a `'Welcome to the Doctor App'` string.
- Use Postman to test the API.

### Step 2 (Spring Profile)

In the next step, you'll use Spring Profile to create a development-specific environment in your app. This is where all of your environment-specific configuration will go.

### Step 3 (Spring Data)

Your app will have  two data models: `Doctor` and `Appointment`. You'll use MySQL as your database and Spring Data to talk to your database.

#### Step 4

In this step, you'll only create a `Doctor` model. 

- The `Doctor` should have at least two fields: `name` , `specialty` and `picture`.
- Create APIs to update and delete.

#### Step 5

In the next step, you'll add the `Appointment` model and map it with `Doctor`.

- The `Appointment` table should have at least two columns: `date`, `patientName`, and `reasonForAppointment`.
- The `Doctor` and `Appointment` tables should be mapped to each other.
- A user can add and delete a Appointment.
- A user should be able to view all of the Appointments added


**Again, the mapping between the `Doctor` and `Appointment` models is one-to-many mapping.** 


### Bonus

1- Add authentication

2- Use uploading files to uplaod an image from your Computer for `Doctor` Picture. This link might be helpful [Uploading Files](https://spring.io/guides/gs/uploading-files/)
