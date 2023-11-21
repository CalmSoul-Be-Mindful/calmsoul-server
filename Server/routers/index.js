const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");
const authorizationUser = require("../middleware/authorizationUser");
const SpotifyWebApi = require("spotify-web-api-node");

router.post("/login", Controller.login);
router.post("/auth-google", Controller.Google);
router.post("/register", Controller.addUser);

router.use(authentication);
//Spotify
router.post("/spotify-login", (req, res) => {
  const code = req.body.code;
  console.log(code, "==============");
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err, "===========");
      res.sendStatus(400);
    });
});

router.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  //   console.log(refreshToken);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});
//--End-
router.get("/", Controller.showVideos);
router.get("/:videoId", Controller.showVideoById);
router.post("/add", Controller.addVideo);
router.put("/:videoId", Controller.editVideo);
router.delete("/:videoId", Controller.deleteVideo);

module.exports = router;
