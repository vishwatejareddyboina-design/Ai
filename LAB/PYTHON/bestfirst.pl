edge(a, b).
edge(a, c).
edge(b, d).
edge(b, e).
edge(c, f).
edge(c, g).
edge(d, h).
edge(e, h).
edge(f, h).
edge(g, h).

heuristic(a, 7).
heuristic(b, 6).
heuristic(c, 4).
heuristic(d, 3).
heuristic(e, 2).
heuristic(f, 3).
heuristic(g, 1).
heuristic(h, 0).

best_first(Start, Goal, Path) :-
    search([Start], Goal, [], RevPath),
    reverse(RevPath, Path).

search([Goal|_], Goal, Visited, [Goal|Visited]).

search([Current|Rest], Goal, Visited, Path) :-
    findall(H-Next,
            (edge(Current, Next),
             \+ member(Next, Visited),
             heuristic(Next, H)),
            Children),
    sort(Children, Sorted),
    extract_nodes(Sorted, Nodes),
    append(Nodes, Rest, NewOpen),
    search(NewOpen, Goal, [Current|Visited], Path).

extract_nodes([], []).

extract_nodes([_-Node|Rest], [Node|Nodes]) :-
    extract_nodes(Rest, Nodes).
