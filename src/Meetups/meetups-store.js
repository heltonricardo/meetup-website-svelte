import { writable } from "svelte/store";

const meetups = writable([
  {
    id: 1,
    title: "Coding Bootcamp",
    subtitle: "Learn to code in 2 hours",
    description:
      "In this meetup, we will have some experts that teach you how to code!",
    imageUrl: "https://www.enap.gov.br/media_files/images/imagem_bootcamp.jpg",
    address: "27th Nerd Road, 32523 New York",
    contactEmail: "code@test.com",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Swim Together",
    subtitle: "Let's go for some swimming",
    description: "Wee will simply swim some rounds!",
    imageUrl: "https://pbs.twimg.com/media/Cx9mroxWIAIHHJP.jpg",
    address: "27th Nerd Road, 32523 New York",
    contactEmail: "swim@test.com",
    isFavorite: false,
  },
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,

  addMeetup: (meetup) => {
    let store;
    // Verificar se posso utilizar subscribe e unsubscribe dessa maneira:
    meetups.subscribe((tmp) => (store = tmp))();
    let id;
    do id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    while (store.find((item) => item.id === id));
    const newMeetup = {
      ...meetup,
      id,
      isFavorite: false,
    };
    meetups.update((mtps) => {
      return [newMeetup, ...mtps];
    });
  },

  toggleFavorite: (id) => {
    meetups.update((mtps) => {
      return mtps.map((meetup) =>
        meetup.id !== id
          ? meetup
          : { ...meetup, isFavorite: !meetup.isFavorite }
      );
    });
  },
};
export default customMeetupsStore;
