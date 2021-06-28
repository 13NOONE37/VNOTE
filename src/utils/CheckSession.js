import firebase from 'config/firebaseConfig';
import FetchUserData from 'utils/FetchUserData';

export default async function CheckSession(
  setLoggedIn,
  setuser,
  notes,
  setnotes,
  notebooks,
  setnotebooks,
  categoriesTable,
  setcategoriesTable,
) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      /*const res = await functions.auth.user().onCreate((res) => {
          console.log('on create trigger');
        });
        setnotes([
          {
            id: 1,
            title: 'Notebook options',
            content:
              'Tryb przeglądanie (wyłącza zbędne opcje editów aby można było wygodnie oglądać; zrobić jakiegoś statea który będzie sprawdzał czy ten tryb jest wybrany\nTekst\nZdjęcia\nKształty\nDiagramy\nRysunek odręczny\nIframe(?) z jakiejś strony np. ig czy yt; ikona kody </>\nWstawienie kodu (jakiś specjalny obiekt z vcode; dopóki nie jest zrobiony można wsumie użyć jakiejś gotowej libki\nTabela\nDodaj automatyczny spis treści\nTyp kartki (zwykła kartka jakiegoś tematu; temat; podtemat;)\nWygląd kartki (pusta, linie, kratki)',
            doneTasks: [],
            color: 147,
            isPinned: true,
            isCheckboxList: false,
            groups: [],
            isDeleted: true,
            isArchive: false,
            isShared: false,
            isSecret: false,
          },
          {
            id: 2,
            title: 'Trening Theodena',
            content: `1 solo (na kille)\n\n\n15 minut strzelanie do celu aim mapka\n\n\n15 minut reaction cr\n\n\n15 minut mongral classic\n\n\n3 arenki\n\n\n2 razy w tygodniu mapka do editów\n\n\nCel na 7 sezon 3200 punktów na arenie\n\n`,
            doneTasks: [],
            color: 220,
            isPinned: true,
            isCheckboxList: true,
            groups: [],
            isDeleted: false,
            isArchive: false,
            isShared: false,
            isSecret: false,
          },
        ]);

        setnotebooks([
          {
            id: 1,
            title: 'JS tips',
            date: '03.02.2019',
            color: 236,
            bgImage: 'hexagons',
          },
        ]);

        setcategoriesTable([
          {
            name: 'Recipes',
            icon: 'fas fa-tag',
            link: '/category/Recipes',
          },
          {
            name: 'JS',
            icon: 'fas fa-tag',
            link: '/category/JS',
          },
        ]);
       */

      setLoggedIn(true);

      setuser(user);
      FetchUserData(user, setnotes, setnotebooks, setcategoriesTable);
    } else {
      setLoggedIn(false);
      setuser({});
      setnotes([null]);
    }
  });
}
