export const followersResponseMock = {
  feed: {
    moreAvailable: false,
  },
  followers: [
    /**
     * The followers mock can also be empty so as to consider all users returned
     * from the following API as unrequited. If a user is present both here and
     * in the following, it will be considered as a paid follow and consequently
     * filtered by the application.
     */
  ],
};
