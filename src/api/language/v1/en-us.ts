
module.exports={
   server : {
      apiInvalidPathError: "Invalid API path.",
      databaseHostNotProvidedError: "Could not connect to database. Host not provided",
      databaseCouldNotConnectError: `database connection not successful. Something went wrong during connection. Ensure database host is running`,
   },
   user : {
      resolverGetUserError: "Error occurs while getting list of users",
      resolverGetUserByCountryError: "Error occurs while getting user by country",

      resolverAddNewUserMismatchPassword: "Password and confirmation password not matching",
      resolverAddNewUserUserExist: "User with `email` or `username` already exist",
      resolverAddNewUserInvalidEmail: "Invalid email address provided"
   }
}