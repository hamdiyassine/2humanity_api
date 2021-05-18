const Media = require("../../models/Media");
const bcrypt = require("bcryptjs");

  /**
 * Find one Media
 */
exports.findOne = (req, res) => {
    Media.findById(req.params.id)
      .then((media) => {
        if (!media) {
          return res.status(404).send({
            message: "Media not found with id " + req.params.id,
          });
        }
        res.status(200).send(media);
        console.log(media);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving media with id " + req.params.id,
        });
      });
  };


  /**
 * Delete a media with the specified id in the request
 */
exports.delete = (req, res) => {
    Media.findByIdAndRemove(req.params.id)
      .then((media) => {
        if (!media) {
          return res.status(404).send({
            message: "Media not found ",
          });
        }
        res.send({ message: "Media deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete Media ",
        });
      });
  };
