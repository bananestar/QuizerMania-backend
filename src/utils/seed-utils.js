const axios = require('axios');
const seedController = require('../controllers/seed-controller');

const seedUser = async (loop = 1) => {
	const message = [];

	for (let index = 0; index <= loop; index++) {
		try {
			const { dataValues } = await seedController.AddUser();
			message.push(`ADD USER : -> ${dataValues.pseudo}`);
		} catch (error) {
			console.log(error);
		}
	}
	return message;
};

const seedAdmin = async () => {
	const message = [];

	try {
		const { dataValues } = await seedController.AddAdmin();
		message.push(`ADD ADMIN : -> ${dataValues.pseudo}`);
	} catch (error) {
		console.log(error);
	}
	return message;
};

const seedTheme = async () => {
	const message = [];

	const themes = [
		'Culture générale',
		'Télévision',
		'Célébrités',
		'Musique',
		'Dessins animés',
		'Cinéma',
		'Géographie',
		'Société',
		'Sport',
		'Histoire',
		'BD, Mangas, Comics',
		'Jeux vidéo',
		'Littérature, Art',
		'Nature, Animaux',
		'Scientifique',
		'Informatique',
		'Grammaire, Orthographe',
		'Gastronomie',
		'Culture étrangère',
		'Santé, Anatomie',
		'Auto, Moto, Véhicules',
		'Mode, Beauté',
	];

	themes.forEach(async (theme) => {
		try {
			const { dataValues } = await seedController.AddTheme(theme);
			message.push(`ADD THEME : -> ${dataValues.name}`);
		} catch (error) {
			console.log(error);
		}
	});
	return message;
};

const seedQuiz = async () => {
	const message = [];

	const quiz = [
		{
			name: 'Culture générale 1',
			question: [
				{
					questionID: 1,
					libelle: 'Qui a peint la Joconde ?',
					themeID: 1,
					reponse: [
						{
							reponseID: 1,
							questionID: 1,
							libelle: 'Michel-Ange',
							isValid: false,
						},
						{
							reponseID: 2,
							questionID: 1,
							libelle: 'Léonard de Vinci',
							isValid: true,
						},
						{
							reponseID: 3,
							questionID: 1,
							libelle: 'Vincent Van Gogh',
							isValid: false,
						},
						{
							reponseID: 4,
							questionID: 1,
							libelle: 'Jean-Michel Le Louvre',
							isValid: false,
						},
					],
				},
				{
					questionID: 2,
					libelle: 'Quelle est la valeur du nombre Pi, arrondie au dix millième ?',
					themeID: 1,
					reponse: [
						{
							reponseID: 5,
							questionID: 2,
							libelle: '3,14',
							isValid: false,
						},
						{
							reponseID: 6,
							questionID: 2,
							libelle: '3,142',
							isValid: false,
						},
						{
							reponseID: 7,
							questionID: 2,
							libelle: '3,1416',
							isValid: true,
						},
						{
							reponseID: 8,
							questionID: 2,
							libelle: '3,14159',
							isValid: false,
						},
					],
				},
				{
					questionID: 3,
					libelle: 'Qui est l\'auteur du roman "le Rouge et le Noir" ?',
					themeID: 1,
					reponse: [
						{
							reponseID: 9,
							questionID: 3,
							libelle: 'Jeanne Mas',
							isValid: false,
						},
						{
							reponseID: 10,
							questionID: 3,
							libelle: 'Baudelaire',
							isValid: false,
						},
						{
							reponseID: 11,
							questionID: 3,
							libelle: 'Dostoïevski',
							isValid: false,
						},
						{
							reponseID: 12,
							questionID: 3,
							libelle: 'Stendhal',
							isValid: true,
						},
					],
				},
				{
					questionID: 4,
					libelle:
						"Quel film d'animation de Disney raconte l'histoire d'une jeune Chinoise qui part combattre les Huns à la place de son vieux père ?",
					themeID: 1,
					reponse: [
						{
							reponseID: 13,
							questionID: 4,
							libelle: 'Mulan',
							isValid: true,
						},
						{
							reponseID: 14,
							questionID: 4,
							libelle: 'Alladin',
							isValid: false,
						},
						{
							reponseID: 15,
							questionID: 4,
							libelle: 'Pocahontas',
							isValid: false,
						},
						{
							reponseID: 16,
							questionID: 4,
							libelle: 'Kung Fu Panda',
							isValid: false,
						},
					],
				},
				{
					questionID: 5,
					libelle: 'Qui interprète le titre "Je ne suis pas un héros" en 1980 ?',
					themeID: 1,
					reponse: [
						{
							reponseID: 17,
							questionID: 5,
							libelle: 'Michel Berger',
							isValid: false,
						},
						{
							reponseID: 18,
							questionID: 5,
							libelle: 'Véronique Sanson',
							isValid: false,
						},
						{
							reponseID: 19,
							questionID: 5,
							libelle: 'Daniel Balavoine',
							isValid: true,
						},
						{
							reponseID: 20,
							questionID: 5,
							libelle: 'Justin Bieber',
							isValid: false,
						},
					],
				},
				{
					questionID: 6,
					libelle:
						'Quelle série des années 2000 raconte les tribulations de 4 femmes au foyer américaines, habitantes du quartier de Wisteria Lane ?',
					themeID: 1,
					reponse: [
						{
							reponseID: 21,
							questionID: 6,
							libelle: 'Desperate Housewives',
							isValid: true,
						},
						{
							reponseID: 22,
							questionID: 6,
							libelle: "Grey's Anatomy",
							isValid: false,
						},
						{
							reponseID: 23,
							questionID: 6,
							libelle: 'Super Nanny',
							isValid: false,
						},
						{
							reponseID: 24,
							questionID: 6,
							libelle: 'Malcolm',
							isValid: false,
						},
					],
				},
				{
					questionID: 7,
					libelle: 'Qui a été élu Président de la République en France en 2012 ?',
					themeID: 1,
					reponse: [
						{
							reponseID: 25,
							questionID: 7,
							libelle: 'Nicolas Sarkozy',
							isValid: false,
						},
						{
							reponseID: 26,
							questionID: 7,
							libelle: 'Jean-Pierre Pernault',
							isValid: false,
						},
						{
							reponseID: 27,
							questionID: 7,
							libelle: 'Ségolène Royale',
							isValid: false,
						},
						{
							reponseID: 28,
							questionID: 7,
							libelle: 'François Hollande',
							isValid: true,
						},
					],
				},
				{
					questionID: 8,
					libelle: 'De combien de joueurs est composée une équipe de football ?',
					themeID: 1,
					reponse: [
						{
							reponseID: 29,
							questionID: 8,
							libelle: '9',
							isValid: false,
						},
						{
							reponseID: 30,
							questionID: 8,
							libelle: '11',
							isValid: true,
						},
						{
							reponseID: 31,
							questionID: 8,
							libelle: '13',
							isValid: false,
						},
						{
							reponseID: 32,
							questionID: 8,
							libelle: '15',
							isValid: false,
						},
					],
				},
				{
					questionID: 9,
					libelle: "Quelle est la capitale de l'Australie ?",
					themeID: 1,
					reponse: [
						{
							reponseID: 33,
							questionID: 9,
							libelle: 'Canberra',
							isValid: true,
						},
						{
							reponseID: 34,
							questionID: 9,
							libelle: 'Sydney',
							isValid: false,
						},
						{
							reponseID: 35,
							questionID: 9,
							libelle: 'Adélaïde',
							isValid: false,
						},
						{
							reponseID: 36,
							questionID: 9,
							libelle: 'Kangaroo City',
							isValid: false,
						},
					],
				},
				{
					questionID: 10,
					libelle: 'Qui est le créateur de l\'univers de science-fiction "Star Wars" ?',
					themeID: 1,
					reponse: [
						{
							reponseID: 37,
							questionID: 10,
							libelle: 'Steven Spielberg',
							isValid: false,
						},
						{
							reponseID: 38,
							questionID: 10,
							libelle: 'Luke Skywalker',
							isValid: false,
						},
						{
							reponseID: 39,
							questionID: 10,
							libelle: 'George Lucas',
							isValid: true,
						},
						{
							reponseID: 40,
							questionID: 10,
							libelle: 'David Lynch',
							isValid: false,
						},
					],
				},
				{
					questionID: 11,
					libelle: 'En 2007, les Etats-Unis ont fait face à la terrible crise :',
					themeID: 1,
					reponse: [
						{
							reponseID: 41,
							questionID: 11,
							libelle: 'Du pétrole',
							isValid: false,
						},
						{
							reponseID: 42,
							questionID: 11,
							libelle: 'Des subprimes',
							isValid: true,
						},
						{
							reponseID: 43,
							questionID: 11,
							libelle: 'De foie',
							isValid: false,
						},
						{
							reponseID: 44,
							questionID: 11,
							libelle: 'Du Covid-19',
							isValid: false,
						},
					],
				},
				{
					questionID: 12,
					libelle: "Où se sont déroulés les Jeux Olympiques d'hiver de 2014 ?",
					themeID: 1,
					reponse: [
						{
							reponseID: 45,
							questionID: 12,
							libelle: 'À Vancouver au Canada',
							isValid: false,
						},
						{
							reponseID: 46,
							questionID: 12,
							libelle: 'À Marseille en France',
							isValid: false,
						},
						{
							reponseID: 47,
							questionID: 12,
							libelle: 'À Séoul en Corée du Sud',
							isValid: false,
						},
						{
							reponseID: 48,
							questionID: 12,
							libelle: 'À Sotchi en Russie',
							isValid: true,
						},
					],
				},
				{
					questionID: 13,
					libelle: 'Qui sont les fondateurs de la multinationale informatique "Microsoft"',
					themeID: 1,
					reponse: [
						{
							reponseID: 49,
							questionID: 13,
							libelle: 'Steve Jobs et Steve Wozniack',
							isValid: false,
						},
						{
							reponseID: 50,
							questionID: 13,
							libelle: 'Wallace et Gromit',
							isValid: false,
						},
						{
							reponseID: 51,
							questionID: 13,
							libelle: 'Bill Gates et Paul Allen',
							isValid: true,
						},
						{
							reponseID: 52,
							questionID: 13,
							libelle: "Chuck Norris, seul l'unique",
							isValid: false,
						},
					],
				},
				{
					questionID: 14,
					libelle: "Pour mesurer la magnitude d'un séisme, on utilise l’échelle",
					themeID: 1,
					reponse: [
						{
							reponseID: 53,
							questionID: 14,
							libelle: 'De Beaufort',
							isValid: false,
						},
						{
							reponseID: 54,
							questionID: 14,
							libelle: 'De Richter',
							isValid: true,
						},
						{
							reponseID: 55,
							questionID: 14,
							libelle: "Du voisin d'en face",
							isValid: false,
						},
						{
							reponseID: 56,
							questionID: 14,
							libelle: 'Télescopique',
							isValid: false,
						},
					],
				},
				{
					questionID: 15,
					libelle: 'Comment dit-on "Joyeux Noël" en Anglais ?',
					themeID: 1,
					reponse: [
						{
							reponseID: 57,
							questionID: 15,
							libelle: 'Happy New Year',
							isValid: false,
						},
						{
							reponseID: 58,
							questionID: 15,
							libelle: 'Happy Christmas',
							isValid: false,
						},
						{
							reponseID: 59,
							questionID: 15,
							libelle: 'Marie qui se masse',
							isValid: false,
						},
						{
							reponseID: 60,
							questionID: 15,
							libelle: 'Merry Christmas',
							isValid: true,
						},
					],
				},
			],
		},
	];

	try {
		await seedController.AddQuiz(quiz);
	} catch (error) {
		console.log(error);
	}
	return message;
};

const seedScore = async (loop = 1) => {
	const message = [];

	for (let index = 0; index <= loop; index++) {
		try {
			await seedController.AddScore();
		} catch (error) {
			console.log(error);
		}
	}

	return message;
};

const seedQuizV2 = async (loop = 1) => {
	const category = [
		'arts',
		'literature',
		'arts_and_literature',
		'movies',
		'film',
		'film_and_tv',
		'food_and_drink',
		'food',
		'drink',
		'general_knowledge',
		'geography',
		'history',
		'music',
		'science',
		'society_and_culture',
		'society',
		'culture',
		'sports',
		'sport',
	];

	const difficulty = ['easy', 'medium', 'hard'];

	const url = 'https://the-trivia-api.com/api/questions';

	for (let index = 0; index < loop; index++) {
		const dataRaw = await axios
			.get(url, {
				params: {
					categories: category[Math.floor(Math.random() * category.length)],
					limit: 20,
					difficulty: difficulty[Math.floor(Math.random() * difficulty.length)],
				},
			})
			.then(({ data }) => {
				return data;
			})
			.catch((err) => {
				console.log(err);
			});

		const allQuiz = await seedController.getAll();

		const allQuestion = await seedController.getAllQ();
		const allReponse = await seedController.getAllR();

		let countQ = allQuestion.count;
		let countR = allReponse.count;

		const questions = [];

		dataRaw.forEach((el) => {
			const reponse = [];
			countQ++;

			el.incorrectAnswers.forEach((e) => {
				countR++;

				const rep = {
					reponseID: countR,
					questionID: countQ,
					libelle: e,
					isValid: false,
				};

				reponse.push(rep);
			});
			reponse.push({
				reponseID: countR++,
				questionID: countQ,
				libelle: el.correctAnswer,
				isValid: true,
			});

			reponse.sort(() => Math.random() - 0.5);

			questions.push({ questionID: countQ, libelle: el.question, themeID: 1, reponse: reponse });
		});

		const data = {
			name: dataRaw[0].category+' '+allQuiz.count++,
			createdAt: new Date(),
			updatedAt: new Date(),
			question: questions,
		};

		try {
			await seedController.addQuizV2(data);
		} catch (error) {
			console.log(error);
		}
	}
};

module.exports = { seedUser, seedAdmin, seedTheme, seedQuiz, seedScore, seedQuizV2 };
