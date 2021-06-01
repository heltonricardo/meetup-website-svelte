<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Button from "./UI/Button.svelte";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Lear to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to code!",
      imageUrl:
        "https://www.enap.gov.br/media_files/images/imagem_bootcamp.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "code@test.com",
      isFavorite: false,
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: "Let's go for some swimming",
      description: "Wee will simply swim some rounds!",
      imageUrl: "https://pbs.twimg.com/media/Cx9mroxWIAIHHJP.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "swim@test.com",
      isFavorite: false,
    },
  ];

  let editMode = false;

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      contactEmail: email,
      title,
      subtitle,
      imageUrl,
      description,
      address,
    };

    meetups = [newMeetup, ...meetups];
  }

  function toggleFavorite(event) {
    meetups = meetups.map((meetup) =>
      meetup.id === event.detail
        ? { ...meetup, isFavorite: !meetup.isFavorite }
        : meetup
    );
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />
<main>
  <Button caption="New Meetup" on:click={() => (editMode = !editMode)} />
  {#if editMode}
    <EditMeetup on:save />
  {/if}
  <MeetupGrid {meetups} on:toggleFavorite={toggleFavorite} />
</main>
