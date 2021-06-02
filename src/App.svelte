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

  function addMeetup(event) {
    const newMeetup = {
      id: Math.random().toString(),
      contactEmail: event.detail.email,
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      imageUrl: event.detail.imageUrl,
      description: event.detail.description,
      address: event.detail.address,
    };

    meetups = [newMeetup, ...meetups];
    editMode = false;
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

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />
<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = !editMode)}>New Meetup</Button>
  </div>
  {#if editMode}
    <EditMeetup on:save={addMeetup} />
  {/if}
  <MeetupGrid {meetups} on:toggleFavorite={toggleFavorite} />
</main>
