const Category = require('../models/category');
const { handleError,handleSuccess,handleErrorWithMsg } = require('../utils/utility');
const HttpStatus = require("../constant/http-status");
const ErrorCode = require("../constant/error-code");
const Message = require("../constant/messages");
const slugify = require('slugify');

exports.list = (req, res) => {
    Category.find({}).exec((err, data) => {
        if (err) {
            return handleErrorWithMsg(
                res,
                HttpStatus.OK,
                ErrorCode.RESOURCE.INVALID_REQUEST,
                err
              );
        }
        return handleSuccess(res,
            HttpStatus.OK,
            data,
            Message.FETCHED_SUCCESSFULL)
    });
};

exports.create = (req, res) => {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();

    let category = new Category({ name, slug });

    category.save((err, data) => {
        if (err) {
            return handleErrorWithMsg(
                res,
                HttpStatus.OK,
                ErrorCode.RESOURCE.INVALID_REQUEST,
                err
              );
        }
        return handleSuccess(res,
            HttpStatus.OK,
            [],
            Message.CREATE_SUCCESSFUL)
    });
};

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Category.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return handleErrorWithMsg(
                res,
                HttpStatus.OK,
                ErrorCode.RESOURCE.INVALID_REQUEST,
                err
              );
        }
        return handleSuccess(res,
            HttpStatus.OK,
            [],
            Message.DELETE_SUCCESSFUL)
    });
};

