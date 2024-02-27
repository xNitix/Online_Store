# Online Store

## Online Store website created for Introduction to Web Applications course (WDAI) at AGH 2023/24
## Technologies used:
- JavaScript
- CSS
- Vite
- React
- Python with Flask framework

# Home page
The online store is a website that allows you to sell and offer purchases of digital dinosaurs for the ARK game.

![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/116287668/10147770-335c-4eae-8ab5-e322b14d48b6)

# Shop

As an unlogged user, you can browse the store offer and use the filter option to select a dinosaur by gender, type and name.

![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/116287668/49074955-5810-4ec3-b125-260839dd1b7d)

# Sing in/ Sing up
To access additional options on the site, signing in is required. This restriction is due to using tokens in Flask, which are pivotal in the authorization process.

There are 3 different types of accounts:

- admin
- customer
- not logged in
  
You can create a new customer account or sign in using this data:

|    Login   |  Password  |   User   |
|------------|------------|----------|
|     aaa    |     aaa    |   admin  |
|     bbb    |     bbb    | customer |

![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/116287668/bb800308-76e9-4826-85e1-730c14214887)


![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/116287668/db8c1530-cdfd-4cad-969a-ecb71b8440d4)

# Logged in as a customer 

- Adding to cart

![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/126980175/491a3b88-1bf4-400b-9e64-c2ebe5f18d49)

- Cart - with remove and checkout options

![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/126980175/b4a1e87d-c405-420e-80cc-d2b0629902bb)

# Logged in as admin

- List of users - with an option to promote normal users to admin

  ![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/126980175/eab26a4e-6024-4197-a431-be0c2c0d5558)

- Edit offer - with the options to save or discard changes

  ![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/126980175/c82bc302-52e3-4229-8226-0bf500f7d773)

- Delete offer

  ![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/126980175/a11f00c1-5b3c-4467-89fd-dcfdf934fa1d)

- Adding a new offer form - with a live image preview 

  ![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/126980175/d8473182-d29f-4fcf-add6-6b3dc10c2226)

- List of orders
  ![image](https://github.com/xNitix/WDAI-PROJEKT-BOBULA-DZIWAK/assets/126980175/542050b6-a62e-4471-a0cc-4d25c22c8d55)

# Project details
This project was generated with VITE v5.0.10

# Installation

## Server (Flask)
```bash
    cd src
    python app.py
```

## Frontend (React.js + Vite)
```bash
    npm install
    npm run dev
```

Run npm install to Install dependencies. Run npm run dev for a dev server. Navigate to http://localhost:5173/. The app will automatically reload if you change any of the source files.
