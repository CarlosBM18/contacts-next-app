# Contacts Next.js App

This is the frontend for a contacts app where each user can have its own list of contacts. The app handles user authentication and stores the data to be persistent in a database.

## Overview 📋

- [Next.js](https://nextjs.org/) (React)
- [mobx](https://mobx.js.org/)
- [mobx-react-lite](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite)
- [jest](https://jestjs.io/) for testing

## Live demo 🚀

[https://contacts-next-app.vercel.app/](https://contacts-next-app.vercel.app/)

## Install and set up 🔧

First, clone the project and install the project dependencies, to do so run:

```sh
yarn install
```

Create a `.env.local` file and add a `NEXT_PUBLIC_API` variable with the path to the api server. Should be something like:

```sh
NEXT_PUBLIC_API=http://localhost:3000/api/v1
```

Finally, run the app:

```sh
yarn run dev
```

## Tests ⚙️

To run the tests:

```sh
yarn test
```
