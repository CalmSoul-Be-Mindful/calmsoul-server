"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video.init(
    {
      videoName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Video name cannot be empty",
          },
          notEmpty: {
            msg: "Video name cannot be empty",
          },
        },
      },
      videoLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Video link cannot be empty",
          },
          notEmpty: {
            msg: "Video link cannot be empty",
          },
        },
      },
      videoCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Video category cannot be empty",
          },
          notEmpty: {
            msg: "Video category cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Video",
    }
  );
  return Video;
};
