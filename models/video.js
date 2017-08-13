'use strict';
module.exports = function(sequelize, DataTypes) {
  var video = sequelize.define('videos', {
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    state: DataTypes.STRING
  });
  video.clear = function (url) {
    return sequelize.query(
      "DELETE FROM videos " +
      "WHERE LOWER(state) LIKE '%finished' ", { type: sequelize.QueryTypes.DELETE});
  };

  return video;
};