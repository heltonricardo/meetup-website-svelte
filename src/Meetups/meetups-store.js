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
    meetups.update((meetups) => [meetup, ...meetups]);
  },

  updateMeetup: (id, isFavorite, meetup) => {
    meetups.update((mtps) =>
      mtps.map((m) => (m.id !== id ? m : { id, isFavorite, ...meetup }))
    );
  },

  deleteMeetup: (id) => {
    meetups.update((mtps) => mtps.filter((m) => m.id !== id && m));
  },

  toggleFavorite: (id) => {
    meetups.update((mtps) =>
      mtps.map((m) => (m.id !== id ? m : { ...m, isFavorite: !m.isFavorite }))
    );
  },
};
export default customMeetupsStore;
