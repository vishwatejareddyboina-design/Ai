person(ravi, '10-05-2002').
person(sita, '15-08-2001').
person(rahul, '20-12-2003').
person(anita, '25-03-2002').

dob(Name, Date) :-
    person(Name, Date).
