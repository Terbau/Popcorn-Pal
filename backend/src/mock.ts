import type { Movie } from "./types";

export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    releaseDate: "16-07-2010",
    genres: ["Action", "Adventure", "Sci-Fi", "Thriller"],
    rating: 8.8,
    director: "Christopher Nolan",
    cast: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy",
      "Ken Watanabe",
      "Marion Cotillard",
      "Cillian Murphy",
      "Michael Caine",
    ],
    runtime: "2h 28min",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    comments: [
      {
        id: 1,
        user: "Ola Nordmann",
        content: "A mind-bending journey through dreams. Nolan is a genius!",
        date: "18-07-2024",
      },
      {
        id: 2,
        user: "Ole Nordmann",
        content: "Complex, thought-provoking, and visually stunning.",
        date: "20-07-2024",
      },
    ],
  },
  {
    id: 2,
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: "18-07-2008",
    genres: ["Action", "Crime", "Drama", "Thriller"],
    rating: 9.0,
    director: "Christopher Nolan",
    cast: [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Michael Caine",
      "Maggie Gyllenhaal",
      "Gary Oldman",
      "Morgan Freeman",
      "Cillian Murphy",
    ],
    runtime: "2h 32min",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    comments: [
      {
        id: 3,
        user: "Ola Nordmann",
        content:
          "Heath Ledger's Joker is unforgettable. Best superhero movie ever!",
        date: "20-07-2024",
      },
      {
        id: 4,
        user: "Kari Nordmann",
        content:
          "A brilliant performance by the entire cast. The pacing and story were top-notch.",
        date: "22-07-2024",
      },
    ],
  },
  {
    id: 3,
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces environmental collapse. With time running out, they must confront scientific and emotional challenges as they search for a new habitable planet.",
    releaseDate: "07-11-2014",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    director: "Christopher Nolan",
    cast: [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Bill Irwin",
      "Ellen Burstyn",
      "Michael Caine",
      "Matt Damon",
      "Timothée Chalamet",
    ],
    runtime: "2h 49min",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    comments: [
      {
        id: 5,
        user: "AstronomyFan123",
        content:
          "A visually stunning film with a thought-provoking story. Nolan does it again!",
        date: "09-11-2024",
      },
      {
        id: 6,
        user: "SpaceLover456",
        content:
          "Beautiful and emotional. The science might be complex, but the human story is universal.",
        date: "12-11-2024",
      },
    ],
  },
  {
    id: 4,
    title: "The Matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers. As Neo explores this alternate reality, he begins to understand his destiny in the fight for humanity's future.",
    releaseDate: "31-03-1999",
    genres: ["Action", "Sci-Fi"],
    rating: 8.7,
    director: "Lana Wachowski, Lilly Wachowski",
    cast: [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss",
      "Hugo Weaving",
      "Joe Pantoliano",
    ],
    runtime: "2h 16min",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX280_CR0,3,280,414_.jpg",
    comments: [
      {
        id: 7,
        user: "TechGuru123",
        content:
          "An absolute game changer in sci-fi cinema. The action sequences still hold up today!",
        date: "02-04-2024",
      },
      {
        id: 8,
        user: "PhilosophyBuff",
        content:
          "A deep, philosophical journey wrapped in a cyberpunk action thriller. It’s mind-blowing!",
        date: "04-04-2024",
      },
    ],
  },
  {
    id: 5,
    title: "Gladiator",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery. Armed with his skills as a gladiator, Maximus fights his way to the top to avenge his loved ones and reclaim his honor.",
    releaseDate: "05-05-2000",
    genres: ["Action", "Adventure", "Drama"],
    rating: 8.5,
    director: "Ridley Scott",
    cast: [
      "Russell Crowe",
      "Joaquin Phoenix",
      "Connie Nielsen",
      "Oliver Reed",
      "Richard Harris",
      "Derek Jacobi",
      "Djimon Hounsou",
    ],
    runtime: "2h 35min",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    comments: [
      {
        id: 9,
        user: "HistoryBuff",
        content:
          "A powerful epic with incredible performances. Russell Crowe was born to play Maximus.",
        date: "07-05-2024",
      },
      {
        id: 10,
        user: "ActionFan99",
        content:
          "The fight scenes are amazing! Gladiator is a timeless classic.",
        date: "09-05-2024",
      },
    ],
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Andy Dufresne, a banker sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, forms an unlikely friendship with fellow inmate Red, and together they experience hope and freedom within the confines of prison walls.",
    releaseDate: "14-10-1994",
    genres: ["Drama"],
    rating: 9.3,
    director: "Frank Darabont",
    cast: [
      "Tim Robbins",
      "Morgan Freeman",
      "Bob Gunton",
      "William Sadler",
      "Clancy Brown",
      "Gil Bellows",
      "James Whitmore",
    ],
    runtime: "2h 22min",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX280_CR0,3,280,414_.jpg",
    comments: [
      {
        id: 11,
        user: "MovieFan456",
        content:
          "One of the most powerful films of all time. A story about hope and perseverance.",
        date: "15-10-2024",
      },
      {
        id: 12,
        user: "FilmBuff2024",
        content:
          "An emotional journey with amazing performances by Robbins and Freeman.",
        date: "17-10-2024",
      },
    ],
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Return of the King",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring. The final battle for Middle-Earth begins, and the fate of the world rests on the outcome of their perilous journey.",
    releaseDate: "17-12-2003",
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    rating: 9.0,
    director: "Peter Jackson",
    cast: [
      "Elijah Wood",
      "Viggo Mortensen",
      "Ian McKellen",
      "Orlando Bloom",
      "Sean Astin",
      "Cate Blanchett",
      "John Rhys-Davies",
      "Liv Tyler",
    ],
    runtime: "3h 21min",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    comments: [
      {
        id: 13,
        user: "TolkienFan",
        content:
          "An epic conclusion to one of the greatest trilogies of all time. A visual and emotional masterpiece.",
        date: "19-12-2024",
      },
      {
        id: 14,
        user: "FantasyLover123",
        content:
          "The perfect ending to an incredible journey. The battles, the emotions, everything was perfect.",
        date: "21-12-2024",
      },
    ],
  },
  {
    id: 8,
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more. As their organization grows, the two men find themselves on a collision course with explosive consequences, questioning reality and identity along the way.",
    releaseDate: "15-10-1999",
    genres: ["Drama"],
    rating: 8.8,
    director: "David Fincher",
    cast: [
      "Brad Pitt",
      "Edward Norton",
      "Helena Bonham Carter",
      "Meat Loaf",
      "Jared Leto",
    ],
    runtime: "2h 19min",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_QL75_UX280_CR0,3,280,414_.jpg",
    comments: [
      {
        id: 15,
        user: "PhilosophyFan",
        content:
          "A dark and thought-provoking exploration of identity and consumerism. One of Fincher's best.",
        date: "17-10-2024",
      },
      {
        id: 16,
        user: "MovieBuff2024",
        content:
          "Brad Pitt and Edward Norton are phenomenal in this psychological thriller. A cult classic for a reason.",
        date: "19-10-2024",
      },
    ],
  },
  {
    id: 9,
    title: "Forrest Gump",
    description:
      "The story of a man with a low IQ who unwittingly influences several major historical events in the 20th century, all while pursuing his childhood love, Jenny. Through his simplicity, Forrest teaches the world about life, love, and the importance of kindness.",
    releaseDate: "06-07-1994",
    genres: ["Drama", "Romance"],
    rating: 8.8,
    director: "Robert Zemeckis",
    cast: [
      "Tom Hanks",
      "Robin Wright",
      "Gary Sinise",
      "Sally Field",
      "Mykelti Williamson",
    ],
    runtime: "2h 22min",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_QL75_UY414_CR3,0,280,414_.jpg",
    comments: [
      {
        id: 17,
        user: "LifeIsLikeABoxOfChocolates",
        content:
          "A heartwarming and emotional journey. Tom Hanks delivers a performance for the ages.",
        date: "08-07-2024",
      },
      {
        id: 19,
        user: "MovieLover123",
        content:
          "Forrest Gump is both touching and funny, with a beautiful message about life and love.",
        date: "10-07-2024",
      },
    ],
  },
  {
    id: 10,
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption. Through its unique storytelling, the film redefines the genres with its non-linear narrative and unforgettable characters.",
    releaseDate: "14-10-1994",
    genres: ["Crime", "Drama"],
    rating: 8.9,
    director: "Quentin Tarantino",
    cast: [
      "John Travolta",
      "Uma Thurman",
      "Samuel L. Jackson",
      "Bruce Willis",
      "Ving Rhames",
      "Harvey Keitel",
      "Tim Roth",
      "Amanda Plummer",
    ],
    runtime: "2h 34min",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY414_CR2,0,280,414_.jpg",
    comments: [
      {
        id: 20,
        user: "FilmBuff456",
        content:
          "A masterpiece of modern cinema. Tarantino's script and direction are unparalleled.",
        date: "16-10-2024",
      },
      {
        id: 21,
        user: "Cinephile2024",
        content:
          "Incredible performances, iconic dialogues, and a brilliant non-linear storyline.",
        date: "18-10-2024",
      },
    ],
  },
];
