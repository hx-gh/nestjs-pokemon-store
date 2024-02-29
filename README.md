<div align="center">
    <h1>Pokemon Store</h1>
</div>
<div align="center">    
    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
    <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
    <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">
    <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white">
</div>
<div align="center">
  <sub>Built with ❤︎</br>
  </sub>
</div>
<br/>

# :computer: Technologies

This project was made using the follow technologies:

-   [Javascript]
-   [Nest.Js]
-   [Prisma]
-   [MySQL]
-   [Docker]
-   [OpenAPI:Swagger]
-   [Jest]

# :speech_balloon: Description

-   Welcome to PokemonStore, a comprehensive platform designed to facilitate seamless trading and purchasing of Pokémon cards. This project consists of two core applications: the 'Store' and 'Payments' services, each contributing essential functionalities to ensure a smooth and secure user experience.

# :rocket: Features

-   **User Management**:
    User creation with secure password encryption.
    User authentication and authorization using JWT.
    Storage of JWT securely in cookies for persistent sessions utilizing AES-256 encryption for securing the session tokens.
-   **Reference Card Management**:
    Listing of Pokémon cards from an external API.
    Dynamic population of the database with card data.
    Detailed card information display, including stats and rarity.
-   **Sales Module**:
    Creation of listings for Pokémon cards for sale.
    Display of individual cards available for sale.
    Viewing all cards available for sale by a specific user.
    Filtering and sorting options for ease of browsing.
-   **Order Processing**:
    Creation of orders for purchasing Pokémon cards.
    Real-time status updates for orders.
    Integration with Kafka for messaging and event-driven architecture.
    Order completion and confirmation.
-   **Payments Integration**:
    Seamless payment processing for orders.
    Messaging back to Kafka for payment status updates.
-   **Documentation and Testing**:
    Comprehensive documentation for developers and users utilizing OpenAPI.

## :construction_worker: Installation

```bash
# Clone Repository
$ git clone https://github.com/hx-gh/nestjs-pokemon-store.git
$ cd nestjs-pokemon-store
$ npm install
```

Configure environment variables as per instructions in `.env.example` files.
Start Kafka, Zookeeper, Confluent Control Panel, and MySQL using Docker:

```bash
$ docker compose up
```

Set-up Prisma for developement

```bash
$ cd apps/store
$ npx prisma generate
$ npx prisma migrate dev
$ cd ..
$ cd payments
$ npx prisma generate
$ npx prisma migrate dev
```

### 💻 Run Microservices

```bash
# Go to web folder
$ cd nestjs-pokemon-store
# Install Dependencies
$ npm install
# Run Store Aplication
$ npm run start:dev
# Run Payments Aplication
$ npm run start:dev payments
```

### 💻 Run Database

After setting up the Migrations and Setups for Prisma
Make a fetch for localhost:3000/reference-card/update-pokemons

### 💻 Run Tests Suit

```bash
# Run Database
$ npm run test:e2e
```

# :closed_book: License

Released in 2024

Give a ⭐️ if this project helped you!
