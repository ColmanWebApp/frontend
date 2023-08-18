function postToFacebook() {
  // Set up the necessary parameters
  // don't forget to generate your access token every day,  https://developers.facebook.com/tools/explorer/1288162832138619/?method=POST&path=116821598103786%2Ffeed%3Fmessage%3DTest%20from%20APIgdfgfdgdf&version=v17.0
  const accessToken =
    "EAAQYhKKQZC8sBO2B5QkAZBJ3ySZCgfqyeuGwGH9IRIkyKsoYr9L5b1OF9ZBdXAqZCAshEslKdiJwgAAKdb9YUEM1Vl00n1Pq3UTtGIkgWnHobCKdy8lyH7XdbIH7xsOBsr9ooSdnZAbJp2R6xS0pGZCWm7NucQSDWxOWskFSUZAepEqaE94oiuZBq1O5XJz7GnQg14aZC9cRHKRfZAxZAuxqF3cf";
  const postMessage = `test`;
  var pageId = "100095554243510";

  // Construct the API endpoint URL
  var apiUrl = "https://graph.facebook.com/v16.0/" + pageId + "/feed";

  // Set up the post data
  var postData = {
    message: postMessage,
    access_token: accessToken,
  };

  // Send the post request
  $.ajax({
    url: apiUrl,
    type: "POST",
    data: postData,
    success: function (response) {
      alert("Post successfully sent!");
    },
    error: function (xhr, status, error) {
    },
  });
}