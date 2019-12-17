# State Management in Webapplikationen mit Akita

## Motivation

Webapplikationen haben häufig die Aufgabe, Informationen aus unterschiedlichen Quellen zur Verfügung zu stellen. Zum Funktionsumfang solcher Anwendungen gehört 
neben der Anzeige auch oft die Aktualisierung, Erweiterung und Löschung bestimmter Informationen. Um diese Funktionen zu ermöglichen, müssen dafür irgendwie Daten im 
Client vorgehalten werden. Die Gesamtheit der verwalteten Informationen beinflusst die Anzeige und das Verhalten der Applikation und kann als Zustand oder State
bezeichnet werden. Abhängig von der Anwendung muss auch der Zustand der UI verwaltet werden, sodass zusätzlich Informationen wie "Ist die Sidebar aufgeklappt?" im 
Client "gespeichert" werden.

Eine Herausforderung bei der Darstellung von Informationen in Webapplikationen ist, dass die Requests häufig zu verschiedenen Quellen geschickt werden und die 
Responses somit zu beliebigen Zeitpunkten zurückkommen. Es ist wichtig die einzelnen Komponenten des Clients zur richtigen Zeit mit neuen Daten zu aktualisieren
und neu zu rendern, allerdings erfordert das auch einen gut strukturierten Datenfluss. Darüber hinaus hat man häufig die Aufgabe, ein und die selbe Information an
an verschiedenen Stellen einer Anwendung darzustellen. Auch hierbei muss man sich gut überlegen, wie man die Daten über die Applikation hinweg verteilt, ohne dabei
den Überblick zu verlieren oder die gleichen Daten mehrfach abzulegen.

Wenn man sich solchen Problemstellungen gegenübersteht und den State seiner Anwendung ordentlich verwalten möchte, kommt man um State Management Frameworks
kaum herum. In diesem Beitrag wird die Funktionsweise eines solchen Frameworks am Beispiel von Akita erklärt. Akita ist im Angular Umfeld entstanden und basiert
auf Ideen anderer Frameworks wie NGRX. Die Code-Beispiele kommen aus einer Angular-Anwendung, allerdings ist Akita selbst nicht abhängig von der verwendeten 
Frontend-Technologie und kann genauso gut mit Frameworks wie React oder Vue.js verwendet werden. Im Vergleich mit anderen State Management Frameworks benötigt eine 
Implementierung mit Akita deutlich weniger Boilerplate Code und bietet somit auch einen einfach Einstieg. 

## Funktionsweise

![Akita Data Flow](akita_data_flow.jpg)

Im Mittelpunkt des State Management Frameworks von Akita stehen die sogenannten Stores. Ein Store verwaltet für den Client relevanten Daten und kann
als eine Art "Frontend-Repository" angesehen werden. Im Normalfall ist ein Store für die Verwaltung einer einzelnen Entität zuständig, sodass eine Anwendung meist 
aus mehreren Stores besteht. Um den Zugriff auf die Entitäten zu ermöglichen, werden für jeden Store Queries definiert. Diese Queries können in die einzelnen 
Komponenten eingebunden werden, wo die Daten letztendlich dem User sichtbar gemacht werden. Der Datenfluss über die Queries zu den Komponenten wird über asynchrone 
Streams realisiert, die man aus dem RXJS Framework kennt. Das führt dazu, dass Aktualisierungen des Stores direkt an die Komponenten weitergegeben werden und
die neuen Informationen unverzüglich neu gerendert werden.

Damit Informationen aus dem Store gelesen werden können, muss der Store zuerst mit Daten befüllt werden, wofür ein Service zuständig ist. Lediglich dieser Service
darf den Zustand des Stores verändern. Außerdem ist der Service dafür zuständig, über asynchrone Aufrufe Daten von externen Systemen zu beziehen und die Informationen
an den Store weiterzugeben. Den Komponenten stellt der Service Methoden bereit, mit denen der User Änderungen am Store auslösen kann. 

Die oben beschriebenen Komponenten und Abläufe stellen die Basis des Akita-Patterns da, an die man sich bei einer Implementierung halten sollte. Wichtig ist vor 
allem die Einhaltung des unidirektionalen Datenflusses, der eine gute Nachvollziehbarkeit der Vorgänge innerhalb der Anwendung ermöglicht. Das Entwickler Team von
Akita definiert 4 High-Level Prinzipien, die man als Entwickler zusätzlich beachten sollte. Teilweise ergeben sich die Prinzipien bereits aus dem Akita-Pattern selbst. 

## High-Level Prinzipien

1. Ein Store ist ein einzelnes Objekt, welches den aktuellen Zustand des Stores beinhaltet und als "Single source of truth" dient
2. Der Zustand des Stores kann nur durch die Methode `setState()` verändert werden
3. Komponenten greifen nicht direkt, sondern über vordefinierte Queries auf den Store zu 
4. Die Aktualisierung des Stores und weitere asynchrone Logik soll in einem Service gekapselt werden   

## Bestandteile von Akita

Um die Funktionsweise von Akita zu veranschaulichen, habe ich die Beispielanwendung "Player-Manager" geschrieben. Das Programm selbst ist eine simple CRUD-Anwendung,
mit der Entitäten vom Typ "Player" erzeugt, verändert und gelöscht werden können. Wenn ihr den kompletten Code nachvollziehen wollt, findet ihr das Projekt auf 
[Github](https://github.com/german-reindeer/team-chooser-akita/tree/master/).   

### Model

```typescript
export interface Player {
  id: ID;
  name: string;
  rating: number;
}
```

Das zentrale Model der Anwendung ist einfach gehalten. Die Attribute "name" und "rating" beschreiben den verwalteten Spieler, das Attribut "id" dient der 
Identifizierung. Um die Vorzüge von Akita voll nutzen zu können, ist es wichtig, dass das Model eine eindeutige ID besitzt. Der Interface ID wird von Akita selbst
bereitgestellt.

### Store

```typescript
@StoreConfig({
  name: 'players'
})
export class PlayersStore extends EntityStore<PlayersState, Player> {
  constructor() {
    super(initialState);
  }
}
```
Um Informationen zu verschiedenen Spielern zu verwalten, implementieren wir einen Store. Hierzu erweitern wird die von Akita bereitgestellte EntityStore-Klasse. 
Vereinfacht kann man sich einen solchen EntityStore als Datenbanktabelle vorstellen. Im Vergleich zur der normalen Store-Klasse von Akita bietet der EntityStore
bereits eigene CRUD-Methoden an, die das Verwalten von Entitäten vereinfachen und viel Boilerplate Code sparen. Wenn wir vom EntityStore erben, müssen wir sowohl
das Model des verwalteten States (PlayersState), als auch das Model der zu verwaltenden Entität (Player) definieren. Das angegebene State muss widerum das von Akita
definierte EntityState-Interface erweitern.
```typescript
export interface PlayersState extends EntityState<Player> {}
```
Um den PlayerStore nutzen zu können, müssen wir lediglich den Constructor, in dem wir lediglich den Constructor von EntityStore mit dem initialen Zustand des Stores
aufrufen. Gehen wir davon aus, dass der PlayerStore zum Start der Applikation keine Objekte beinhaltet, können wir die initialState Variable als leeres Objekt 
initialiseren.
```typescript
const initialState: PlayersState = {};
```
Über den `@StoreConfig` Dekorator können wir zusätzlich Eigenschaften des Stores wie den Namen konfigurieren. Das wird wichtig, wenn unsere Anwendung komplexer wird 
und weitere Stores beinhaltet. Mehr Implementierung ist für den PlayerStore nicht nötig und wir können ihn im nächsten Schritt in einen Service einbinden. Durch die 
Erweiterung des EntityStore stellt der PlayersStore nun unter anderem Methoden wie `add`, `update`, `upsert` und `remove` zur Verfügung. Die komplette List kann man
in der [Dokumentation](https://netbasal.gitbook.io/akita/entity-store/entity-store/api) finden.

### Service

```typescript
export class PlayersService {

  constructor(private store: PlayersStore,
              private http: PlayersHttpService) {
  }

  retrieveAll(): void {
    this.http
      .retrieveAll()
      .pipe(take(1))
      .subscribe(players => this.store.add(players));
  }

  add(players: Player[]): void {
    this.http
      .add(players)
      .pipe(take(1))
      .subscribe(addedPlayers => this.store.add(addedPlayers));
  }

  remove(id: string): void {
    this.http
      .remove(id)
      .pipe(take(1))
      .subscribe(() => this.store.remove(id));
  }

  updateRating(id: string, rating: number): void {
    this.http
      .update(id, rating)
      .pipe(take(1))
      .subscribe(updatedRating => this.store.update(id, {rating: updatedRating}));
  }

}
```

Der Service stellt für unsere Anwendung eine Schnittstelle zum Store dar, über UI-Komponenten Veränderungen am State auslösen können. Die UI-Komponenten könnten den Store direkt aufrufen, 
allerdings würde das den High-Level Prinzipien von Akita widersprechen. Darüber hinaus ist es durchaus praktisch, die Verarbeitung asynchroner Aufrufe in einem Service zu kapseln.
In dem PlayersService greifen wir auf den PlayersHttpService zu, welcher die Kommunikation mit einer API übernimmt. Zu Anschauungszwecken ist der PlayersHttpService ein
Dummy, der Dummy-Daten zurückgibt. Die Methoden des PlayersHttpService geben Observables zurück, über die wir an die Daten der API-Aufrufe gelangen. Wem Observables gänzlich 
unbekannt sind, sollte sich ein Tutorial zu dem RxJs Framework anschauen (z.B. [hier](https://angular.io/guide/rx-library)). Kurz zusammengefasst: Observables geben 
über einen Stream asynchron Daten zurück.

Schauen wir uns beispielhaft die Methode `retrieveAll()` an: Innerhalb der Methode rufen wir die Methode `retrieveAll()` des PlayersHttpService auf, welche ein Observable des 
Typs `Player[]` zurückgibt. Mit `subscribe()` melden wir uns bei dem Observable an, und definieren innerhalb des Methodenaufrufs, dass wir die Methode `store.add()` mit
den `players`-Objekt aufrufen, das wir vom Observable erhalten. Einfach ausgedrückt: Wir machen einen REST-Call, der uns alle Spieler einer API zurückgeben soll. Wenn 
wir die Antwort des Calls erhalten, speichern wir die Spieler aus der Antwort in unserem Store. 

Die anderen Methoden bieten die weitere Funktionalität an, die es für einen CRUD-Service braucht. Die Methoden des Stores, die hier aufgerufen werden, mussten wir 
allesamt nicht selbst entwickeln, da diese vom EntityStore bereitgestellt werden. Hier spart sich Akita im Vergleich zu anderen State Management Frameworks einiges an
Boilerplate Code, was das Entwickeln sehr angenehm macht.  

Der Aufruf `pipe(take(1))` in den einzelnen Methoden kommt aus dem RxJs Framework und sagt aus, dass wir nur so lange an dem Observable angemeldet sind, bis wir das erste
Mal ein Objekt erhalten haben.       


### Query

```typescript
export class PlayersQuery extends QueryEntity<PlayersState> {

  constructor(protected store: PlayersStore) {
    super(store);
  }
  
}
```

Als letzen Bestandteil der Akita Implementierung brauchen wir noch einen Service, der die Daten des Stores bereitstellt. Auch hier brauchen wir kaum etwas selbst

### Einbindung in Komponenten


