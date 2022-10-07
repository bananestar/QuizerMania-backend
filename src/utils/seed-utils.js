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
			message.push(await seedController.AddScore());
		} catch (error) {
			console.log(error);
		}
	}

	return console.log(message);;
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
		const categories = category[Math.floor(Math.random() * category.length)]
		const dataRaw = await axios
			.get(url, {
				params: {
					categories: categories,
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
		let img;
		switch (categories) {
			case 'arts':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizArt.png?alt=media&token=0be6dcb2-c9ca-4b98-b781-b44ada3003e2';
				break;
			case 'literature':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizLitterature.png?alt=media&token=4cb3cc2d-4052-4a99-bd3b-31832fd05652';
				break;
			case 'arts_and_literature':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizLitterature.png?alt=media&token=4cb3cc2d-4052-4a99-bd3b-31832fd05652';
				break;
			case 'movies':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizMovie.png?alt=media&token=5ff72211-7da8-4974-86ef-8de3e1bdac6b';
				break;
			case 'film':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizMovie.png?alt=media&token=5ff72211-7da8-4974-86ef-8de3e1bdac6b';
				break;
			case 'film_and_tv':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizFilm%26TV.png?alt=media&token=d1e61247-52ca-485f-8b5a-199877ecf7c9';
				break;
			case 'food_and_drink':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizFood%26Drink.png?alt=media&token=bbbb7654-177b-455e-908e-5a7b940e5610';
				break;
			case 'food':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizFood.png?alt=media&token=ad67bdd0-1709-471a-860e-59762bbf1fcc';
				break;
			case 'drink':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizDrink.png?alt=media&token=cc1f6b1d-e5bd-4641-b2af-4ce000298bf1';
				break;
			case 'general_knowledge':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quiz-dans-style-bande-dessinee-pop-art_175838-505.jpg?alt=media&token=5ccc9eb8-5e81-429f-9556-f78daefc04fc';
				break;
			case 'geography':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizGeo.png?alt=media&token=3c60e757-d230-46a2-b9a5-5cea5de71a8a';
				break;
			case 'history':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizHistory.png?alt=media&token=f497f9f4-b207-4cba-9a1d-189b73e296b6';
				break;
			case 'music':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizMusic.png?alt=media&token=316ecac1-1011-4c20-a3a6-c99fe2aa9c67';
				break;
			case 'science':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizScience.png?alt=media&token=db589949-98dc-488a-86fa-99dfdfff270c';
				break;
			case 'society_and_culture':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizSoc%26Cult.png?alt=media&token=24270bda-34a5-40c2-9e12-5fc3fb90434a';
				break;
			case 'society':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizSoc.png?alt=media&token=0e1df358-65c9-4e2b-9547-6f27a57531d1';
				break;
			case 'culture':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizCult.png?alt=media&token=b073d09f-6c22-45e2-8cd7-4d35be50d3b8';
				break;
			case 'sports':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizSport.png?alt=media&token=b46cd56e-8c63-4d1c-b667-312df3cc46b1';
				break;
			case 'sport':
				img = 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quizSport.png?alt=media&token=b46cd56e-8c63-4d1c-b667-312df3cc46b1';
				break;

			default:
				img =
					'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quiz-dans-style-bande-dessinee-pop-art_175838-505.jpg?alt=media&token=5ccc9eb8-5e81-429f-9556-f78daefc04fc';
				break;
		}

		const data = {
			name: dataRaw[0].category + ' ' + allQuiz.count++,
			img: img,
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
