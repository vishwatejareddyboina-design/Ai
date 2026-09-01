move(state(middle, onfloor, middle, hasnot),
     grasp,
     state(middle, onfloor, middle, has)).

move(state(P, onfloor, P, Has),
     climb,
     state(P, onbox, P, Has)).

move(state(P1, onfloor, P1, Has),
     push(P1, P2),
     state(P2, onfloor, P2, Has)).

move(state(P, onbox, P, Has),
     climb_down,
     state(P, onfloor, P, Has)).

move(state(P1, onfloor, P1, Has),
     walk(P1, P2),
     state(P2, onfloor, P2, Has)).

solve(state(_, _, _, has), []).

solve(State, [Action|Actions]) :-
    move(State, Action, NextState),
    solve(NextState, Actions).
