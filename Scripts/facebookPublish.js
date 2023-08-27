async function postToFacebook(message) {
  // Set up the necessary parameters
  // don't forget to generate your access token every day,  https://developers.facebook.com/tools/explorer/1288162832138619/?method=POST&path=116821598103786%2Ffeed%3Fmessage%3DTest%20from%20APIgdfgfdgdf&version=v17.0
  const accessToken =
    "EAAQYhKKQZC8sBO3kj2SO2s0TCZBrBnqzA1JXYsg1TlKmqtBq9hemgmX2tyRFglqf80pWxxvlkrGjQNZAaMER9lHU4zthZAOnQXtzEvNKWTRgEKjOFNAkQqaNqQi1rzjOvoOucN7Q5K51D1SfAYxaK2Hso3ZBoLcOP0DugrbCTZBT1Es80eHCJdkOmbOUnb";
  const postMessage = message;
  var pageId = "114966555026958";

  // Construct the API endpoint URL
  var apiUrl = "https://graph.facebook.com/v16.0/" + pageId + "/feed";

  // Set up the post data
  var postData = {
    message: postMessage,
    access_token: accessToken,
  };
  let boolean;
  // Send the post request
  await $.ajax({
    url: apiUrl,
    type: "POST",
    data: postData,
    success: function (response) {
      boolean=true;
    },
    error: function (xhr, status, error) {
      boolean=false;
    },
  });
  console.log(boolean);
  return boolean;
}