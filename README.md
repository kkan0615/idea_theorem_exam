# Idea Theorem Full Stack Developer Exam

## Work environment Versions
| key   | version  |
|-------|----------|
| node  | v18.12.1 |
| react | v18.2.0  |
| npm   | v8.19.1  |

## Commands
### Install dependencies
```shell
npm install
```

### Start app with development
```shell
npm run dev
```

### Build app
```shell
npm run build
```

## File paths
```text
├─ dist/                                 # Build output
├─ node_modules/                         # Modules
├─ public/                               # Public Assets
├─ src/                                  # Work place for react
│   ├─ components/                       # Components
│   ├─ types/                            # Types (Interfaces, Types, Constrains)
│   ├─   ├─ models/                      # Model types
│   ├─ App.css/                          # App page css
│   ├─ App.tsx/                          # App ("/") page
│   ├─ index.css/                        # Global css file
│   └─ main.tsx                          # React main.tsx
├─ .eslint.cjs/                          # Eslint config
├─ .index.html                           # index.html
├─ .package.json                         # package.json
├─ .package-lock.json                    # npm lock file
├─ .postcss.config.json                  # postcss config file
├─ README.md                             # README.md, intruction file
├─ .tailwind.config.cjs                  # tailwind config file
├─ .tsconfig.json                        # Typescript config file
├─ .tsconfig.node.json                   # Typescript node config file
└── vite.config.ts                       # Vite config file
```

## Packages
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework packed with classes
- [flowbite](https://flowbite.com/): Build websites even faster with components on top of Tailwind CSS
- [axios](https://www.npmjs.com/package/axios): HTTP request
- [react-icons](https://react-icons.github.io/react-icons/): popular icons collection
- [zod](https://zod.dev/): TypeScript-first schema validation with static type inference
- [react-hook-form](https://react-hook-form.com/): Performant, flexible and extensible forms with easy-to-use validation.

## Files
### Design
[Figma](https://www.figma.com/file/hi5v3c3hE0ax8pbppUA1xY/Account-Creation-Test)

## Task Description
The task focuses on form validation, page responsiveness, and API request. Applicants must create a web page following the webpage design provided in Figma. All the assets and the guidelines are available in Figma.
Task Description:

Create a simple registration page using any Javascript framework (preferably ReactJS). Feel free to use any validation libraries, http request libraries, CSS libraries or any other library you feel necessary.

The form should validate full_name, contact_number, email, date_of_birth, password, and confirm_password fields. If the user presses the “submit” button, the form should validate, and the error messages should appear accordingly. 
The submit button should send an API call to the following route https://fullstack-test-navy.vercel.app/api/users/create

The API route will return either success or failure messages. The messages should appear to the user on the alert message component, and the colors should change according to the status returned.

### API description:
Success: If full_name, contact_number, email, date_of_birth, and password are present, the API will return a success message containing the title and description.

NOTE: The date_of_birth is a concatenation of day, month, and year dropdown values.

Error:  If the following full_name, contact_number, email, date_of_birth, and password are missing, the API will return an error message containing the title and description.

### Form validation
- full_name: Not empty, no symbols, no spaces around. <br>
- contact_number: Not empty, Canadian phone number format <br>
- email: Not empty, email format <br>
- day: Not empty, calendar days <br>
- month: Not empty, Jan - Dec. <br>
- year: Not empty, any future date. <br>
- password:
  1. Not empty.
  2. Lower case (a-z), upper case (A-Z) and numbers (0-9).
  3. Must have 8 characters in length
- confirm_password: Must to be the same as the password field
