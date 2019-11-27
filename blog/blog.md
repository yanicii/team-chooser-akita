# State Management in Webapplikationen mit Akita

## Motivation

Moderne Webapplikationen haben häufig die Aufgabe, Domain-Informationen unterschiedlicher Herkunft zur Verfügung zu stellen. Zum Funktionsumfang solcher 
Anwendungen gehört neben der Anzeige auch die Aktualisierung, Erweiterung und Löschung bestimmter Informationen. Um diese Funktionen zu ermöglichen, müssen dafür
Daten im Client vorgehalten werden. Die Gesamtheit der verwalteten Informationen kann als "State" der Applikation bezeichnet werden. Abhängig von der Anwendung 
muss diese auch den Zustand der UI verwalten, sodass zusätzlich Informationen wie "Ist die Sidebar aufgeklappt?" im Client gespeichert werden.   

Eine Herausforderung bei der Darstellung von Informationen in Webapplikationen ist, dass die Requests häufig zu verschiedenen Quellen geschickt werden und die 
Responses somit zu beliebigen Zeitpunkten zurückkommen. Nur mit einem gut strukturierten State und dem dazugehörigen Datenfluss kann gewährleistet werden,
dass die einzelnen Bestandteile des Clients zur richtigen Zeit dargestellt und aktualisiert werden. 

Wenn man sich solchen Problemstellungen gegenübersteht und den State seiner Anwendung ordentlich verwalten möchte, kommt man um "State Management" Frameworks
kaum herum. In diesem Beitrag wird die Funktionsweise eines solchen Frameworks am Beispiel von Akita erklärt. Akita ist im Angular Umfeld entstanden und basiert
auf Ideen anderer Frameworks wie NGRX. Die Code-Beispiele kommen zwar aus einer Angular-Anwendung, allerdings ist Akita selbst nicht abhängig von der verwendeten 
Frontend-Technologie und kann genauso gut mit Frameworks wie React oder Vue.js verwendet werden. Im Vergleich mit anderen State Management Frameworks benötigt eine 
Implementierung mit Akita deutlich weniger Boilerplate-Code und bietet somit auch einen einfach Einstieg. 

## Funktionsweise

### Datenfluss

## Kernkonzepte

## Grundbestandteile von Akita 

### Model

```typescript
export interface Player {
  id: ID;
  name: string;
  rating: number;
}
```

### State

```
export interface PlayersState extends EntityState<Player> {}
```

### Store

```typescript
@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'players'
})
export class PlayersStore extends EntityStore<PlayersState, Player> {

  constructor() {
    super(initialState);
  }

}
```

### Service

```typescript
@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private store: PlayersStore) {
  }

  add(players: Player[]): void {
    this.store.add(players);
  }

  remove(id: string): void {
    this.store.remove(id);
  }

  updateRating(id: string, rating: number): void {
    this.store.update(id, {rating})
  }

  updatePosition(id: string, position: string): void {
    this.store.update(id, {position})
  }

}
```

### Query

```typescript
@Injectable({
  providedIn: 'root'
})
export class PlayersQuery extends QueryEntity<PlayersState> {

  constructor(protected store: PlayersStore) {
    super(store);
  }
  
}
```


