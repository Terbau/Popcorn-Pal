# Popcorn Pal App

## Description

Popcorn Pal is a website designed to help you decide which movie or series to watch. It offers information on the top 10 ranked films and provides options to filter by genre. When you select a movie, you’ll see details on its rating, duration, and a brief description of its content. If you're having trouble deciding, you can use the "random" button for a suggestion.

## Developer Information

Developed by:

- Brage Baugerød
- Bengt Andreas Rotheim
- Kaisa Øyre Larsen
- Brinje Marie Haugli

## Prerequisites

```
Node.js v22.5+
npm v10.8+.
```

## Installation

```
npm install
```

## Running the application

```
npm run dev

```

## Decisions made so far during the project

The structure

```
We choose an atomic project structure because it promotes modularity and scalability. By breaking down the project into smaller, self-contained components or modules, we can manage each part independently, which simplifies development, testing, and maintenance. This approach also enhances collaboration among team members, as different parts of the project can be worked on simultaneously without interfering with each other. Additionally, an atomic structure allows for easier updates and modifications, making it more adaptable to changes in requirements or technology.

We also use react router to route between different pages. Because of some issues with the VM we decided to switch from BrowserRouter to a HashRouter.
```

Use of AI

```
We have primarily used GitHub Copilot because we find it significantly enhances our coding efficiency. Copilot offers contextual code suggestions and autocompletion based on the current code, which helps streamline the development process. However, it tends to generate more concise code snippets compared to ChatGPT, which often produces larger blocks of code. This balance allows us to benefit from Copilot's real-time assistance while maintaining more control over the size and complexity of the code we integrate into our projects. Even though we've used copilot, we never use code we do not understand. It is simply to speed up the development process. We have however used ChatGPT to refine the text in this README.


```
