diet(diabetes, 'Low sugar and high fiber diet').
diet(obesity, 'Low calorie and low fat diet').
diet(hypertension, 'Low salt and low fat diet').
diet(anemia, 'Iron rich and vitamin C diet').
diet(gastritis, 'Light and non spicy diet').

suggest_diet(Disease, Diet) :-
    diet(Disease, Diet).
