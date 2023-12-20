# Infollow

> [!CAUTION]
> This project utilizes unofficial Instagram APIs, the use of which is prohibited by the company itself. I strongly discourage their use and take no responsibility for any consequences that may arise from the project's utilization.

If there's one thing I love to do, it's playing around and experimenting with APIs of popular services. In this case, I had a great time playing around with the (not exactly official 😅) Instagram APIs.

Infollow is an application coded in Angular and Express. Once you log in with your Instagram account through the APIs exposed by the [instagram-private-api](https://github.com/dilame/instagram-private-api) library, it lets you retrieve a list of users you follow but who don't reciprocate, like Britney Spears... (I've always hoped she'd follow back, argh 😤).

Born out of sheer curiosity, the project employs Angular for the frontend and the Tailwind CSS library for styling, where I had a great time trying out new things, such as the light or dark mode based on the system settings you've configured on your device 😁.

The backend, powered by Express.js, relies on the [instagram-private-api](https://github.com/dilame/instagram-private-api) library to interact with Instagram's services. It's a playful exploration turned into a functional project, combining Angular, Tailwind CSS, and Express.js to bring a bit of fun to the world of Instagram interactions.

## Installation

> [!NOTE]  
> The application is divided into two separate modules. The main folder will contain the frontend, while the backend can be found under the "backend" folder at the root of the project. Due to this dual structure, all commands, including installation and startup, must be executed twice: once for the frontend and once for the backend.

#### Backend

Inside the `backend` folder, run `npm i` and then `npm run start` for starting the backend, otherwise, run `npm run mock-server` if you want to launch the backend with mocked APIs.

#### Frontend

Run `npm i` and then `npm run start` at the root of the project. Once the server is started, the application will be accessible at the URL: `http://localhost:4200/`.

## Demo

No demo available.

## Authors

- [@miitchpls](https://www.github.com/miitchpls)
