<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";

  const meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Lear to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to code!",
      imageUrl:
        "https://www.enap.gov.br/media_files/images/imagem_bootcamp.jpg",
      adress: "27th Nerd Road, 32523 New York",
      contactEmail: "code@test.com",
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: "Let's go for some swimming",
      description: "Wee will simply swim some rounds!",
      imageUrl: "https://pbs.twimg.com/media/Cx9mroxWIAIHHJP.jpg",
      adress: "27th Nerd Road, 32523 New York",
      contactEmail: "swim@test.com",
    },
  ];
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />
<main>
  <MeetupGrid {meetups} />
</main>
