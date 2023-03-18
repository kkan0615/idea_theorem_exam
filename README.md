# Idea Theorem Full Stack Developer Exam

### Install
```shell
npm install
```

### Dev
```shell
npm run dev
```

### Production
```shell
npm run build
```

## Packages
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework packed with classes
- [flowbite](https://flowbite.com/): Build websites even faster with components on top of Tailwind CSS
- [axios](https://www.npmjs.com/package/axios)
- [react-icons](https://react-icons.github.io/react-icons/): popular icons collection

## Files
[Figma](https://www.figma.com/file/hi5v3c3hE0ax8pbppUA1xY/Account-Creation-Test)

## Task Description
The task focuses on form validation, page responsiveness, and API request. Applicants must create a web page following the webpage design provided in Figma. All the assets and the guidelines are available in Figma.



Task Description:

Create a simple registration page using any Javascript framework (preferably ReactJS). Feel free to use any validation libraries, http request libraries, CSS libraries or any other library you feel necessary.



The form should validate full_name, contact_number, email, date_of_birth, password, and confirm_password fields. If the user presses the “submit” button, the form should validate, and the error messages should appear accordingly. 
The submit button should send an API call to the following route https://fullstack-test-navy.vercel.app/api/users/create

The API route will return either success or failure messages. The messages should appear to the user on the alert message component, and the colors should change according to the status returned.



API description:



Success: If full_name, contact_number, email, date_of_birth, and password are present, the API will return a success message containing the title and description.



NOTE: The date_of_birth is a concatenation of day, month, and year dropdown values.



Error:  If the following full_name, contact_number, email, date_of_birth, and password are missing, the API will return an error message containing the title and description.



Form validation:



full_name: Not empty, no symbols, no spaces around.

contact_number: Not empty, Canadian phone number format

email: Not empty, email format

day: Not empty, calendar days

month: Not empty, Jan - Dec.

year: Not empty, any future date.

password:

1- Not empty.

2- Lower case (a-z), upper case (A-Z) and numbers (0-9).

3- Must have 8 characters in length

confirm_password: Must to be the same as the password field
