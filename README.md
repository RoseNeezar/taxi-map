# Taxi App

Taxi application that shows the closest taxi location to the nearest Splyt office to the user’s
current location.

![taxi-app-demo](https://github.com/RoseNeezar/kanban-app/blob/master/demo.gif)

## Features

- Switch between offices in London, Singapore or nearest office to user's current location
- Slide between number of taxi in the map
- Auto refresh interval to get latest taxi location (10s refresh interval)

## Tech Stack

### Frontend

- Nextjs

### Devops

- Vercel

## Installation

To start run, [get google maps api key](https://developers.google.com/maps/gmp-get-started?hl=en#create-project) and add it to the env file. Use the env.example file to know which variable is needed from google maps credentials.

```bash
cp .env.example .env.local
```

```bash
yarn dev
```

App runs by default at http://localhost:3000

## License

[MIT](https://choosealicense.com/licenses/mit/)
