// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_PRINCIPAL: 'https://api.themoviedb.org/3/movie/popular?api_key=',
  API_SEARCH: 'https://api.themoviedb.org/3/search/movie?api_key=',
  API_VIDEO: 'https://api.themoviedb.org/3/movie/',
  API_FAVORITES: 'https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=',
  API_FAVORITES_LIST: 'https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key='
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
