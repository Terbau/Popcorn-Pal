export const mockedForyouData = [
  {
    type: "MOVIE_SUGGESTION",
    movieId: "1",
    movieTitle: "Inception",
    moviePosterUrl:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
  },

  {
    type: "USER_SUGGESTION",
    userId: "1",
    userFirstName: "John",
    userLastName: "Doe",
    userAvatarUrl: null,
  },

  {
    type: "COMMENT_SUGGESTION",
    userId: "1",
    userFirstName: "John",
    userLastName: "Doe",
    userAvatarUrl: null,
    commentId: "1",
    commentContent: "Great movie!",
    commentIsReply: false,
    movieId: "1",
    movieTitle: "Inception",
    moviePosterUrl:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
    timestamp: new Date(),
  },

  {
    type: "FOLLOWING_STARTED_FOLLOWING_SOMEONE_ELSE",
    userId: "1",
    userFirstName: "John",
    userLastName: "Doe",
    userAvatarUrl: null,
    targetUserId: "2",
    targetUserFirstName: "Jane",
    targetUserLastName: "Smith",
    targetUserAvatarUrl: null,
    timestamp: new Date(),
  },

  {
    type: "FOLLOWING_ADDED_MOVIE_TO_WATCHLIST",
    userId: "1",
    userFirstName: "John",
    userLastName: "Doe",
    userAvatarUrl: null,
    movieId: "1",
    movieTitle: "Inception",
    moviePosterUrl:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
    watchlistItemLabel: "WATCHING",
    timestamp: new Date(),
  },

  {
    type: "FOLLOWING_UPDATED_WATCHLIST_ITEM",
    userId: "1",
    userFirstName: "John",
    userLastName: "Doe",
    userAvatarUrl: null,
    movieId: "1",
    movieTitle: "Inception",
    moviePosterUrl:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
    watchlistItemLabel: "WATCHING",
    timestamp: new Date(),
  },

  {
    type: "FOLLOWING_COMMENTED_ON_MOVIE",
    userId: "1",
    userFirstName: "John",
    userLastName: "Doe",
    userAvatarUrl: null,
    commentId: "1",
    commentContent: "Great movie!",
    commentIsReply: false,
    movieId: "1",
    movieTitle: "Inception",
    moviePosterUrl:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
    timestamp: new Date(),
  },
];
