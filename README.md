# Popcorn Pal 🍿

link to our website http://it2810-21.idi.ntnu.no/project2/

## Table of contents

1. [Popcorn Pal](https://git.ntnu.no/IT2810-H24/T21-Project-2/tree/85-refactor-readme?tab=readme-ov-file#popcorn-pal)

2. [Developer Information](https://git.ntnu.no/IT2810-H24/T21-Project-2/tree/85-refactor-readme?tab=readme-ov-file#developer-information)

3. [Design Choises](https://git.ntnu.no/IT2810-H24/T21-Project-2/tree/85-refactor-readme?tab=readme-ov-file#design-choises)

4. [Technologies](https://git.ntnu.no/IT2810-H24/T21-Project-2/tree/85-refactor-readme?tab=readme-ov-file#technologies)

5. [Testing](https://git.ntnu.no/IT2810-H24/T21-Project-2/tree/85-refactor-readme?tab=readme-ov-file#testing)

6. [How To Run](https://git.ntnu.no/IT2810-H24/T21-Project-2/tree/85-refactor-readme?tab=readme-ov-file#how-to-run)

7. [How To Test](https://git.ntnu.no/IT2810-H24/T21-Project-2/tree/85-refactor-readme?tab=readme-ov-file#how-to-test)

## Popcorn Pal

Popcorn Pal is a website designed to help you discover the perfect movie or series to watch. It showcases IMDb rankings and top-rated films, making it easy to explore quality options. Whether you're searching for something new or just need a bit of inspiration, Popcorn Pal is here to guide your decision.

### The application and its different pages are explained in the following walkthrough

#### Homepage:

The homepage features a movie carousel showcasing a selection of highlighted films. Below this, there is an overview of the top 10 rated movies, making it easy for users to discover popular titles. Additionally, a navigation section provides quick links to various parts of the site, facilitating straightforward exploration.

#### DiscoverPage

The Discover page provides users with a tool to find a movie by allowing them to sort films based on ranking, duration, title, and release year. Users can also apply filters by categories, making it simple to narrow down options to specific genres or types of films.

#### MoviePage

By clicking on "Read More," you will be directed to a dedicated movie page that displays detailed information about the selected film. This movie page includes the title, a brief description, and the IMDb ranking. Users also have the option to like the movie, add it to their watchlist, and leave a comment in the comment section. The comment section encourages engagement by allowing users to reply to others' comments and vote on comments with upvotes and downvotes, fostering lively discussions and debates

#### WatchlistPage

The Watchlist page offers similar functionality to the Discover page but focuses exclusively on the movies you’ve added to your watchlist. It provides an organized overview of your selected films, allowing you to easily manage your viewing preferences. Additionally, you can filter your watchlist based on your viewing status, such as "Watched," "Want to Watch," and "Currently Watching."

#### FavoriteMoviePage

This section displays an overview of the movies you have liked. It allows you to easily access and revisit your favorite films, providing a quick reference to your preferred choice

#### Profile Page

The profile page provides an overview of a user, displaying their follower count and the number of people they follow. It also includes a link to their watchlist, allowing others to explore their selections for inspiration.

#### For You Page

This page presents results tailored to your interests. As you follow more users, your feed becomes more personalized, recommending both movies and users that match your tastes. This feature helps you discover new content and connect with like-minded individuals in the community.

#### Sign In and Sign Up Pages

The Sign In and Sign Up pages allow users to create an account by providing their name, email address, and creating a password. Once registered, users can easily log in using their email and password.

## Developer Information

Developed by:

- Brage Baugerød
- Bengt Andreas Rotheim
- Kaisa Øyre Larsen
- Brinje Marie Haugli

## Design Choises

### Choice of data

### Choices related to search, filtering and sorting

### Choices related to sustainability

#### Choices related to accessibility

### Choices related to global state management

### Choices related to reproducible code

## Technologies

### Frontend

**React with TypeScript:** React enables dynamic, component-based interfaces that are efficient and scalable. TypeScript adds type safety, which reduces bugs and improves reliability in the code.


### Backend

## Testing

**Cypress**

Cypress is used for end-to-end testing to validate key features like search, filtering, and navigation. It simulates user interactions to ensure the application performs as expected across various scenarios, helping to identify issues and ensure a reliable user experience

**Unit tests**

We employ unit testing to verify the functionality of individual components in our applications. This practice helps identify bugs early, improves code quality, and ensures that changes do not introduce new issues.

## How To Run

To run the application in development mode, follow these steps:

This project is split into two separate subprojects, `frontend` and `backend`. These are individual packages that must be run from their respective folders. Follow their README's for more instructions on how to install and run each of them.

- [Frontend Instructions](./frontend/README.md)
- [Backend Instructions](./backend/README.md)

## How To Test

### End to end tests

### Components tests
