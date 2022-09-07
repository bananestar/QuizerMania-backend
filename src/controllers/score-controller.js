const { Request, Response } = require('express');
const db = require('../models');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

//Todo: getAll, get, add, update, delete
const scoreController = {
	//! recuperation de tout les score
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {},
	//! recuperation d'un score spécifique via son ID
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {},
	//! ajout d'un score
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {},
	//! mise à jour d'un score
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {},
	//! suppression d'un score
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {},
};

module.exports = scoreController;
