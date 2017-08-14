'use strict';
module.exports = function(sequelize, DataTypes) {
  var video = sequelize.define('videos', {
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    splitpart: DataTypes.INTEGER,
    timepart: DataTypes.INTEGER,
    isvideo: DataTypes.BOOLEAN
  });
  video.clear = function (url) {
    return sequelize.query(
      "DELETE FROM videos " +
      "WHERE LOWER(state) LIKE '%finished' OR LOWER(state) LIKE '%wrong' ", { type: sequelize.QueryTypes.DELETE});
  };

  return video;
};