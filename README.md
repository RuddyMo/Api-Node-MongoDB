# Examen Node JS MongoDB

Modèle de la base de donnée pour la marque : 

Pour la collection marque j’ai choisi de prendre une image donc qui est souvent le logo, un nom de la marque et un guide de démarrage car j’ai vue que pour les différentes marques de flipper il y a des guides de démarrage différents.

On peut voir juste en dessous mon GET [localhost:3000/api/brands](http://localhost:3000/api/brands) avec mes deux marques qui sont récupérer et que j’ai créer avec ce body :

```json
[
	{
		"_id": "667435dd8cb026af6f65d288",
		"name": "Bally",
		"image": "https://example.com/images/bally-logo.jpg",
		"quickstart": "Founded in 1932, Bally is a leading manufacturer of pinball machines.",
		"__v": 0
	},
	{
		"_id": "667435ee8cb026af6f65d28b",
		"name": "Williams",
		"image": "https://example.com/images/williams-logo.jpg",
		"quickstart": "Williams, established in 1943, is renowned for its high-quality pinball machines.",
		"__v": 0
	}
]
```

Mon POST :

```json
{
	"name": "Williams",
	"image": "https://example.com/images/williams-logo.jpg",
	"quickstart": "Williams, established in 1943, is renowned for its high-quality pinball machines.",
	"_id": "667435ee8cb026af6f65d28b",
	"__v": 0
}
```

En ce qui concerne la collection des flippers : 

Pour les flippers, j’ai le nom, l’id de la marque pour qu’il soit connecter avec les marques, les caractéristiques avec dedans l’année, une note pour que les clients qui ont acheter le flipper puisse donner une note, le prix, la disponibilité pour voir si il est en stock et des images du flipper.

On peut voir juste en dessous mon GET [localhost:3000/api/](http://localhost:3000/api/brands)flippers avec mes 4 flippers qui sont récupérer et que j’ai créer avec ce body :

```json
[
	{
		"_id": "667436d28cb026af6f65d29a",
		"name": "Addams Family",
		"brandId": "667435dd8cb026af6f65d288",
		"characteristics": {
			"year": 1992,
			"rating": 9,
			"price": 7500,
			"availability": "In Stock",
			"_id": "667436d28cb026af6f65d29b"
		},
		"images": [
			"https://example.com/images/addams-family1.jpg",
			"https://example.com/images/addams-family2.jpg"
		],
		"__v": 0
	},
	{
		"_id": "667436e68cb026af6f65d29d",
		"name": "Medieval Madness",
		"brandId": "667435dd8cb026af6f65d288",
		"characteristics": {
			"year": 1997,
			"rating": 10,
			"price": 12000,
			"availability": "Out of Stock",
			"_id": "667436e68cb026af6f65d29e"
		},
		"images": [
			"https://example.com/images/medieval-madness1.jpg",
			"https://example.com/images/medieval-madness2.jpg"
		],
		"__v": 0
	},
	{
		"_id": "667437108cb026af6f65d2a2",
		"name": "Attack from Mars",
		"brandId": "667435ee8cb026af6f65d28b",
		"characteristics": {
			"year": 1995,
			"rating": 8,
			"price": 8000,
			"availability": "In Stock",
			"_id": "667437108cb026af6f65d2a3"
		},
		"images": [
			"https://example.com/images/attack-from-mars1.jpg",
			"https://example.com/images/attack-from-mars2.jpg"
		],
		"__v": 0
	},
	{
		"_id": "6674373f8cb026af6f65d2a7",
		"name": "Twilight Zone",
		"brandId": "667435ee8cb026af6f65d28b",
		"characteristics": {
			"year": 1993,
			"rating": 9,
			"price": 9000,
			"availability": "Limited Stock",
			"_id": "6674373f8cb026af6f65d2a8"
		},
		"images": [
			"https://example.com/images/twilight-zone1.jpg",
			"https://example.com/images/twilight-zone2.jpg"
		],
		"__v": 0
	}
]
```

Mon POST :

```json
{
	"name": "Twilight Zone",
	"brandId": "667435ee8cb026af6f65d28b",
	"characteristics": {
		"year": 1993,
		"rating": 9,
		"price": 9000,
		"availability": "Limited Stock",
		"_id": "6674373f8cb026af6f65d2a8"
	},
	"images": [
		"https://example.com/images/twilight-zone1.jpg",
		"https://example.com/images/twilight-zone2.jpg"
	],
	"_id": "6674373f8cb026af6f65d2a7",
	"__v": 0
}
```

# Optimisation

### Améliorer le ‘search’ par nom de flipper

Pour améliorer les recherches par nom de flipper, on peut créer un index textuel sur le champ `name`. 

```jsx
db.flippers.createIndex({ name: "text" });
```

Pour utiliser cet index dans une requête de recherche, on peut utiliser la méthode `$text` de MongoDB :

```jsx
db.flippers.find({ $text: { $search: "Addams Family" } });
```

Et ajouter un index à la page pour une recherche plus facile avec le scroll

## Accélérer la présentation en liste des flippers sur la home page

On peut créer un index composé sur les champs fréquemment utilisés dans les requêtes de listing, comme `brandId` et `price`.

```jsx
db.flippers.createIndex({ brandId: 1, price: -1 });
```